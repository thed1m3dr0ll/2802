import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware

from app.routes.reviews import router as reviews_router
from app.yclients_api import router as yclients_router


ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000",
).split(",")

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Gentlemen Barber API",
    description="API для сайта и мини-аппа барбер-клуба",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BookingIntent(BaseModel):
    ritualId: str | None = None   # service_id в Yclients
    ritualName: str | None = None
    masterId: str | None = None   # staff_id в Yclients
    masterName: str | None = None
    date: str | None = None       # "2026-02-14"
    time: str | None = None       # "19:30"
    name: str
    phone: str
    comment: str | None = None


app.include_router(reviews_router)
app.include_router(yclients_router)

# Длительность услуги по умолчанию (в СЕКУНДАХ, кратно 300: 3600 = 60 мин)
DEFAULT_SEANCE_LENGTH = 3600


@app.post("/booking-intents/")
@limiter.limit("5/minute")
async def create_booking_intent(request: Request, intent: BookingIntent):
    """
    1) Принимаем данные с фронта.
    2) Делаем запрос в Yclients на создание записи.
    3) Возвращаем client.id и record.id.
    """
    from app.yclients_client import create_yclients_record  # импорт клиента YCLIENTS

    # подстрахуемся по типам
    if not intent.masterId or not intent.ritualId or not intent.date or not intent.time:
        return {
            "status": "error",
            "message": "Не хватает masterId / ritualId / date / time",
        }

    # Payload в формате, который ждёт YCLIENTS /api/v1/records/{company_id}
    payload = {
        "seance_length": DEFAULT_SEANCE_LENGTH,
        "staff_id": int(intent.masterId),
        "datetime": f"{intent.date}T{intent.time}:00",
        "services": [
            {
                "id": int(intent.ritualId),
                "staff_id": int(intent.masterId),
                "seance_length": DEFAULT_SEANCE_LENGTH,
            }
        ],
        "client": {
            "name": intent.name,
            "phone": intent.phone,
            "comment": intent.comment or "",
        },
    }

    data = await create_yclients_record(payload)

    if not data.get("success"):
        meta = data.get("meta") or data
        return {"status": "error", "yclients": meta}

    record = data["data"]
    record_id = record["id"]
    user_id = record["client"]["id"]

    return {
        "status": "ok",
        "recordId": record_id,
        "userId": user_id,
        "raw": data,
    }


@app.get("/")
async def root():
    return {"message": "Gentlemen Barber API is running!"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
    )

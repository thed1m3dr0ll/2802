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
from app.routes.auth import router as auth_router
from app.routes.cabinet import router as cabinet_router


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
    ritualId: str | None = None
    ritualName: str | None = None
    masterId: str | None = None
    masterName: str | None = None
    date: str | None = None
    time: str | None = None
    name: str
    phone: str
    comment: str | None = None


# ВСЕ роуты повешены под /api
app.include_router(reviews_router, prefix="/api")
app.include_router(yclients_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(cabinet_router, prefix="/api")

DEFAULT_SEANCE_LENGTH = 3600


@app.post("/api/booking-intents/")
@limiter.limit("5/minute")
async def create_booking_intent(request: Request, intent: BookingIntent):
    from app.yclients_client import create_yclients_record

    if not intent.masterId or not intent.ritualId or not intent.date or not intent.time:
        return {
            "status": "error",
            "message": "Не хватает masterId / ritualId / date / time",
        }

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

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.routes.reviews import router as reviews_router
from app.yclients_api import router as yclients_router


app = FastAPI(
    title="Gentlemen Barber API",
    description="API для сайта и мини-аппа барбер-клуба",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


@app.post("/booking-intents/")
async def create_booking_intent(intent: BookingIntent):
    """
    1) Принимаем данные с фронта.
    2) Делаем запрос в Yclients на создание записи.
    3) Возвращаем client.id и record.id.
    """
    from app.yclients_client import create_yclients_record  # см. ниже файл

    # подстрахуемся по типам
    if not intent.masterId or not intent.ritualId or not intent.date or not intent.time:
        return {"status": "error", "message": "Не хватает masterId / ritualId / date / time"}

    payload = {
        "phone": intent.phone,
        "name": intent.name,
        "email": "",
        "comment": intent.comment or "",
        "appointments": [
            {
                "id": 1,
                "staff_id": int(intent.masterId),
                "services": [int(intent.ritualId)],
                "datetime": f"{intent.date}T{intent.time}:00",
            }
        ],
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

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

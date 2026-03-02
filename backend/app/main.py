import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from pydantic import BaseModel

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware

from app.routes.reviews import router as reviews_router
from app.yclients_api import router as yclients_router
from app.routes.auth import router as auth_router
from app.routes.cabinet import router as cabinet_router
from app.routes.bot_users import router as bot_users_router
from app.routes.bot_bookings import router as bot_bookings_router
from app.routes.rituals import router as rituals_router


# Разрешённые источники для CORS — читаем из ENV,
# по умолчанию оставляю localhost для локальной разработки
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000",
).split(",")


# Текущая среда: development / production
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Имя проекта / инстанса (обычный API или админка)
PROJECT_NAME = os.getenv("PROJECT_NAME", "Gentlemen Barber API")

IS_PROD = ENVIRONMENT == "production"
IS_ADMIN_INSTANCE = PROJECT_NAME == "Gentlemen Barber API Admin"


# Лимитер по IP — режем частоту запросов к чувствительным эндпоинтам
limiter = Limiter(key_func=get_remote_address)


# Основной экземпляр приложения FastAPI
# На проде публичную документацию отключаю, но для админ-инстанса оставляю
app = FastAPI(
    title=PROJECT_NAME,
    description="API для сайта и мини-аппа барбер-клуба",
    version="1.0.0",
    docs_url="/api/docs" if IS_ADMIN_INSTANCE or not IS_PROD else None,
    openapi_url="/api/openapi.json" if IS_ADMIN_INSTANCE or not IS_PROD else None,
    redoc_url="/api/redoc" if IS_ADMIN_INSTANCE or not IS_PROD else None,
)


# Подключаю лимитер и middleware для ограничения частоты запросов
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)


# Базовая CORS-конфигурация — фронт общается с API из указанных доменов
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BookingIntent(BaseModel):
    """Модель для намерения записи через сайт (форма бронирования)."""

    ritualId: str | None = None
    ritualName: str | None = None
    masterId: str | None = None
    masterName: str | None = None
    date: str | None = None
    time: str | None = None
    name: str
    phone: str
    comment: str | None = None


# Все роуты вешаю под /api, чтобы API было изолировано от фронтовых маршрутов
app.include_router(reviews_router, prefix="/api")
app.include_router(yclients_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(cabinet_router, prefix="/api")
app.include_router(bot_users_router, prefix="/api")
app.include_router(bot_bookings_router, prefix="/api")
app.include_router(rituals_router, prefix="/api")  # /api/rituals/...


# Длина сеанса по умолчанию — 1 час (в секундах)
DEFAULT_SEANCE_LENGTH = 3600


@app.post("/api/booking-intents/")
@limiter.limit("5/minute")
async def create_booking_intent(request: Request, intent: BookingIntent):
    """
    Принимаю намерение записи с фронта, собираю payload под YCLIENTS
    и создаю запись через их API.
    """
    from app.yclients_client import create_yclients_record

    # На всякий проверяю, что обязательные поля заполнены
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

    # Если YCLIENTS вернули неуспех — прокидываю мету наружу
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
    """Простой ping-эндпоинт, чтобы быстро проверить, что API живое."""
    return {"message": "Gentlemen Barber API is running!"}


@app.get("/healthz", include_in_schema=False)
async def healthcheck():
    """
    Технический healthcheck для Docker / nginx / мониторинга.
    Не попадает в Swagger и openapi-схему.
    """
    return JSONResponse({"status": "ok"})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
    )

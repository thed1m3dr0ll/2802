from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.reviews import router as reviews_router  # роутер отзывов


# Создаём приложение FastAPI
app = FastAPI(
    title="Gentlemen Barber API",
    description="API для сайта и мини-аппа барбер-клуба",
    version="1.0.0",
)


# Разрешаем CORS (фронтенду подключаться к API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Подключаем роуты
app.include_router(reviews_router)


# Тестовый endpoint
@app.get("/")
async def root():
    return {"message": "Gentlemen Barber API is running!"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

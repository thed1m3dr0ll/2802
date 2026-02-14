# app/api/reviews.py

from datetime import date
from typing import Literal, List

import asyncpg
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.db import get_db_connection  # адаптируй импорт под свой проект


class Review(BaseModel):
    id: int
    author: str
    source: Literal["yandex", "2gis", "site"]
    rating: int
    text: str
    date: date


router = APIRouter(prefix="/reviews", tags=["reviews"])


async def get_conn() -> asyncpg.Connection:
    """
    Депенденси для получения соединения с БД.
    Ожидается, что get_db_connection() вернёт asyncpg.Connection
    или возьмёт его из пула.
    """
    conn = await get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection not available")
    return conn


@router.get("/", response_model=List[Review])
async def list_reviews(conn: asyncpg.Connection = Depends(get_conn)) -> List[Review]:
    """
    Список отзывов для сайта.
    Берём реальные данные из таблицы public.reviews,
    сортируем по дате (сначала новые), ограничиваем 10 шт.
    """
    rows = await conn.fetch(
        """
        SELECT
            id,
            author,
            source,
            rating,
            text,
            date
        FROM public.reviews
        ORDER BY date DESC, id DESC
        LIMIT 10;
        """
    )

    # Превращаем asyncpg.Record -> dict -> Review
    reviews: List[Review] = [Review(**dict(row)) for row in rows]
    return reviews

# app/reviews.py

from datetime import date
from typing import Literal, List

import asyncpg
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.db import get_db_connection


class Review(BaseModel):
    id: int
    author: str
    source: Literal["yandex", "2gis", "site"]
    rating: int
    text: str
    date: date


router = APIRouter(prefix="/reviews", tags=["reviews"])


async def get_conn() -> asyncpg.Connection:
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

    reviews: List[Review] = [Review(**dict(row)) for row in rows]
    return reviews

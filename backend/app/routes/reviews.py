# app/routes/reviews.py

from datetime import date
from typing import Literal, List, Optional

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


class ReviewCreate(BaseModel):
    author: str
    source: Literal["yandex", "2gis", "site"]
    rating: int
    text: str
    date: date


class ReviewUpdate(BaseModel):
    author: Optional[str] = None
    source: Optional[Literal["yandex", "2gis", "site"]] = None
    rating: Optional[int] = None
    text: Optional[str] = None
    date: Optional[date] = None


router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("/", response_model=List[Review])
async def list_reviews(
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> List[Review]:
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
    return [Review(**dict(row)) for row in rows]


@router.post("/", response_model=Review, status_code=201)
async def create_review(
    review_in: ReviewCreate,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> Review:
    row = await conn.fetchrow(
        """
        INSERT INTO public.reviews (author, source, rating, text, date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, author, source, rating, text, date;
        """,
        review_in.author,
        review_in.source,
        review_in.rating,
        review_in.text,
        review_in.date,
    )
    return Review(**dict(row))


@router.put("/{review_id}", response_model=Review)
async def update_review(
    review_id: int,
    review_in: ReviewUpdate,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> Review:
    row = await conn.fetchrow(
        """
        UPDATE public.reviews
        SET
            author = COALESCE($2, author),
            source = COALESCE($3, source),
            rating = COALESCE($4, rating),
            text   = COALESCE($5, text),
            date   = COALESCE($6, date)
        WHERE id = $1
        RETURNING id, author, source, rating, text, date;
        """,
        review_id,
        review_in.author,
        review_in.source,
        review_in.rating,
        review_in.text,
        review_in.date,
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return Review(**dict(row))


@router.delete("/{review_id}", status_code=204)
async def delete_review(
    review_id: int,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> None:
    result = await conn.execute(
        """
        DELETE FROM public.reviews
        WHERE id = $1;
        """,
        review_id,
    )
    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="Review not found")

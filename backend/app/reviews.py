from datetime import date
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException, Header, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, constr, conint
import asyncpg
import os


router = APIRouter(
    prefix="",
    tags=["reviews"],  # блок в Swagger
)


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://admin:dev_password@postgres:5432/gentlemen_barber",
)
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "")


async def get_conn():
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        await conn.close()


class Review(BaseModel):
    id: int
    author: str
    source: str  # 'yandex' | '2gis' | 'site'
    rating: int
    text: str
    date: date


class ReviewCreate(BaseModel):
    author: constr(min_length=1, max_length=80)
    source: constr(pattern="^(yandex|2gis|site)$")
    rating: conint(ge=1, le=5)
    text: constr(min_length=5, max_length=2000)
    date: date


async def require_admin(x_admin_token: str = Header(...)):
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.post("/admin/auth", include_in_schema=False)
async def admin_auth(x_admin_token: str = Header(...)):
    """
    Простой чек админ-токена для фронта.
    """
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"ok": True},
    )


@router.get(
    "/reviews/",
    response_model=List[Review],
    include_in_schema=True,
)
async def get_reviews(
    conn=Depends(get_conn),
    offset: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=50),
):
    rows = await conn.fetch(
        """
        SELECT id, author, source, rating, text, date
        FROM reviews
        ORDER BY date DESC, id DESC
        OFFSET $1 LIMIT $2
        """,
        offset,
        limit,
    )
    return [Review(**dict(r)) for r in rows]


@router.post(
    "/admin/reviews/",
    response_model=Review,
    include_in_schema=True,
)
async def create_review(
    review: ReviewCreate,
    conn=Depends(get_conn),
    _admin=Depends(require_admin),  # проверка токена
):
    row = await conn.fetchrow(
        """
        INSERT INTO reviews (author, source, rating, text, date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, author, source, rating, text, date
        """,
        review.author,
        review.source,
        review.rating,
        review.text,
        review.date,
    )
    return Review(**dict(row))

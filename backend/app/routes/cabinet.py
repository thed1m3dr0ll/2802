from datetime import datetime
from typing import List, Optional

import asyncpg
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.db import get_db_connection
from app.routes.auth import get_current_user

router = APIRouter(prefix="/cabinet", tags=["cabinet"])

# используем тот же коннектор, что и в auth.py
get_conn = get_db_connection


class Visit(BaseModel):
    id: int
    datetime: datetime
    duration_minutes: int
    master_name: str
    service_name: str
    status: str
    comment: Optional[str] = None


class VisitHistoryResponse(BaseModel):
    items: List[Visit]
    page: int
    limit: int
    total: int


@router.get("/visits/upcoming", response_model=List[Visit])
async def get_upcoming_visits(
    current_user: asyncpg.Record = Depends(get_current_user),
    conn: asyncpg.Connection = Depends(get_conn),
):
    user_id = current_user["id"]

    rows = await conn.fetch(
        """
        SELECT id,
               datetime,
               duration_minutes,
               master_name,
               service_name,
               status,
               comment
        FROM public.visits
        WHERE user_id = $1
          AND datetime >= now()
          AND status IN ('upcoming', 'confirmed')
        ORDER BY datetime ASC
        """,
        user_id,
    )

    return [
        Visit(
            id=r["id"],
            datetime=r["datetime"],
            duration_minutes=r["duration_minutes"],
            master_name=r["master_name"],
            service_name=r["service_name"],
            status=r["status"],
            comment=r["comment"],
        )
        for r in rows
    ]


@router.get("/visits/history", response_model=VisitHistoryResponse)
async def get_visit_history(
    page: int = 1,
    limit: int = 20,
    current_user: asyncpg.Record = Depends(get_current_user),
    conn: asyncpg.Connection = Depends(get_conn),
):
    if page < 1 or limit < 1 or limit > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid page or limit",
        )

    user_id = current_user["id"]
    offset = (page - 1) * limit

    total_row = await conn.fetchrow(
        """
        SELECT count(*) AS total
        FROM public.visits
        WHERE user_id = $1
          AND datetime < now()
        """,
        user_id,
    )
    total = int(total_row["total"]) if total_row else 0

    rows = await conn.fetch(
        """
        SELECT id,
               datetime,
               duration_minutes,
               master_name,
               service_name,
               status,
               comment
        FROM public.visits
        WHERE user_id = $1
          AND datetime < now()
        ORDER BY datetime DESC
        LIMIT $2 OFFSET $3
        """,
        user_id,
        limit,
        offset,
    )

    items = [
        Visit(
            id=r["id"],
            datetime=r["datetime"],
            duration_minutes=r["duration_minutes"],
            master_name=r["master_name"],
            service_name=r["service_name"],
            status=r["status"],
            comment=r["comment"],
        )
        for r in rows
    ]

    return VisitHistoryResponse(items=items, page=page, limit=limit, total=total)

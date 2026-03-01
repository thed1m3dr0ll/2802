# app/routes/bot_bookings.py

from datetime import datetime, timezone
from typing import Optional, List

import asyncpg
import httpx
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.db import get_db_connection
from app.yclients_api import (
    YCLIENTS_PARTNER_TOKEN,
    YCLIENTS_USER_TOKEN,
)

router = APIRouter(prefix="/bot/bookings", tags=["bot_bookings"])


class BotBooking(BaseModel):
    id: int
    bot_user_id: int
    telegram_id: int
    client_name: Optional[str]
    client_phone: Optional[str]
    yclients_record_id: Optional[int]
    yclients_record_hash: Optional[str]
    service_id: Optional[int]
    staff_id: Optional[int]
    master_role: Optional[str]
    ritual_name: Optional[str]
    datetime: datetime
    comment: Optional[str]
    status: str


class BotBookingCreate(BaseModel):
    telegram_id: int
    client_name: Optional[str]
    client_phone: Optional[str]
    yclients_record_id: Optional[int]
    yclients_record_hash: Optional[str]
    service_id: Optional[int]
    staff_id: Optional[int]
    master_role: Optional[str]
    ritual_name: Optional[str]
    datetime: datetime
    comment: Optional[str]


async def get_bot_user_id_by_telegram(
    conn: asyncpg.Connection,
    telegram_id: int,
) -> int:
    row = await conn.fetchrow(
        """
        SELECT id
        FROM public.bot_users
        WHERE telegram_id = $1
        """,
        telegram_id,
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Bot user not found for booking")
    return row["id"]


@router.post("/", response_model=BotBooking)
async def create_bot_booking(
    payload: BotBookingCreate,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> BotBooking:
    bot_user_id = await get_bot_user_id_by_telegram(conn, payload.telegram_id)

    row = await conn.fetchrow(
        """
        INSERT INTO public.bot_bookings (
            bot_user_id,
            telegram_id,
            client_name,
            client_phone,
            yclients_record_id,
            yclients_record_hash,
            service_id,
            staff_id,
            master_role,
            ritual_name,
            datetime,
            comment,
            status
        )
        VALUES (
            $1, $2, $3, $4,
            $5, $6,
            $7, $8, $9,
            $10, $11, $12,
            'created'
        )
        RETURNING
            id,
            bot_user_id,
            telegram_id,
            client_name,
            client_phone,
            yclients_record_id,
            yclients_record_hash,
            service_id,
            staff_id,
            master_role,
            ritual_name,
            datetime,
            comment,
            status
        """,
        bot_user_id,
        payload.telegram_id,
        payload.client_name,
        payload.client_phone,
        payload.yclients_record_id,
        payload.yclients_record_hash,
        payload.service_id,
        payload.staff_id,
        payload.master_role,
        payload.ritual_name,
        payload.datetime,
        payload.comment,
    )

    return BotBooking(**dict(row))


class BotBookingListItem(BaseModel):
    id: int
    datetime: datetime
    ritual_name: Optional[str]
    master_role: Optional[str]
    staff_id: Optional[int]
    status: str


@router.get("/user/{telegram_id}", response_model=List[BotBookingListItem])
async def list_user_upcoming_bookings(
    telegram_id: int,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> list[BotBookingListItem]:
    now = datetime.now(timezone.utc)

    rows = await conn.fetch(
        """
        SELECT
            id,
            datetime,
            ritual_name,
            master_role,
            staff_id,
            status
        FROM public.bot_bookings
        WHERE telegram_id = $1
          AND status = 'created'
          AND datetime >= $2
        ORDER BY datetime ASC
        """,
        telegram_id,
        now,
    )

    return [BotBookingListItem(**dict(r)) for r in rows]


class BotBookingCancelResponse(BaseModel):
    success: bool


async def cancel_yclients_record(record_id: int, record_hash: str) -> bool:
    """
    Отмена записи в YClients через user/records/{record_id}/{record_hash}.
    Используем те же токены, что и при book_record.
    """
    url = f"https://api.yclients.com/api/v1/user/records/{record_id}/{record_hash}"

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {YCLIENTS_PARTNER_TOKEN}, User {YCLIENTS_USER_TOKEN}",
    }

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.delete(url, headers=headers)
    except Exception as e:
        print("ERROR cancel_record request:", {"url": url, "error": str(e)})
        return False

    try:
        data = resp.json()
    except ValueError:
        print("ERROR cancel_record invalid JSON:", {"status": resp.status_code})
        return False

    if isinstance(data, dict) and data.get("errors"):
        print("ERROR cancel_record errors:", data["errors"])
        return False

    if isinstance(data, dict) and data.get("success") is False:
        print("ERROR cancel_record meta:", data.get("meta") or data)
        return False

    return resp.status_code < 300


@router.post("/{booking_id}/cancel", response_model=BotBookingCancelResponse)
async def cancel_bot_booking(
    booking_id: int,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> BotBookingCancelResponse:
    row = await conn.fetchrow(
        """
        SELECT
            id,
            yclients_record_id,
            yclients_record_hash,
            status
        FROM public.bot_bookings
        WHERE id = $1
        """,
        booking_id,
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Booking not found")

    if row["status"] == "cancelled":
        return BotBookingCancelResponse(success=True)

    record_id = row["yclients_record_id"]
    record_hash = row["yclients_record_hash"]

    yc_ok = True
    if record_id and record_hash:
        yc_ok = await cancel_yclients_record(record_id, record_hash)

    await conn.execute(
        """
        UPDATE public.bot_bookings
        SET
            status = 'cancelled',
            updated_at = NOW()
        WHERE id = $1
        """,
        booking_id,
    )

    if not yc_ok:
        print(f"WARNING: booking {booking_id} cancelled locally, but YClients cancel failed")

    return BotBookingCancelResponse(success=True)


@router.post("/cancel/by-record-id/{record_id}", response_model=BotBookingCancelResponse)
async def cancel_bot_booking_by_record_id(
    record_id: int,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> BotBookingCancelResponse:
    """
    Отмена брони в нашей БД по yclients_record_id.
    YClients здесь не трогаем — считаем, что админ уже отменил её руками в YClients.
    """
    row = await conn.fetchrow(
        """
        SELECT
            id,
            status
        FROM public.bot_bookings
        WHERE yclients_record_id = $1
        """,
        record_id,
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking_id = row["id"]

    if row["status"] == "cancelled":
        return BotBookingCancelResponse(success=True)

    await conn.execute(
        """
        UPDATE public.bot_bookings
        SET
            status = 'cancelled',
            updated_at = NOW()
        WHERE id = $1
        """,
        booking_id,
    )

    return BotBookingCancelResponse(success=True)

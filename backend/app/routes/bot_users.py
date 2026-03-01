# app/routers/bot_users.py

from typing import Optional

import asyncpg
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.db import get_db_connection


class BotUser(BaseModel):
    id: int
    telegram_id: int
    phone: Optional[str] = None
    yclients_client_id: Optional[int] = None
    tone: str
    preferred_master: str
    goal: Optional[str] = None
    zone: Optional[str] = None
    budget: Optional[str] = None
    preferred_staff_id: Optional[int] = None
    name: Optional[str] = None  # NEW


class BotUserCreateOrUpdate(BaseModel):
    phone: Optional[str] = None
    yclients_client_id: Optional[int] = None
    tone: Optional[str] = None
    preferred_master: Optional[str] = None
    goal: Optional[str] = None
    zone: Optional[str] = None
    budget: Optional[str] = None
    preferred_staff_id: Optional[int] = None
    name: Optional[str] = None  # NEW


class BotUserPreferencesUpdate(BaseModel):
    preferred_staff_id: Optional[int] = None


router = APIRouter(prefix="/bot/users", tags=["bot_users"])


@router.post("/{telegram_id}", response_model=BotUser)
async def create_or_update_bot_user(
    telegram_id: int,
    payload: BotUserCreateOrUpdate,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> BotUser:
    row = await conn.fetchrow(
        """
        INSERT INTO public.bot_users (
            telegram_id,
            phone,
            yclients_client_id,
            tone,
            preferred_master,
            goal,
            zone,
            budget,
            preferred_staff_id,
            name
        )
        VALUES (
            $1,
            $2,
            $3,
            COALESCE($4, 'casual'),
            COALESCE($5, 'top'),
            $6,
            $7,
            $8,
            $9,
            $10
        )
        ON CONFLICT (telegram_id) DO UPDATE
        SET
            phone = COALESCE($2, public.bot_users.phone),
            yclients_client_id = COALESCE($3, public.bot_users.yclients_client_id),
            tone = COALESCE($4, public.bot_users.tone),
            preferred_master = COALESCE($5, public.bot_users.preferred_master),
            goal = COALESCE($6, public.bot_users.goal),
            zone = COALESCE($7, public.bot_users.zone),
            budget = COALESCE($8, public.bot_users.budget),
            preferred_staff_id = COALESCE($9, public.bot_users.preferred_staff_id),
            name = COALESCE($10, public.bot_users.name)
        RETURNING
            id,
            telegram_id,
            phone,
            yclients_client_id,
            tone,
            preferred_master,
            goal,
            zone,
            budget,
            preferred_staff_id,
            name;
        """,
        telegram_id,
        payload.phone,
        payload.yclients_client_id,
        payload.tone,
        payload.preferred_master,
        payload.goal,
        payload.zone,
        payload.budget,
        payload.preferred_staff_id,
        payload.name,
    )
    if row is None:
        raise HTTPException(status_code=500, detail="Failed to upsert bot user")
    return BotUser(**dict(row))


@router.patch("/{telegram_id}/preferences", response_model=BotUser)
async def update_bot_user_preferences(
    telegram_id: int,
    payload: BotUserPreferencesUpdate,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> BotUser:
    row = await conn.fetchrow(
        """
        UPDATE public.bot_users
        SET preferred_staff_id = COALESCE($2, public.bot_users.preferred_staff_id)
        WHERE telegram_id = $1
        RETURNING
            id,
            telegram_id,
            phone,
            yclients_client_id,
            tone,
            preferred_master,
            goal,
            zone,
            budget,
            preferred_staff_id,
            name;
        """,
        telegram_id,
        payload.preferred_staff_id,
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Bot user not found")
    return BotUser(**dict(row))


@router.get("/{telegram_id}", response_model=BotUser)
async def get_bot_user(
    telegram_id: int,
    conn: asyncpg.Connection = Depends(get_db_connection),
) -> BotUser:
    row = await conn.fetchrow(
        """
        SELECT
            id,
            telegram_id,
            phone,
            yclients_client_id,
            tone,
            preferred_master,
            goal,
            zone,
            budget,
            preferred_staff_id,
            name
        FROM public.bot_users
        WHERE telegram_id = $1;
        """,
        telegram_id,
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Bot user not found")
    return BotUser(**dict(row))

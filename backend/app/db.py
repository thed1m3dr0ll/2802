# app/db.py

import os
from typing import AsyncGenerator

import asyncpg


# Требуем, чтобы DATABASE_URL всегда был задан через окружение
DATABASE_URL = os.environ["DATABASE_URL"]

_pool: asyncpg.Pool | None = None


async def get_db_pool() -> asyncpg.Pool:
    global _pool
    if _pool is None:
        _pool = await asyncpg.create_pool(
            dsn=DATABASE_URL,
            min_size=1,
            max_size=5,
            command_timeout=10,
        )
    return _pool


async def get_db_connection() -> AsyncGenerator[asyncpg.Connection, None]:
    pool = await get_db_pool()
    async with pool.acquire() as conn:
        yield conn

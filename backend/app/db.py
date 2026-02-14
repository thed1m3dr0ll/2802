# app/db.py
import asyncpg
import os
from typing import AsyncGenerator

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://admin:dev_password@postgres:5432/gentlemen_barber",
)

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
    """
    Депенденси для FastAPI: отдаёт connection из пула и возвращает его обратно.
    """
    pool = await get_db_pool()
    async with pool.acquire() as conn:
        yield conn

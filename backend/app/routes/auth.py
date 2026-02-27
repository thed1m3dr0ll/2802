import os
from datetime import datetime, timedelta
from typing import Optional

import asyncpg
import jwt
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Response,
    status,
    Request,
)
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr

from app.db import get_db_connection

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-me-in-prod")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_DAYS = 30

pwd_context = CryptContext(
    schemes=["argon2"],
    default="argon2",
    deprecated="auto",
)

router = APIRouter(prefix="/auth", tags=["auth"])

get_conn = get_db_connection


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class UserProfile(BaseModel):
    id: int
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


def create_access_token(user_id: int) -> str:
    expire = datetime.utcnow() + timedelta(days=JWT_EXPIRE_DAYS)
    to_encode = {"sub": str(user_id), "exp": expire}
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


async def get_current_user(
    request: Request,
    conn: asyncpg.Connection = Depends(get_conn),
) -> asyncpg.Record:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        user_id = int(payload.get("sub"))
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    user = await conn.fetchrow(
        """
        SELECT id, email, name, phone, created_at
        FROM public.users
        WHERE id = $1
        """,
        user_id,
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user


@router.post("/register", response_model=UserProfile)
async def register(
    data: RegisterRequest,
    response: Response,
    conn: asyncpg.Connection = Depends(get_conn),
):
    existing = await conn.fetchrow(
        "SELECT id FROM public.users WHERE lower(email) = lower($1)",
        data.email,
    )
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Пользователь с таким email уже существует",
        )

    password_hash = hash_password(data.password)

    row = await conn.fetchrow(
        """
        INSERT INTO public.users (email, password_hash, name)
        VALUES (lower($1), $2, $3)
        RETURNING id, email, name, phone, created_at
        """,
        data.email,
        password_hash,
        data.name,
    )

    token = create_access_token(row["id"])

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=JWT_EXPIRE_DAYS * 24 * 60 * 60,
        path="/",
    )

    return UserProfile(**dict(row))


@router.post("/login", response_model=UserProfile)
async def login(
    data: LoginRequest,
    response: Response,
    conn: asyncpg.Connection = Depends(get_conn),
):
    user = await conn.fetchrow(
        """
        SELECT id, email, password_hash, name, phone, created_at
        FROM public.users
        WHERE lower(email) = lower($1)
        """,
        data.email,
    )
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Неверный email или пароль",
        )

    if not verify_password(data.password, user["password_hash"]):
        raise HTTPException(
            status_code=400,
            detail="Неверный email или пароль",
        )

    token = create_access_token(user["id"])

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=JWT_EXPIRE_DAYS * 24 * 60 * 60,
        path="/",
    )

    safe = {
        "id": user["id"],
        "email": user["email"],
        "name": user["name"],
        "phone": user["phone"],
        "created_at": user["created_at"],
    }
    return UserProfile(**safe)


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    return {"status": "ok"}


@router.get("/profile", response_model=UserProfile)
async def profile(current_user: asyncpg.Record = Depends(get_current_user)):
    return UserProfile(**dict(current_user))


@router.post("/change-password")
async def change_password(
    data: ChangePasswordRequest,
    current_user: asyncpg.Record = Depends(get_current_user),
    conn: asyncpg.Connection = Depends(get_conn),
):
    user_id = current_user["id"]

    row = await conn.fetchrow(
        "SELECT password_hash FROM public.users WHERE id = $1",
        user_id,
    )
    if not row:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(data.current_password, row["password_hash"]):
        raise HTTPException(
            status_code=400,
            detail="Текущий пароль неверен",
        )

    new_hash = hash_password(data.new_password)

    await conn.execute(
        "UPDATE public.users SET password_hash = $1 WHERE id = $2",
        new_hash,
        user_id,
    )

    return {"status": "ok"}

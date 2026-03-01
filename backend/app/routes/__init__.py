# app/routes/__init__.py

from .reviews import router as reviews_router
from .auth import router as auth_router
from .cabinet import router as cabinet_router
from .bot_users import router as bot_users_router

__all__ = [
    "reviews_router",
    "auth_router",
    "cabinet_router",
    "bot_users_router",
]

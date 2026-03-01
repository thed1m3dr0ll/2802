# bot/config.py

import os
from dataclasses import dataclass


@dataclass
class Settings:
    telegram_token: str
    backend_url: str
    admin_chat_id: int | None

    @classmethod
    def from_env(cls) -> "Settings":
        admin_raw = os.getenv("ADMIN_CHAT_ID")
        admin_chat_id: int | None
        if admin_raw:
            try:
                admin_chat_id = int(admin_raw)
            except ValueError:
                admin_chat_id = None
        else:
            admin_chat_id = None

        return cls(
            telegram_token=os.getenv("TELEGRAM_TOKEN", ""),
            backend_url=os.getenv("BACKEND_URL", "http://backend:8000"),
            admin_chat_id=admin_chat_id,
        )


settings = Settings.from_env()

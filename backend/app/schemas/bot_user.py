# backend/app/schemas/bot_user.py

from typing import Literal, Optional

from pydantic import BaseModel, field_validator


ToneType = Literal["casual", "polite", "club"]
PreferredMasterType = Literal["top", "art", "auto"]


class BotUserBase(BaseModel):
    tone: ToneType = "casual"
    preferred_master: PreferredMasterType = "top"


class BotUserCreate(BotUserBase):
    telegram_id: int
    phone: Optional[str] = None
    yclients_client_id: Optional[int] = None
    preferred_staff_id: Optional[int] = None

    @field_validator("phone")
    @classmethod
    def normalize_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        return v.replace(" ", "").replace("-", "")


class BotUserUpdate(BotUserBase):
    phone: Optional[str] = None
    yclients_client_id: Optional[int] = None
    preferred_staff_id: Optional[int] = None


class BotUserPreferencesUpdate(BaseModel):
    preferred_staff_id: Optional[int] = None


class BotUserRead(BotUserBase):
    id: int
    telegram_id: int
    phone: Optional[str] = None
    yclients_client_id: Optional[int] = None
    preferred_staff_id: Optional[int] = None

    class Config:
        from_attributes = True

# backend/app/models/bot_user.py

from datetime import datetime

from sqlalchemy import (
    BigInteger,
    Column,
    DateTime,
    Integer,
    Text,
    func,
)

from app.core.db import Base  # если у тебя базовый Base в другом месте, подправь импорт


class BotUser(Base):
    __tablename__ = "bot_users"
    __table_args__ = {"schema": "public"}

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(BigInteger, nullable=False, unique=True, index=True)
    phone = Column(Text, nullable=True)
    yclients_client_id = Column(Integer, nullable=True, index=True)

    # id сотрудника в YClients (Роман, Алексей, Елена, Максим и т.д.)
    preferred_staff_id = Column(Integer, nullable=True, index=True)

    # casual | polite | club
    tone = Column(Text, nullable=False, server_default="casual")
    # top | art | auto
    preferred_master = Column(Text, nullable=False, server_default="top")

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

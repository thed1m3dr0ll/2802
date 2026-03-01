# backend/app/services/bot_users.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.bot_user import BotUser
from app.schemas.bot_user import BotUserCreate, BotUserUpdate


async def get_by_telegram_id(
    db: AsyncSession, telegram_id: int
) -> BotUser | None:
    stmt = select(BotUser).where(BotUser.telegram_id == telegram_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()


async def create_or_update(
    db: AsyncSession,
    telegram_id: int,
    data: BotUserUpdate | BotUserCreate,
) -> BotUser:
    bot_user = await get_by_telegram_id(db, telegram_id)

    if bot_user is None:
        # создаём
        create_data = (
            data
            if isinstance(data, BotUserCreate)
            else BotUserCreate(telegram_id=telegram_id, **data.model_dump())
        )
        bot_user = BotUser(**create_data.model_dump())
        db.add(bot_user)
        await db.flush()
        await db.refresh(bot_user)
        return bot_user

    # обновляем существующего
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(bot_user, field, value)

    await db.flush()
    await db.refresh(bot_user)
    return bot_user

# bot/main.py

import asyncio

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.types import BotCommand

from config import settings
from routers import start, ritual, my, admin, ai_chat  # добавили ai_chat


async def set_commands(bot: Bot):
    commands = [
        BotCommand(command="start", description="Начать"),
        BotCommand(command="help", description="Помощь"),
        BotCommand(command="style", description="Сменить стиль общения"),
        BotCommand(command="master", description="Предпочитаемый мастер"),
        BotCommand(command="ritual", description="Подобрать ритуал"),
        BotCommand(command="my", description="Мои записи"),
        BotCommand(command="ask", description="Задать вопрос ассистенту"),  # новая команда
        # /admin_delete не добавляем в меню, это служебная команда
    ]
    await bot.set_my_commands(commands)


async def main():
    bot = Bot(
        token=settings.telegram_token,
        default=DefaultBotProperties(parse_mode="HTML"),
    )
    dp = Dispatcher()

    dp.include_router(start.router)
    dp.include_router(ritual.router)
    dp.include_router(my.router)
    dp.include_router(admin.router)  # админ‑роутер
    dp.include_router(ai_chat.router)  # новый роутер для /ask

    await set_commands(bot)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())

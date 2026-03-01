# bot/routers/my.py

from aiogram import Router, F
from aiogram.types import Message
import aiohttp
from datetime import datetime

from config import settings

router = Router()


def format_role_human(master_role: str | None) -> str:
    if master_role == "art_director":
        return "арт-директор"
    if master_role == "top_master":
        return "топ-мастер"
    return "мастер"


def format_dt_short(dt: datetime) -> str:
    # ждём ISO от бэкенда, парсим и даём формат ДД.MM HH:MM
    if isinstance(dt, str):
        try:
            dt = datetime.fromisoformat(dt.replace("Z", "+00:00"))
        except Exception:
            return dt
    return dt.strftime("%d.%m %H:%M")


@router.message(F.text == "/my")
async def my_bookings(message: Message):
    telegram_id = message.from_user.id
    url = f"{settings.backend_url}/api/bot/bookings/user/{telegram_id}"

    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(url) as resp:
                if resp.status != 200:
                    body = await resp.text()
                    print(f"Failed to load my bookings: {resp.status} {body}")
                    await message.answer(
                        "Сейчас не получается загрузить твои записи.\n"
                        "Попробуй, пожалуйста, чуть позже."
                    )
                    return
                bookings = await resp.json()
        except Exception as e:
            print(f"/my request error: {e}")
            await message.answer(
                "Сейчас не получается загрузить твои записи.\n"
                "Попробуй, пожалуйста, чуть позже."
            )
            return

    if not bookings:
        await message.answer(
            "У тебя пока нет активных записей через этого бота.\n\n"
            "Если хочешь, могу помочь подобрать ритуал и зафиксировать время — просто напиши /ritual."
        )
        return

    lines = []
    for b in bookings:
        dt = b.get("datetime")
        ritual_name = b.get("ritual_name") or "Ритуал"
        master_role = format_role_human(b.get("master_role"))
        dt_text = format_dt_short(dt)
        lines.append(f"• {dt_text} — {ritual_name} ({master_role})")

    text = "Твои предстоящие записи:\n\n" + "\n".join(lines)
    text += (
        "\n\nЕсли нужно перенести или отменить запись, "
        "пожалуйста, позвони администратору по номеру "
        "+7 (987) 755-30-00."
    )

    await message.answer(text)

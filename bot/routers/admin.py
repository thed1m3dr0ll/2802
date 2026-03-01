# bot/routers/admin.py

from aiogram import Router, F
from aiogram.types import Message
import aiohttp

from config import settings
from utils.admin import is_admin_from_message


router = Router()


@router.message(F.text.startswith("/admin_delete"))
async def admin_delete_booking(message: Message):
    # пускаем только админов
    if not is_admin_from_message(message):
        return

    parts = (message.text or "").split()
    if len(parts) < 2 or not parts[1].isdigit():
        await message.answer(
            "Использование:\n"
            "/admin_delete <record_id>\n\n"
            "Например:\n"
            "/admin_delete 1547637795"
        )
        return

    record_id = int(parts[1])

    url = f"{settings.backend_url}/api/bot/bookings/cancel/by-record-id/{record_id}"

    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(url) as resp:
                if resp.status == 200:
                    await message.answer(
                        f"Запись с record_id {record_id} помечена как отменённая."
                    )
                elif resp.status == 404:
                    await message.answer(
                        f"В базе бота не нашёл запись с record_id {record_id}."
                    )
                else:
                    body = await resp.text()
                    await message.answer(
                        f"Не получилось отменить запись (статус {resp.status}).\n{body}"
                    )
        except Exception as e:
            await message.answer(f"Ошибка при отмене записи: {e}")

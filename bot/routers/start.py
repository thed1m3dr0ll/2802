# bot/routers/start.py

from aiogram import Router, F
from aiogram.fsm.context import FSMContext
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder
import aiohttp

from config import settings
from .ritual import RitualStates, goal_keyboard


router = Router()


# тот же маппинг ролей, что и в backend/lib
YCLIENTS_ROLES: dict[int, str] = {
    3533027: "art_director",
    3498549: "top_master",
    3498548: "top_master",
    4910723: "top_master",
}


TELEGRAM_PUBLIC_LINK = "https://t.me/barberRomanChernov"
VK_PUBLIC_LINK = "https://vk.ru/barbershop_gentlemen"


# ====== Вспомогательные запросы к backend ======


async def update_preferred_staff(telegram_id: int, staff_id: int | None) -> None:
    url = f"{settings.backend_url}/api/bot/users/{telegram_id}/preferences"
    payload = {"preferred_staff_id": staff_id}
    async with aiohttp.ClientSession() as session:
        async with session.patch(url, json=payload) as resp:
            if resp.status >= 400:
                text = await resp.text()
                print(f"Failed to update preferred_staff_id: {resp.status} {text}")


async def ensure_bot_user(telegram_id: int) -> None:
    url = f"{settings.backend_url}/api/bot/users/{telegram_id}"
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json={}) as resp:
            if resp.status >= 400:
                text = await resp.text()
                print(f"Failed to ensure bot user: {resp.status} {text}")


async def get_bot_user(telegram_id: int) -> dict | None:
    url = f"{settings.backend_url}/api/bot/users/{telegram_id}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            if resp.status == 404:
                return None
            if resp.status >= 400:
                text = await resp.text()
                print(f"Failed to get bot user: {resp.status} {text}")
                return None
            return await resp.json()


# ====== Клавиатуры ======


def choose_barber_keyboard() -> InlineKeyboardBuilder:
    kb = InlineKeyboardBuilder()
    kb.button(
        text="Роман · Арт‑директор",
        callback_data="barber:3533027",
    )
    kb.button(
        text="Алексей · Топ‑барбер",
        callback_data="barber:4910723",
    )
    kb.button(
        text="Елена · Топ‑барбер",
        callback_data="barber:3498549",
    )
    kb.button(
        text="Максим · Топ‑барбер",
        callback_data="barber:3498548",
    )
    kb.adjust(1)
    return kb


def socials_keyboard() -> InlineKeyboardMarkup:
    """
    Кнопки с переходами в публичные площадки клуба.
    """
    kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Наш Telegram",
                    url=TELEGRAM_PUBLIC_LINK,
                )
            ],
            [
                InlineKeyboardButton(
                    text="Мы во ВКонтакте",
                    url=VK_PUBLIC_LINK,
                )
            ],
        ]
    )
    return kb


# ====== Хэндлеры ======


@router.message(F.text == "/start")
async def cmd_start(message: Message):
    telegram_id = message.from_user.id

    await ensure_bot_user(telegram_id)
    bot_user = await get_bot_user(telegram_id)

    saved_name = (bot_user or {}).get("name")
    if saved_name:
        welcome_name = saved_name
    else:
        # если имени нет, можно взять first_name из Telegram
        welcome_name = message.from_user.first_name or ""

    if welcome_name:
        prefix = f"{welcome_name}, привет, ты в клубе «Джентльмены Культуры».\n\n"
    else:
        prefix = "Привет, ты в клубе «Джентльмены Культуры».\n\n"

    # Основное приветствие с выбором мастера
    await message.answer(
        prefix
        + "Я твой персональный ассистент: помогу спокойно выбрать мастера, ритуал и удобное время — "
        "как внимательный администратор в барбершопе.\n\n"
        "С кем сегодня будет комфортнее всего?",
        reply_markup=choose_barber_keyboard().as_markup(),
    )

    # Отдельным сообщением — приглашение в публичные площадки
    await message.answer(
        "Если хочешь следить за атмосферой и новостями клуба — заходи сюда:",
        reply_markup=socials_keyboard(),
    )


@router.callback_query(F.data.startswith("barber:"))
async def barber_chosen(callback: CallbackQuery, state: FSMContext):
    telegram_id = callback.from_user.id
    staff_id_str = callback.data.split(":", 1)[1]
    staff_id = int(staff_id_str)

    # сохраняем выбранного мастера в backend
    await update_preferred_staff(telegram_id, staff_id)

    # определяем роль мастера по staff_id
    master_role = YCLIENTS_ROLES.get(staff_id, "top_master")

    # небольшая «человечная» подпись про мастера
    if staff_id == 3533027:
        barber_human = "Роман, арт‑директор клуба"
    elif staff_id == 4910723:
        barber_human = "Алексей, топ‑барбер"
    elif staff_id == 3498549:
        barber_human = "Елена, топ‑барбер"
    elif staff_id == 3498548:
        barber_human = "Максим, топ‑барбер"
    else:
        barber_human = "выбранный мастер"

    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(
        f"Благодарю, зафиксировал выбор: {barber_human}.\n\n"
        "Сейчас аккуратно подберём ритуал под твоё состояние и задачи.",
    )

    await state.clear()
    await state.update_data(
        use_preferred_staff=True,
        master_role=master_role,
    )
    await state.set_state(RitualStates.goal)

    await callback.message.answer(
        "Скажи, пожалуйста, какой у тебя запрос на сегодня:",
        reply_markup=goal_keyboard().as_markup(),
    )

    await callback.answer()

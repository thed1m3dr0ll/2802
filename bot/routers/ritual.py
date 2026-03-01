# bot/routers/ritual.py

from aiogram import Router, F
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import (
    Message,
    CallbackQuery,
    ReplyKeyboardMarkup,
    KeyboardButton,
)
from aiogram.utils.keyboard import InlineKeyboardBuilder
import aiohttp
from datetime import datetime

from config import settings

router = Router()


class RitualStates(StatesGroup):
    goal = State()
    zone = State()
    budget = State()

    master_role = State()

    confirm_booking = State()
    name = State()
    phone = State()
    date = State()
    time_slot_with_staff = State()
    client_comment = State()


# ===== вспомогательная функция для получения bot_user =====


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


# ===== клавиатуры и утилиты =====


def goal_keyboard() -> InlineKeyboardBuilder:
    kb = InlineKeyboardBuilder()
    kb.button(text="Освежить образ", callback_data="goal:refresh")
    kb.button(text="Заметные изменения", callback_data="goal:change")
    kb.button(text="К событию", callback_data="goal:event")
    kb.adjust(1)
    return kb


def zone_keyboard() -> InlineKeyboardBuilder:
    kb = InlineKeyboardBuilder()
    kb.button(text="Только стрижка", callback_data="zone:hair")
    kb.button(text="Только борода", callback_data="zone:beard")
    kb.button(text="Стрижка и борода", callback_data="zone:both")
    kb.adjust(1)
    return kb


def budget_keyboard() -> InlineKeyboardBuilder:
    kb = InlineKeyboardBuilder()
    kb.button(text="Аккуратно по бюджету", callback_data="budget:careful")
    kb.button(text="Главное — результат", callback_data="budget:result")
    kb.button(text="Обсудим на месте", callback_data="budget:talk")
    kb.adjust(1)
    return kb


def master_role_keyboard() -> InlineKeyboardBuilder:
    kb = InlineKeyboardBuilder()
    kb.button(text="Арт-директор 💈", callback_data="master_role:art_director")
    kb.button(text="Топ-барбер ✂️", callback_data="master_role:top_master")
    kb.adjust(1)
    return kb


def booking_confirm_keyboard() -> InlineKeyboardBuilder:
    kb = InlineKeyboardBuilder()
    kb.button(text="Записаться на этот ритуал", callback_data="booking:yes")
    kb.button(text="Подумать позже", callback_data="booking:later")
    kb.adjust(1)
    return kb


def phone_request_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="Отправить номер телефона", request_contact=True)],
            [KeyboardButton(text="Ввести номер вручную")],
        ],
        resize_keyboard=True,
        one_time_keyboard=True,
    )


def dates_keyboard(dates: list[str]) -> InlineKeyboardBuilder:
    kb = InlineKeyboardBuilder()
    for dt in dates:
        try:
            year, month, day = dt.split("-")
            label = f"{day}.{month}"
        except ValueError:
            label = dt

        kb.button(
            text=label,
            callback_data=f"date:{dt}",
        )
    kb.adjust(3)
    return kb


def slots_with_staff_keyboard(availabilities: list[dict]) -> InlineKeyboardBuilder:
    kb = InlineKeyboardBuilder()
    for staff_idx, staff_item in enumerate(availabilities):
        staff_name = staff_item.get("staff_name") or f"Мастер {staff_item.get('staff_id')}"
        slots = staff_item.get("slots") or []
        for slot_idx, slot in enumerate(slots):
            time_text = slot.get("time") or "слот"
            kb.button(
                text=f"{staff_name} — {time_text}",
                callback_data=f"slot:{staff_idx}:{slot_idx}",
            )
    kb.adjust(1)
    return kb


# ===== старт и квиз =====


@router.message(F.text.in_({"/ritual", "Ритуал", "подбор ритуала"}))
async def start_ritual_flow_command(message: Message, state: FSMContext):
    await state.clear()
    await state.set_state(RitualStates.goal)

    await state.update_data(use_preferred_staff=False)

    await message.answer(
        "Давайте спокойно подберём ритуал именно под ваш запрос.\n\n"
        "С чего начнём — какой сейчас настрой?",
        reply_markup=goal_keyboard().as_markup(),
    )


@router.callback_query(F.data == "ritual:start")
async def start_ritual_flow_callback(callback: CallbackQuery, state: FSMContext):
    await state.clear()
    await state.set_state(RitualStates.goal)

    await state.update_data(use_preferred_staff=False)

    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(
        "Сейчас аккуратно подберём ритуал под ваше состояние.\n\n"
        "Скажите, пожалуйста, какой у вас настрой:",
        reply_markup=goal_keyboard().as_markup(),
    )
    await callback.answer()


@router.callback_query(RitualStates.goal, F.data.startswith("goal:"))
async def goal_chosen(callback: CallbackQuery, state: FSMContext):
    goal = callback.data.split(":", 1)[1]

    await state.update_data(goal=goal)
    await state.set_state(RitualStates.zone)

    await callback.message.edit_reply_markup(reply_markup=None)

    if goal == "refresh":
        goal_text = "Освежить образ, без радикальных изменений."
    elif goal == "change":
        goal_text = "Сделать заметные изменения в образе."
    else:
        goal_text = "Подготовиться к событию."

    await callback.message.answer(
        f"Понимаю.\n\n"
        f"Запрос: <b>{goal_text}</b>\n\n"
        "Теперь давайте определимся с зоной:",
        reply_markup=zone_keyboard().as_markup(),
    )

    await callback.answer()


@router.callback_query(RitualStates.zone, F.data.startswith("zone:"))
async def zone_chosen(callback: CallbackQuery, state: FSMContext):
    zone = callback.data.split(":", 1)[1]

    await state.update_data(zone=zone)
    await state.set_state(RitualStates.budget)

    await callback.message.edit_reply_markup(reply_markup=None)

    if zone == "hair":
        zone_text = "Только стрижка."
    elif zone == "beard":
        zone_text = "Только борода."
    else:
        zone_text = "Стрижка и борода."

    await callback.message.answer(
        "Отлично, зафиксировал:\n"
        f"Зона: <b>{zone_text}</b>.\n\n"
        "Теперь уточним, как комфортнее всего по бюджету:",
        reply_markup=budget_keyboard().as_markup(),
    )

    await callback.answer()


@router.callback_query(RitualStates.budget, F.data.startswith("budget:"))
async def budget_chosen(callback: CallbackQuery, state: FSMContext):
    budget = callback.data.split(":", 1)[1]

    data = await state.get_data()
    goal = data.get("goal", "refresh")
    zone = data.get("zone", "hair")
    use_preferred_staff = data.get("use_preferred_staff", False)

    telegram_id = callback.from_user.id

    # сохраняем ответы квиза в профиле
    url = f"{settings.backend_url}/api/bot/users/{telegram_id}"
    payload = {
        "goal": goal,
        "zone": zone,
        "budget": budget,
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload) as resp:
            if resp.status >= 400:
                text = await resp.text()
                print(f"Failed to save quiz answers: {resp.status} {text}")

    # получаем рекомендацию ритуала
    recommend_url = (
        f"{settings.backend_url}/api/rituals/recommendations"
        f"?goal={goal}&zone={zone}&budget={budget}"
    )

    rituals = []
    async with aiohttp.ClientSession() as session:
        async with session.get(recommend_url) as resp:
            if resp.status == 200:
                rituals = await resp.json()
            else:
                text = await resp.text()
                print(f"Failed to get ritual recommendations: {resp.status} {text}")

    await callback.message.edit_reply_markup(reply_markup=None)

    if rituals:
        r = rituals[0]
        name = r.get("name", "Ритуал")
        duration_min = r.get("duration_minutes")
        price_from = r.get("price_from")

        await state.update_data(
            recommended_ritual=r,
            service_id_art_director=r.get("yclients_service_id_art_director"),
            service_id_top_master=r.get("yclients_service_id_top_master"),
            service_id=None,
            budget=budget,
            goal=goal,
            zone=zone,
        )

        if duration_min:
            duration_str = f"≈ {duration_min} минут"
        else:
            duration_str = "по времени подскажем перед записью"

        if price_from:
            price_str = f"от {price_from} ₽"
        else:
            price_str = "стоимость уточним заранее"
    else:
        name = "Подходящий ритуал"
        duration_str = "по длительности подберём индивидуально"
        price_str = "стоимость озвучим перед записью"
        await state.update_data(
            recommended_ritual=None,
            service_id_art_director=None,
            service_id_top_master=None,
            service_id=None,
            budget=budget,
            goal=goal,
            zone=zone,
        )

    if budget == "careful":
        budget_phrase = (
            "Сделаем акцент на аккуратном бюджете и обязательно заранее озвучим итоговую стоимость."
        )
    elif budget == "result":
        budget_phrase = (
            "Сфокусируемся на результате и подберём оптимальный формат без лишнего."
        )
    else:
        budget_phrase = (
            "Все нюансы по стоимости можно спокойно обсудить с администратором до начала сервиса."
        )

    goal_h = {
        "refresh": "Освежить образ",
        "change": "Заметные изменения",
        "event": "К событию",
    }.get(goal, "Освежить образ")

    zone_h = {
        "hair": "Только стрижка",
        "beard": "Только борода",
        "both": "Стрижка и борода",
    }.get(zone, "Стрижка и борода")

    budget_h = {
        "careful": "Аккуратно по бюджету",
        "result": "Главное — результат",
        "talk": "Обсудим на месте",
    }.get(budget, "Главное — результат")

    text = (
        "По вашим ответам вижу такой аккуратный вариант:\n\n"
        f"Запрос: <b>{goal_h}</b>\n"
        f"Зона: <b>{zone_h}</b>\n"
        f"Бюджет: <b>{budget_h}</b>\n\n"
        f"💼 <b>{name}</b>\n"
        f"⏱ {duration_str}\n"
        f"💰 {price_str}\n\n"
        f"{budget_phrase}"
    )

    if not use_preferred_staff:
        await callback.message.answer(
            text + "\n\nС кем будет комфортнее всего поработать?",
            reply_markup=master_role_keyboard().as_markup(),
        )
        await state.set_state(RitualStates.master_role)
        await callback.answer()
        return

    await callback.message.answer(
        text
        + "\n\nЕсли всё откликается, могу сразу предложить удобное время и зафиксировать бронь.",
        reply_markup=booking_confirm_keyboard().as_markup(),
    )
    await state.set_state(RitualStates.confirm_booking)
    await callback.answer()


@router.callback_query(RitualStates.master_role, F.data.startswith("master_role:"))
async def master_role_chosen(callback: CallbackQuery, state: FSMContext):
    role = callback.data.split(":", 1)[1]

    if role == "art_director":
        role_human = "арт-директором 💈"
    else:
        role_human = "топ-барбером ✂️"

    await state.update_data(master_role=role)

    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(
        f"Запишем к {role_human}.\n\n"
        "Сначала зафиксирую формат ритуала, потом предложу удобное время.",
        reply_markup=booking_confirm_keyboard().as_markup(),
    )
    await state.set_state(RitualStates.confirm_booking)
    await callback.answer()


@router.callback_query(RitualStates.confirm_booking, F.data == "booking:later")
async def booking_later(callback: CallbackQuery, state: FSMContext):
    await state.clear()
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(
        "Хорошо, оставим это на потом.\n"
        "Когда захотите зафиксировать время — просто напишите здесь, "
        "и я спокойно подберу для вас удобный слот."
    )
    await callback.answer()


@router.callback_query(RitualStates.confirm_booking, F.data == "booking:yes")
async def booking_yes(callback: CallbackQuery, state: FSMContext):
    await callback.message.edit_reply_markup(reply_markup=None)

    telegram_id = callback.from_user.id
    bot_user = await get_bot_user(telegram_id)
    saved_name = (bot_user or {}).get("name")

    if saved_name:
        await state.update_data(name=saved_name)
        await state.set_state(RitualStates.phone)

        await callback.message.answer(
            f"{saved_name}, давайте аккуратно зафиксируем бронь.\n\n"
            "Оставьте, пожалуйста, номер телефона для подтверждения записи.\n"
            "Можно отправить контакт кнопкой ниже или написать номер вручную.",
            reply_markup=phone_request_keyboard(),
        )
    else:
        await state.set_state(RitualStates.name)
        await callback.message.answer(
            "Отлично, давайте аккуратно зафиксируем бронь.\n\n"
            "Как к вам корректнее обращаться?",
        )

    await callback.answer()


@router.message(RitualStates.name)
async def booking_get_name(message: Message, state: FSMContext):
    name = (message.text or "").strip()
    await state.update_data(name=name)

    telegram_id = message.from_user.id
    save_url = f"{settings.backend_url}/api/bot/users/{telegram_id}"
    payload = {"name": name}

    async with aiohttp.ClientSession() as session:
        async with session.post(save_url, json=payload) as resp:
            if resp.status >= 400:
                body = await resp.text()
                print(f"Failed to save name: {resp.status} {body}")

    await state.set_state(RitualStates.phone)
    await message.answer(
        "Благодарю.\n\n"
        "Оставьте, пожалуйста, номер телефона для подтверждения записи.\n"
        "Можно отправить контакт кнопкой ниже или написать номер вручную.",
        reply_markup=phone_request_keyboard(),
    )


@router.message(RitualStates.phone)
async def booking_get_phone(message: Message, state: FSMContext):
    if message.contact and message.contact.phone_number:
        phone = message.contact.phone_number
    else:
        phone = (message.text or "").strip()

    await state.update_data(phone=phone)

    data = await state.get_data()
    master_role = data.get("master_role")
    if master_role not in ("art_director", "top_master"):
        master_role = "top_master"

    service_id_art = data.get("service_id_art_director")
    service_id_top = data.get("service_id_top_master")

    if master_role == "art_director":
        service_id = service_id_art
    else:
        service_id = service_id_top

    use_preferred_staff = data.get("use_preferred_staff", False)
    telegram_id = message.from_user.id

    dates: list[str] = []

    if use_preferred_staff:
        bot_user = await get_bot_user(telegram_id)
        staff_id = (bot_user or {}).get("preferred_staff_id")
        if staff_id:
            url = (
                f"{settings.backend_url}/api/yclients/available-days-by-staff"
                f"?service_id={int(service_id or 0)}&staff_id={int(staff_id)}"
            )
        else:
            url = (
                f"{settings.backend_url}/api/yclients/available-days-by-role"
                f"?service_id={int(service_id or 0)}&role={master_role}"
            )
    else:
        url = (
            f"{settings.backend_url}/api/yclients/available-days-by-role"
            f"?service_id={int(service_id or 0)}&role={master_role}"
        )

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            if resp.status == 200:
                try:
                    dates = await resp.json()
                except Exception as e:
                    print(f"Failed to parse available-days response JSON: {e}")
            else:
                body = await resp.text()
                print(f"Failed to get available days: {resp.status} {body}")

    if not dates:
        await message.answer(
            "Сейчас не вижу доступных дней для записи по этому формату и мастеру.\n"
            "Попробуйте, пожалуйста, выбрать другой ритуал или напишите администратору."
        )
        return

    await state.update_data(
        service_id=service_id,
        available_dates=dates,
    )
    await state.set_state(RitualStates.date)

    recommended_ritual = data.get("recommended_ritual") or {}
    ritual_name = recommended_ritual.get("name")

    if master_role == "art_director":
        master_role_text = "арт‑директор"
    else:
        master_role_text = "топ‑барбер"

    header_lines = []
    if ritual_name:
        header_lines.append(f"Ритуал: <b>{ritual_name}</b>")
    header_lines.append(f"Формат мастера: <b>{master_role_text}</b>")
    header_text = "\n".join(header_lines)

    await message.answer(
        f"{header_text}\n\n"
        "Когда вам будет комфортнее всего приехать в клуб?\n\n"
        "Выберите, пожалуйста, удобный день:",
        reply_markup=dates_keyboard(dates).as_markup(),
    )


@router.callback_query(RitualStates.date, F.data.startswith("date:"))
async def booking_pick_date(callback: CallbackQuery, state: FSMContext):
    _, date_str_api = callback.data.split(":", 1)  # YYYY-MM-DD

    await state.update_data(date=date_str_api)

    data = await state.get_data()
    master_role = data.get("master_role")
    if master_role not in ("art_director", "top_master"):
        master_role = "top_master"
    use_preferred_staff = data.get("use_preferred_staff", False)

    service_id = data.get("service_id")
    telegram_id = callback.from_user.id

    availabilities: list[dict] = []

    if use_preferred_staff:
        bot_user = await get_bot_user(telegram_id)
        staff_id = (bot_user or {}).get("preferred_staff_id")
        if not staff_id:
            availability_url = (
                f"{settings.backend_url}/api/yclients/availability-by-role"
                f"?service_id={int(service_id or 0)}&date={date_str_api}&role={master_role}"
            )
        else:
            availability_url = (
                f"{settings.backend_url}/api/yclients/availability-by-staff"
                f"?service_id={int(service_id or 0)}&date={date_str_api}&staff_id={int(staff_id)}"
            )
    else:
        availability_url = (
            f"{settings.backend_url}/api/yclients/availability-by-role"
            f"?service_id={int(service_id or 0)}&date={date_str_api}&role={master_role}"
        )

    async with aiohttp.ClientSession() as session:
        async with session.get(availability_url) as resp:
            if resp.status == 200:
                availabilities = await resp.json()
            else:
                body = await resp.text()
                print(f"Failed to get availability: {resp.status} {body}")

    await callback.message.edit_reply_markup(reply_markup=None)

    if not availabilities:
        await callback.message.answer(
            "Похоже, на этот день свободных слотов уже нет.\n"
            "Выберите, пожалуйста, другой день из календаря."
        )
        await callback.answer()
        return

    await state.update_data(
        availabilities=availabilities,
    )

    try:
        year, month, day = date_str_api.split("-")
        date_human = f"{day}.{month}.{year}"
    except ValueError:
        date_human = date_str_api

    await state.set_state(RitualStates.time_slot_with_staff)

    await callback.message.answer(
        f"Вот свободные варианты на {date_human}.\n"
        "Выберите, пожалуйста, удобное для вас время:",
        reply_markup=slots_with_staff_keyboard(availabilities).as_markup(),
    )
    await callback.answer()


@router.callback_query(RitualStates.time_slot_with_staff, F.data.startswith("slot:"))
async def booking_choose_time_with_staff(callback: CallbackQuery, state: FSMContext):
    _, staff_idx_str, slot_idx_str = callback.data.split(":", 2)
    try:
        staff_idx = int(staff_idx_str)
        slot_idx = int(slot_idx_str)
    except ValueError:
        await callback.answer("Неверный выбор слота", show_alert=True)
        return

    data = await state.get_data()
    availabilities: list[dict] = data.get("availabilities") or []

    if staff_idx < 0 or staff_idx >= len(availabilities):
        await callback.answer("Выбранный мастер недоступен", show_alert=True)
        return

    staff_item = availabilities[staff_idx]
    slots = staff_item.get("slots") or []

    if slot_idx < 0 or slot_idx >= len(slots):
        await callback.answer("Выбранный слот недоступен", show_alert=True)
        return

    slot = slots[slot_idx]

    await state.update_data(
        chosen_staff_idx=staff_idx,
        chosen_slot_idx=slot_idx,
        chosen_staff_item=staff_item,
        chosen_slot=slot,
    )

    await state.set_state(RitualStates.client_comment)

    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(
        "Если хотите, добавьте небольшой комментарий к записи — "
        "пожелания по образу, свои задачи или нюансы.\n"
        "Если ничего добавлять не нужно — просто напишите: Без комментария."
    )
    await callback.answer()


@router.message(RitualStates.client_comment)
async def booking_client_comment(message: Message, state: FSMContext):
    user_comment_raw = (message.text or "").strip()
    if not user_comment_raw:
        user_comment_raw = "Без комментария"

    data = await state.get_data()

    staff_item = data.get("chosen_staff_item") or {}
    slot = data.get("chosen_slot") or {}

    slot_datetime = slot.get("datetime")
    slot_time_text = slot.get("time")

    staff_id = staff_item.get("staff_id")
    staff_id_int = int(staff_id or 0)

    name = data.get("name")
    phone = data.get("phone")
    service_id = data.get("service_id")
    telegram_id = message.from_user.id
    username = message.from_user.username

    master_role = data.get("master_role")
    recommended_ritual = data.get("recommended_ritual") or {}
    ritual_name = recommended_ritual.get("name")

    goal = data.get("goal")
    zone = data.get("zone")
    budget = data.get("budget")

    email = ""

    comment_parts = [f"tg_id: {telegram_id}"]
    if username:
        comment_parts.append(f"tg_username: @{username}")
    if goal:
        comment_parts.append(f"goal: {goal}")
    if zone:
        comment_parts.append(f"zone: {zone}")
    if budget:
        comment_parts.append(f"budget: {budget}")
    comment_parts.append(f"chosen_slot_time: {slot_time_text}")
    if user_comment_raw.lower() != "без комментария":
        comment_parts.append(f"user_comment: {user_comment_raw}")
    comment = "; ".join(comment_parts)

    backend_payload = {
        "name": name,
        "phone": phone,
        "email": email,
        "serviceId": int(service_id or 0),
        "staffId": staff_id_int,
        "datetime": slot_datetime,
        "comment": comment,
    }

    book_url = f"{settings.backend_url}/api/yclients/book"

    success = False
    record_id = None
    record_hash = None

    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(book_url, json=backend_payload) as resp:
                if resp.status < 300:
                    try:
                        data_resp = await resp.json()
                        record_id = data_resp.get("recordId") or data_resp.get("record_id")
                        record_hash = data_resp.get("recordHash") or data_resp.get("record_hash")
                    except Exception as e:
                        print(f"Failed to parse booking response JSON: {e}")
                    success = True
                else:
                    body = await resp.text()
                    print(f"Booking failed: {resp.status} {body}")
        except Exception as e:
            print(f"Booking request error: {e}")

    if not success:
        await message.answer(
            "Не удалось аккуратно зафиксировать запись через систему.\n"
            "Пожалуйста, напишите, пожалуйста, администратору, он поможет подобрать время."
        )
        await state.clear()
        return

    # Сохраняем выбранного мастера как предпочтительного
    try:
        save_user_url = f"{settings.backend_url}/api/bot/users/{telegram_id}"
        save_payload = {
            "preferred_staff_id": staff_id_int,
            "preferred_staff_role": master_role,
            "last_ritual_name": ritual_name,
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(save_user_url, json=save_payload) as resp:
                if resp.status >= 400:
                    body = await resp.text()
                    print(f"Failed to save preferred staff: {resp.status} {body}")
    except Exception as e:
        print(f"Error while saving preferred staff: {e}")

    # Красиво подтверждаем запись
    try:
        dt_obj = None
        if slot_datetime:
            try:
                dt_obj = datetime.fromisoformat(str(slot_datetime).replace("Z", ""))
            except Exception:
                dt_obj = None

        if dt_obj:
            date_str_human = dt_obj.strftime("%d.%m.%Y")
            time_str_human = dt_obj.strftime("%H:%M")
        else:
            date_str_human = (slot_datetime or "")[:10]
            time_str_human = slot_time_text or ""

        staff_name = staff_item.get("staff_name") or f"мастер {staff_id_int}"
        ritual_part = f"Ритуал: {ritual_name}" if ritual_name else "Ритуал подберём на месте"

        text_lines = [
            "Я аккуратно зафиксировал вашу запись ✅",
            "",
            ritual_part,
            f"Мастер: {staff_name}",
            f"Дата: {date_str_human}",
            f"Время: {time_str_human}",
            "",
            "За час до визита мы напомним о записи.",
        ]

        if record_id:
            text_lines.append(f"Номер записи: {record_id}")

        await message.answer("\n".join(text_lines))
    except Exception as e:
        print(f"Error while sending booking confirmation: {e}")
        await message.answer(
            "Запись зафиксирована, но не удалось отправить подробности.\n"
            "При необходимости администратор уточнит детали по телефону <a href=\"tel:+79877553000\">+7&nbsp;987&nbsp;755&nbsp;30&nbsp;00</a>.",
            parse_mode="HTML",
        )

    await state.clear()

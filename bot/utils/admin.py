# bot/utils/admin.py

from aiogram.types import Message, CallbackQuery


ADMIN_IDS = {7430296150}  # сюда можно добавлять ещё id через запятую


def is_admin_from_message(message: Message) -> bool:
    return message.from_user and message.from_user.id in ADMIN_IDS


def is_admin_from_callback(callback: CallbackQuery) -> bool:
    return callback.from_user and callback.from_user.id in ADMIN_IDS

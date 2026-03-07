from aiogram import Router, F
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import Message

from ai_barber_client import ask_barber_ai

router = Router()

class AiChatStates(StatesGroup):
    chat = State()

@router.message(F.text == "/ask")
async def start_ai_chat(message: Message, state: FSMContext):
    await state.set_state(AiChatStates.chat)
    await message.answer(
        "Можешь спокойно задать вопрос ассистенту про стрижку, бороду, уход или образ.\n\n"
        "Когда захочешь выйти из этого режима, просто напиши /stop."
    )

@router.message(F.text == "/stop")
async def stop_ai_chat(message: Message, state: FSMContext):
    current_state = await state.get_state()
    if current_state == AiChatStates.chat:
        await state.clear()
        await message.answer("Хорошо, вернулись к обычному режиму.")
    else:
        await message.answer("Сейчас режим свободного общения с ассистентом не активен.")

@router.message(AiChatStates.chat, F.text)
async def ai_chat_message(message: Message, state: FSMContext):
    user_text = (message.text or "").strip()
    if not user_text:
        await message.answer("Напиши, пожалуйста, текст вопроса.")
        return

    reply = await ask_barber_ai(user_text)
    await message.answer(reply)

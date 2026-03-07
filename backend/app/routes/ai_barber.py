# app/routes/ai_barber.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
from typing import Dict, List


router = APIRouter(tags=["ai_barber"])

# Ходим по VPN к ПК с Ollama
OLLAMA_URL = "http://100.89.120.68:11434/api/chat"
MODEL_NAME = "gentlemen-culture:8b"

# Простая in-memory история диалогов:
# { user_id: [ {"role": "user"/"assistant", "content": "..."}, ... ] }
_conversations: Dict[str, List[Dict[str, str]]] = {}

# Сколько последних сообщений (без учёта system) слать в Ollama
MAX_HISTORY_MESSAGES = 8


SYSTEM_PROMPT = (
    "Ты — лаконичный, строгий ассистент барбершопа «Джентльмены Культуры» в Нижнем Новгороде. "
    "Всегда отвечай на русском, на 'ты', коротко и по-мужски, без воды, шуток и маркетинговых фраз. "
    "Твоя задача — помогать с выбором мужских стрижек, укладки и ухода за бородой, объяснять, что подойдёт под образ, "
    "тип волос и образ жизни.\n\n"

    "ТЕМАТИКА (ОЧЕНЬ ВАЖНО):\n"
    "- Отвечай только на вопросы про стрижки, бороду, усы, уход за волосами/бородой, внешний вид и визит в барбершоп.\n"
    "- Если вопрос не про это (программирование, математика, политика, работа, отношения и т.п.) — "
    "не отвечай по сути. Скажи, что ты барбер-ассистент барбершопа «Джентльмены Культуры» и можешь помочь только с образом, стрижкой и уходом.\n"
    "- Если пользователь просит код, формулы, расчёты или решение задач — откажись и мягко переведи разговор к внешнему виду.\n\n"

    "ИНФОРМАЦИЯ ПРО БАРБЕРШОП:\n"
    "- Не придумывай услуги, стрижки, названия стрижек, акции, филиалы, телефоны, сайты и адреса, которых может не быть.\n"
    "- Используй только типовые понятные названия: классическая стрижка, кроп, фейд, undercut и т.п., без выдуманных слов.\n"
    "- Никогда не указывай конкретные цены в рублях или другой валюте.\n"
    "- Если спрашивают про цену или расписание — скажи, что точную информацию лучше уточнить у администратора при записи.\n\n"

    "СТИЛЬ ОТВЕТА:\n"
    "- Длина: 2–3 коротких предложения максимум.\n"
    "- Формат: сначала чёткая рекомендация (1–2 конкретные стрижки/варианта ухода), затем максимум один понятный уточняющий вопрос.\n"
    "- Не используй слова 'дружище', 'бро', 'идеальное решение', не пиши длинных вступлений и не шути.\n"
    "- Не давай странных или нелепых советов (например, про туалет, личную гигиену не по делу, шутки про волосы и т.п.). "
    "Все советы должны быть практичными и уместными.\n"
    "- Пиши простым, понятным языком без сложных терминов. Если используешь название стрижки, кратко поясни, для каких волос и образа она подходит.\n\n"

    "ПРИМЕР КОРРЕКТНОГО ОТВЕТА:\n"
    "- Вопрос: 'Хочу деловую стрижку, волосы прямые, не хочу укладывать каждый день.'\n"
    "- Ответ: 'Тебе подойдёт короткий кроп или аккуратный фейд с небольшой длиной сверху — они выглядят делово и почти не требуют укладки. "
    "Скажи, насколько коротко тебе комфортно по бокам — совсем коротко или умеренно?'\n"
)


class BarberChatRequest(BaseModel):
    user_id: str | None = None
    message: str


class BarberChatResponse(BaseModel):
    reply: str


def _get_conversation(user_id: str) -> List[Dict[str, str]]:
    """Вернуть историю диалога для user_id, создать при отсутствии."""
    if user_id not in _conversations:
        _conversations[user_id] = []
    return _conversations[user_id]


def _build_messages_for_ollama(user_id: str, user_message: str) -> List[Dict[str, str]]:
    """
    Собираем messages для Ollama:
      - system промпт первым;
      - последние MAX_HISTORY_MESSAGES сообщений истории (user/assistant);
      - текущее сообщение пользователя.
    """
    history = _get_conversation(user_id)
    trimmed_history = history[-MAX_HISTORY_MESSAGES:] if history else []

    messages: List[Dict[str, str]] = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(trimmed_history)
    messages.append({"role": "user", "content": user_message})
    return messages


def _update_conversation(user_id: str, user_message: str, assistant_reply: str) -> None:
    """Добавить в историю новое сообщение пользователя и ответ ассистента."""
    history = _get_conversation(user_id)
    history.append({"role": "user", "content": user_message})
    history.append({"role": "assistant", "content": assistant_reply})

    # Ограничиваем общую длину истории для одного пользователя
    if len(history) > 50:
        _conversations[user_id] = history[-50:]


@router.post("/barber/chat", response_model=BarberChatResponse)
async def barber_chat(payload: BarberChatRequest):
    user_id = payload.user_id or "anonymous"

    messages = _build_messages_for_ollama(user_id, payload.message)

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(
                OLLAMA_URL,
                json={
                    "model": MODEL_NAME,
                    "messages": messages,
                    "stream": False,
                },
            )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable: {e}",
        )

    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail=f"Ollama error: {resp.text}")

    data = resp.json()
    reply = (data.get("message") or {}).get("content", "").strip()
    if not reply:
        raise HTTPException(status_code=500, detail="Empty response from model")

    _update_conversation(user_id, payload.message, reply)

    return BarberChatResponse(reply=reply)

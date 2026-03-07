# bot/ollama_client.py

import httpx

OLLAMA_URL = "http://127.0.0.1:31143"
MODEL_NAME = "barbershop-llm:8b"  # или "gentlemen-culture:8b"

SYSTEM_PROMPT = (
    "Ты ассистент барбершопа. "
    "Получаешь свободный текст клиента с его запросом, состоянием и пожеланиями. "
    "Переформулируй это аккуратно и сжато в одном-двух предложениях для администратора, "
    "без лишней воды, без обращения на 'вы' или по имени, "
    "сохрани суть и важные нюансы (событие, стиль, страхи, ограничения по времени и бюджету)."
)

async def summarize_comment(raw_comment: str) -> str:
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(
            f"{OLLAMA_URL}/api/chat",
            json={
                "model": MODEL_NAME,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": raw_comment},
                ],
                "stream": False,
            },
        )
        resp.raise_for_status()
        data = resp.json()
        return data["message"]["content"].strip()

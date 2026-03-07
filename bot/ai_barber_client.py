import aiohttp
from config import settings  # settings.backend_url уже используется в других местах


async def ask_barber_ai(message_text: str) -> str:
    url = f"{settings.backend_url}/api/barber/chat"
    payload = {"message": message_text}

    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload) as resp:
            if resp.status != 200:
                text = await resp.text()
                print(f"AI barber error: {resp.status} {text}")
                return (
                    "Сейчас не получается подключиться к ИИ‑ассистенту, "
                    "давай подберём ритуал вручную."
                )
            data = await resp.json()
            return (data.get("reply") or "").strip()

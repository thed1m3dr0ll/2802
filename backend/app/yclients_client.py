# app/yclients_client.py
import os
import httpx

YCLIENTS_BASE_URL = "https://api.yclients.com/api/v1"
YCLIENTS_COMPANY_ID = int(os.getenv("YCLIENTS_COMPANY_ID", "0"))

# Из backend/.env
YCLIENTS_PARTNER_TOKEN = os.getenv("YCLIENTS_PARTNER_TOKEN", "")
YCLIENTS_USER_TOKEN = os.getenv("YCLIENTS_USER_TOKEN", "")


async def create_yclients_record(payload: dict) -> dict:
    """
    Создание записи в YCLIENTS.
    """
    # Ровно как в примере из переписки:
    # Authorization: Bearer <partner_token>, User <user_token>
    auth_header = f"Bearer {YCLIENTS_PARTNER_TOKEN}, User {YCLIENTS_USER_TOKEN}"

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/vnd.yclients.v2+json",
        "Authorization": auth_header,
    }

    url = f"{YCLIENTS_BASE_URL}/records/{YCLIENTS_COMPANY_ID}"

    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(url, json=payload, headers=headers)
        try:
            data = resp.json()
        except Exception:
            data = {
                "success": False,
                "meta": {
                    "code": resp.status_code,
                    "message": "JSON decode error",
                },
            }
        return data

# app/yclients_client.py
import os
import httpx

YCLIENTS_BASE_URL = "https://api.yclients.com/api/v1"
YCLIENTS_COMPANY_ID = int(os.getenv("YCLIENTS_COMPANY_ID", "0"))
YCLIENTS_API_TOKEN = os.getenv("YCLIENTS_API_TOKEN", "")
YCLIENTS_PARTNER_TOKEN = os.getenv("YCLIENTS_PARTNER_TOKEN", "")


async def create_yclients_record(payload: dict) -> dict:
    """
    Создание записи в YCLIENTS.
    """
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/vnd.yclients.v2+json",
        "Authorization": f"Bearer {YCLIENTS_API_TOKEN}",
        "Y-Partner-Token": YCLIENTS_PARTNER_TOKEN,
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

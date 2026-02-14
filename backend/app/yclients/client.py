import os
import httpx

YCL_PARTNER_TOKEN = os.getenv("YCL_PARTNER_TOKEN")
YCL_USER_TOKEN = os.getenv("YCL_USER_TOKEN")
YCL_COMPANY_ID = int(os.getenv("YCL_COMPANY_ID", "1150256"))

BASE_URL = "https://api.yclients.com/api/v1"


async def create_record_and_get_user_id(
    *,
    name: str,
    phone: str,
    email: str | None,
    service_id: int,
    staff_id: int | None,
    datetime: str,
) -> tuple[int, int]:
    headers = {
        "Accept": "application/vnd.yclients.v2+json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {YCL_PARTNER_TOKEN}, User {YCL_USER_TOKEN}",
    }

    payload: dict = {
        "datetime": datetime,
        "services": [service_id],
        "client": {
            "name": name,
            "phone": phone,
        },
        "comment": "Запись с сайта gentlemen-nn.ru",
    }

    if email:
        payload["client"]["email"] = email
    if staff_id:
        payload["staff_id"] = staff_id

    async with httpx.AsyncClient(timeout=15) as client:
        resp = await client.post(
            f"{BASE_URL}/records/{YCL_COMPANY_ID}",
            headers=headers,
            json=payload,
        )

    data = resp.json()

    if not data.get("success"):
        raise Exception(data.get("meta") or data)

    record = data["data"]
    record_id = record["id"]
    user_id = record["client"]["id"]  # вот Yclients user_id

    return record_id, user_id

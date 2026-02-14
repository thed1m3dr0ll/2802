import os
import httpx

YCLIENTS_COMPANY_ID = int(os.getenv("YCLIENTS_COMPANY_ID", "0"))
YCLIENTS_FORM_ID = int(os.getenv("YCLIENTS_FORM_ID", "0"))  # номер виджета
YCLIENTS_USER_TOKEN = os.getenv("YCLIENTS_USER_TOKEN", "")

async def book_record_and_get_ids(
    name: str,
    phone: str,
    email: str | None,
    service_id: int,
    staff_id: int | None,
    datetime_str: str,
    comment: str | None,
) -> tuple[int, int]:
    url = f"https://n{YCLIENTS_FORM_ID}.yclients.com/api/v1/book_record/{YCLIENTS_COMPANY_ID}/"

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"User {YCLIENTS_USER_TOKEN}",
    }

    payload = {
        "phone": phone,
        "email": email or "",
        "fullname": name,
        "appointments": [
            {
                "id": 1,
                "services": [int(service_id)],
                "staff_id": int(staff_id or 0),
                "events": [],
                "datetime": datetime_str,
                "chargeStatus": "",
                "comment": comment or "",
            }
        ],
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(url, json=payload, headers=headers)

    data = resp.json()

    if "errors" in data and data["errors"]:
        # старый формат ошибок book_record
        raise Exception(data["errors"])

    # успешный ответ: запись + клиент внутри
    record = data.get("record") or data
    record_id = record["id"]
    user_id = record["client"]["id"]

    return record_id, user_id

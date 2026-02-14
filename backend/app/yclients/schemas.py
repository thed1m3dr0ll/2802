# app/yclients/client.py (или ./client.py в том же пакете, откуда импортируешь)
import os
import httpx


YCLIENTS_COMPANY_ID = int(os.getenv("YCLIENTS_COMPANY_ID", "0"))
YCLIENTS_API_TOKEN = os.getenv("YCLIENTS_API_TOKEN", "")
YCLIENTS_PARTNER_TOKEN = os.getenv("YCLIENTS_PARTNER_TOKEN", "")
YCLIENTS_FORM_ID = os.getenv("YCLIENTS_FORM_ID", "1")  # если нужен n{form_id}.yclients.com


async def create_record_and_get_user_id(
    name: str,
    phone: str,
    email: str | None,
    service_id: int,
    staff_id: int | None,
    datetime: str,
) -> tuple[int, int]:
    """
    Создаёт запись в YCLIENTS и возвращает (record_id, user_id).
    """
    # URL в стиле старой формы брони (book_record)
    url = f"https://n{YCLIENTS_FORM_ID}.yclients.com/api/v1/book_record/{YCLIENTS_COMPANY_ID}/"

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {YCLIENTS_API_TOKEN}",
        "Cache-Control": "no-cache",
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
                "datetime": datetime,  # "2026-02-14T19:30:00"
                "chargeStatus": "",
                "comment": "",
            }
        ],
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(url, json=payload, headers=headers)

    data = resp.json()

    # Если обёртка/аккаунт возвращает не success/meta, а чистый объект записи,
    # здесь можно адаптировать. Ниже вариант, когда приходит success + data.
    if isinstance(data, dict) and data.get("errors"):
        # Yclients v1-style ошибка
        raise Exception(data["errors"].get("message", "YCLIENTS error"))

    # Если ты используешь v2 /records, тут нужно будет подстроить структуру.
    # Пример для v2:
    #
    # if not data.get("success"):
    #     meta = data.get("meta") or data
    #     raise Exception(meta)

    # Предполагаем, что успешный ответ содержит data с полями id и client.id
    record = data.get("data") or data
    record_id = record["id"]
    user_id = record["client"]["id"]

    return record_id, user_id

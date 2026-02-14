# app/yclients_api.py
import os
from typing import List, Optional

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()  # загрузит .env из корня backend

import httpx
from fastapi import APIRouter, HTTPException, Query
from yclients import YClientsAPI  # официальная обёртка

# --------- НАСТРОЙКИ YCLIENTS ---------

try:
    YCLIENTS_USER_TOKEN = os.environ["YCLIENTS_USER_TOKEN"]
    YCLIENTS_COMPANY_ID = int(os.environ["YCLIENTS_COMPANY_ID"])
    YCLIENTS_FORM_ID = int(os.environ["YCLIENTS_FORM_ID"])  # n1258165 -> 1258165
    YCLIENTS_PARTNER_TOKEN = os.environ["YCLIENTS_PARTNER_TOKEN"]
except KeyError as e:
    raise RuntimeError(
        f"YCLIENTS env variable is missing: {e}. "
        "Проверь .env в backend, должны быть YCLIENTS_USER_TOKEN, "
        "YCLIENTS_COMPANY_ID, YCLIENTS_FORM_ID и YCLIENTS_PARTNER_TOKEN."
    ) from e


BASE_URL = "https://api.yclients.com/api/v1"

router = APIRouter(prefix="/yclients", tags=["yclients"])


def _headers() -> dict:
    """
    Базовые заголовки для REST v2 (services/staff/availability).
    """
    return {
        "Content-Type": "application/json",
        "Accept": "application/vnd.yclients.v2+json",
        "Authorization": f"Bearer {YCLIENTS_PARTNER_TOKEN}, User {YCLIENTS_USER_TOKEN}",
    }


# --------- DEBUG /me ---------


@router.get("/me-debug")
async def me_debug():
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{BASE_URL}/me", headers=_headers())
    try:
        data = resp.json()
    except ValueError:
        raise HTTPException(
            status_code=502,
            detail=f"Invalid JSON from YCLIENTS (status={resp.status_code})",
        )
    return data


# --------- ОБЁРТКА YCLIENTSAPI ---------


def get_api_client() -> YClientsAPI:
    return YClientsAPI(
        token=YCLIENTS_PARTNER_TOKEN,
        company_id=YCLIENTS_COMPANY_ID,
        form_id=0,
    )


# --------- УСЛУГИ (РИТУАЛЫ) ---------


@router.get("/services")
async def get_services():
    url = f"{BASE_URL}/services/{YCLIENTS_COMPANY_ID}"

    async with httpx.AsyncClient() as client:
        resp = await client.get(url, headers=_headers())

    try:
        data = resp.json()
    except ValueError:
        raise HTTPException(
            status_code=502,
            detail=f"Invalid JSON from YCLIENTS (status={resp.status_code})",
        )

    if not data.get("success"):
        meta = data.get("meta") or data
        raise HTTPException(status_code=502, detail=meta)

    services = data.get("data") or []
    return [
        {"id": str(s["id"]), "name": s["title"]}
        for s in services
    ]


# --------- СОТРУДНИКИ (МАСТЕРА) ---------


@router.get("/staff")
async def get_staff():
    url = f"{BASE_URL}/staff/{YCLIENTS_COMPANY_ID}"

    async with httpx.AsyncClient() as client:
        resp = await client.get(url, headers=_headers())

    try:
        data = resp.json()
    except ValueError:
        raise HTTPException(
            status_code=502,
            detail=f"Invalid JSON from YCLIENTS (status={resp.status_code})",
        )

    if not data.get("success"):
        meta = data.get("meta") or data
        raise HTTPException(status_code=502, detail=meta)

    staff = data.get("data") or []
    return [
        {"id": str(s["id"]), "name": s["name"]}
        for s in staff
    ]


# --------- СВОБОДНЫЕ СЛОТЫ ---------


@router.get("/availability")
async def get_availability(
    service_id: int = Query(..., description="ID услуги в YCLIENTS (например, 21342282)"),
    date: str = Query(..., description="Дата в формате YYYY-MM-DD"),
    staff_id: Optional[int] = Query(
        None,
        description="ID мастера; если не задан, собираем по всем bookable мастерам",
    ),
) -> List[str]:
    api_client = get_api_client()

    if staff_id is None:
        async with httpx.AsyncClient() as client:
            staff_url = f"{BASE_URL}/staff/{YCLIENTS_COMPANY_ID}"
            staff_resp = await client.get(staff_url, headers=_headers())

        try:
            staff_data = staff_resp.json()
        except ValueError:
            raise HTTPException(
                status_code=502,
                detail=f"Invalid JSON from YCLIENTS (status={staff_resp.status_code})",
            )

        if not staff_data.get("success"):
            meta = staff_data.get("meta") or staff_data
            raise HTTPException(status_code=502, detail=meta)

        staff_list: List[int] = [
            int(s["id"])
            for s in staff_data.get("data", [])
            if s.get("bookable")
        ]
    else:
        staff_list = [staff_id]

    slots_set: set[str] = set()

    for sid in staff_list:
        try:
            days = api_client.get_available_days(staff_id=sid, service_id=service_id)
            print("DEBUG days:", {"staff_id": sid, "service_id": service_id, "date": date, "raw": days})
        except Exception as e:
            print("ERROR get_available_days:", {"staff_id": sid, "service_id": service_id, "error": str(e)})
            continue

        data = days.get("data") or {}
        booking_dates: List[str] = data.get("booking_dates") or []

        if date not in booking_dates:
            print("DEBUG no_date_in_booking_dates:", {
                "staff_id": sid,
                "service_id": service_id,
                "date": date,
                "booking_dates": booking_dates,
            })
            continue

        try:
            times = api_client.get_available_times(
                staff_id=sid,
                service_id=service_id,
                day=date,
            )
            print("DEBUG times:", {"staff_id": sid, "service_id": service_id, "date": date, "raw": times})
        except Exception as e:
            print("ERROR get_available_times:", {"staff_id": sid, "service_id": service_id, "error": str(e)})
            continue

        times_data = times.get("data") or []
        for item in times_data:
            time_str = item.get("time")
            if time_str:
                slots_set.add(time_str)

    return sorted(slots_set)


# --------- СОЗДАНИЕ ЗАПИСИ (book_record) ---------


class BookingRequest(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    serviceId: int
    staffId: Optional[int] = None
    datetime: str  # "2026-02-14T19:30:00"
    comment: Optional[str] = None


@router.post("/book")
async def create_booking(payload: BookingRequest):
    """
    Создать запись через book_record виджета и вернуть recordId + userId.
    """
    url = f"https://n{YCLIENTS_FORM_ID}.yclients.com/api/v1/book_record/{YCLIENTS_COMPANY_ID}/"

    # используем partner token (как и в остальных запросах)
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {YCLIENTS_PARTNER_TOKEN}, User {YCLIENTS_USER_TOKEN}",
    }

    body = {
        "phone": payload.phone,
        "email": payload.email or "",
        "fullname": payload.name,
        "appointments": [
            {
                "id": 1,
                "services": [int(payload.serviceId)],
                "staff_id": int(payload.staffId or 0),
                "events": [],
                "datetime": payload.datetime,
                "chargeStatus": "",
                "comment": payload.comment or "",
            }
        ],
    }

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(url, json=body, headers=headers)
        except Exception as e:
            print("ERROR book_record request:", {
                "url": url,
                "body": body,
                "error": str(e),
            })
            raise HTTPException(
                status_code=502,
                detail=f"YCLIENTS book_record request error: {e}",
            )

    try:
        data = resp.json()
    except ValueError:
        raise HTTPException(
            status_code=502,
            detail=f"Invalid JSON from YCLIENTS (status={resp.status_code})",
        )

    print("DEBUG book_record:", {
        "status": resp.status_code,
        "request_body": body,
        "response": data,
    })

    # старый формат ошибок book_record (dict с полем errors)
    if isinstance(data, dict) and data.get("errors"):
        raise HTTPException(status_code=502, detail=data["errors"])

    # новый формат: success / meta / data — если не success, кидаем 400 с сообщением
    if isinstance(data, dict) and not data.get("success", True):
        message = (
            data.get("meta", {}).get("message")
            or data.get("message")
            or "Ошибка при создании записи в YCLIENTS"
        )
        raise HTTPException(status_code=400, detail=message)

    # успешный ответ
    record_id: Optional[int] = None
    user_id: Optional[int] = None

    if isinstance(data, list):
        # формат из твоего лога: [{'id': 1, 'record_id': ..., 'record_hash': ...}]
        first = data[0] if data else None
        if not first:
            raise HTTPException(status_code=502, detail="Пустой ответ от YCLIENTS book_record")
        record_id = first.get("record_id")
        # user_id здесь нет — если понадобится, будешь получать его отдельным запросом
    elif isinstance(data, dict):
        # альтернативный формат: { "record": {...}, "client": {...} }
        record = data.get("record") or data
        record_id = record.get("id") or record.get("record_id")
        client = record.get("client") or data.get("client") or {}
        user_id = client.get("id")

    if record_id is None:
        raise HTTPException(status_code=502, detail="Не удалось получить record_id из ответа YCLIENTS")

    return {
        "success": True,
        "recordId": record_id,
        "userId": user_id,
    }

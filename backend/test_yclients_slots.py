# backend/test_yclients_slots.py
from yclients import YClientsAPI

TOKEN = "7nm2wbfhrs9g7xfdf3sx"   # YCLIENTS_PARTNER_TOKEN
CID = 1150256                   # YCLIENTS_COMPANY_ID
FID = 0                         # формы нет явной, используем 0

api = YClientsAPI(token=TOKEN, company_id=CID, form_id=FID)

ROMAN_ID = 3533027          # Роман
SERVICE_ID = 21342282       # Комплекс "стрижка + борода"

# 1. Доступные дни (на всякий случай, чтобы видеть полный список)
booking_days = api.get_available_days(staff_id=ROMAN_ID, service_id=SERVICE_ID)
print("BOOKING_DAYS:", booking_days)

# Берём, например, сегодня или 2026-02-13
DAY = "2026-02-13"          # можно поменять на любую дату из booking_dates

# 2. Временные слоты
time_slots = api.get_available_times(staff_id=ROMAN_ID, service_id=SERVICE_ID, day=DAY)
print("TIME_SLOTS:", time_slots)

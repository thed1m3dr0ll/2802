# backend/app/routes/rituals.py

from typing import List, Optional, Literal, Dict

from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter(prefix="/rituals", tags=["rituals"])


# ==== Типы ====

MasterRole = Literal["art_director", "top_master"]


class Ritual(BaseModel):
    name: str
    description: Optional[str] = None
    duration_minutes: int
    price_from: int
    yclients_service_id_top_master: int
    yclients_service_id_art_director: int


class RitualItem(BaseModel):
    id: int
    name: str


class LogicalRitual(BaseModel):
    key: str
    name: str
    duration_minutes: int
    price_from: int
    group_id: Literal["group-hair", "group-beard", "group-care"]
    service_id_by_role: Dict[MasterRole, int]


# ==== МАППИНГ УСЛУГ ПО РОЛЯМ (как у тебя) ====


YCLIENTS_SERVICES_BY_ROLE: dict[str, dict[str, str]] = {
    "Мужская стрижка": {
        "art_director": "21341952",
        "top_master": "17209453",
    },
    'Комплекс "стрижка + борода"': {
        "art_director": "21342282",
        "top_master": "17404423",
    },
    "Моделирование бороды": {
        "art_director": "21342075",
        "top_master": "17404445",
    },
    "Детская стрижка": {
        "art_director": "21357813",
        "top_master": "17404447",
    },
    "Стрижка машинкой": {
        "art_director": "21357876",
        "top_master": "17404449",
    },
    "Удаление воском": {
        "art_director": "24828141",
        "top_master": "17404455",
    },
    "Опасное бритье": {
        "art_director": "21358053",
        "top_master": "17404464",
    },
    "Укладка": {
        "art_director": "24828258",
        "top_master": "17404468",
    },
    "Черная маска": {
        "art_director": "24827991",
        "top_master": "17404469",
    },
    "Стрижка отец + сын": {
        "art_director": "21357765",
        "top_master": "17404475",
    },
    "Стрижка ножницами": {
        "art_director": "21357735",
        "top_master": "17404481",
    },
    "Камуфляж головы": {
        "art_director": "21358224",
        "top_master": "17404491",
    },
    "Камуфляж бороды": {
        "art_director": "21358284",
        "top_master": "17404495",
    },
    "Патчи": {
        "art_director": "24828357",
        "top_master": "17965734",
    },
    "Премиум уход за кожей головы и волосами": {
        "art_director": "21357675",
        "top_master": "19282256",
    },
    "Детокс уход бороды и кожи лица": {
        "art_director": "21357723",
        "top_master": "19281924",
    },
}


# ==== Логический список всех ритуалов (16 штук) ====
# duration_minutes и price_from берём из прайса (топ-мастер как "от")


LOGICAL_RITUALS: list[LogicalRitual] = [
    LogicalRitual(
        key="complex_hair_beard",
        name='Комплекс "стрижка + борода"',
        duration_minutes=120,  # 7200 / 60
        price_from=2400,
        group_id="group-hair",
        service_id_by_role={
            "art_director": 21342282,
            "top_master": 17404423,
        },
    ),
    LogicalRitual(
        key="mens_haircut",
        name="Мужская стрижка",
        duration_minutes=60,
        price_from=1500,
        group_id="group-hair",
        service_id_by_role={
            "art_director": 21341952,
            "top_master": 17209453,
        },
    ),
    LogicalRitual(
        key="beard_modeling",
        name="Моделирование бороды",
        duration_minutes=60,
        price_from=1100,
        group_id="group-beard",
        service_id_by_role={
            "art_director": 21342075,
            "top_master": 17404445,
        },
    ),
    LogicalRitual(
        key="premium_scalp_care",
        name="Премиум уход за кожей головы и волосами",
        duration_minutes=15,
        price_from=1000,
        group_id="group-care",
        service_id_by_role={
            "art_director": 21357675,
            "top_master": 19282256,
        },
    ),
    LogicalRitual(
        key="beard_detox",
        name="Детокс уход бороды и кожи лица",
        duration_minutes=15,
        price_from=1000,
        group_id="group-beard",
        service_id_by_role={
            "art_director": 21357723,
            "top_master": 19281924,
        },
    ),
    LogicalRitual(
        key="scissors_haircut",
        name="Стрижка ножницами",
        duration_minutes=60,
        price_from=2000,
        group_id="group-hair",
        service_id_by_role={
            "art_director": 21357735,
            "top_master": 17404481,
        },
    ),
    LogicalRitual(
        key="father_son",
        name="Стрижка отец + сын",
        duration_minutes=120,
        price_from=2500,
        group_id="group-hair",
        service_id_by_role={
            "art_director": 21357765,
            "top_master": 17404475,
        },
    ),
    LogicalRitual(
        key="kids_haircut",
        name="Детская стрижка",
        duration_minutes=60,
        price_from=1200,
        group_id="group-hair",
        service_id_by_role={
            "art_director": 21357813,
            "top_master": 17404447,
        },
    ),
    LogicalRitual(
        key="machine_haircut",
        name="Стрижка машинкой",
        duration_minutes=30,
        price_from=1100,
        group_id="group-hair",
        service_id_by_role={
            "art_director": 21357876,
            "top_master": 17404449,
        },
    ),
    LogicalRitual(
        key="dangerous_shave",
        name="Опасное бритье",
        duration_minutes=60,
        price_from=1200,
        group_id="group-beard",
        service_id_by_role={
            "art_director": 21358053,
            "top_master": 17404464,
        },
    ),
    LogicalRitual(
        key="head_camouflage",
        name="Камуфляж головы",
        duration_minutes=30,
        price_from=1100,
        group_id="group-care",
        service_id_by_role={
            "art_director": 21358224,
            "top_master": 17404491,
        },
    ),
    LogicalRitual(
        key="beard_camouflage",
        name="Камуфляж бороды",
        duration_minutes=30,
        price_from=1000,
        group_id="group-beard",
        service_id_by_role={
            "art_director": 21358284,
            "top_master": 17404495,
        },
    ),
    LogicalRitual(
        key="black_mask",
        name="Черная маска",
        duration_minutes=30,
        price_from=1000,
        group_id="group-care",
        service_id_by_role={
            "art_director": 24827991,
            "top_master": 17404469,
        },
    ),
    LogicalRitual(
        key="styling",
        name="Укладка",
        duration_minutes=15,
        price_from=500,
        group_id="group-hair",
        service_id_by_role={
            "art_director": 24828258,
            "top_master": 17404468,
        },
    ),
    LogicalRitual(
        key="wax_removal",
        name="Удаление воском",
        duration_minutes=15,
        price_from=400,
        group_id="group-care",
        service_id_by_role={
            "art_director": 24828141,
            "top_master": 17404455,
        },
    ),
    LogicalRitual(
        key="patches",
        name="Патчи",
        duration_minutes=5,
        price_from=300,
        group_id="group-care",
        service_id_by_role={
            "art_director": 24828357,
            "top_master": 17965734,
        },
    ),
]


# ===== Список всех ритуалов для выбора (как было) =====

ALL_RITUALS: list[RitualItem] = [
    RitualItem(id=1, name="Мужская стрижка"),
    RitualItem(id=2, name='Комплекс "стрижка + борода"'),
    RitualItem(id=3, name="Моделирование бороды"),
    RitualItem(id=4, name="Детская стрижка"),
    RitualItem(id=5, name="Стрижка машинкой"),
    RitualItem(id=6, name="Удаление воском"),
    RitualItem(id=7, name="Опасное бритье"),
    RitualItem(id=8, name="Укладка"),
    RitualItem(id=9, name="Черная маска"),
    RitualItem(id=10, name="Стрижка отец + сын"),
    RitualItem(id=11, name="Стрижка ножницами"),
    RitualItem(id=12, name="Камуфляж головы"),
    RitualItem(id=13, name="Камуфляж бороды"),
    RitualItem(id=14, name="Патчи"),
    RitualItem(id=15, name="Премиум уход за кожей головы и волосами"),
    RitualItem(id=16, name="Детокс уход бороды и кожи лица"),
]


@router.get("/", response_model=List[RitualItem])
async def list_rituals() -> List[RitualItem]:
    return ALL_RITUALS


@router.get("/logical", response_model=List[LogicalRitual])
async def list_logical_rituals() -> List[LogicalRitual]:
    return LOGICAL_RITUALS


def _ritual_config_by_zone(goal: str, zone: str) -> tuple[str, int, int]:
    """
    Возвращает (name, duration_minutes, price_from) базового ритуала
    под комбинацию goal/zone.
    Цены берём из прайса как минимальные (от топ-мастера).
    """

    if zone == "hair":
        # event -> стрижка ножницами, остальное -> мужская стрижка
        if goal == "event":
            return "Стрижка ножницами", 60, 2000
        else:
            return "Мужская стрижка", 45, 1500

    elif zone == "beard":
        # Моделирование бороды
        return "Моделирование бороды", 30, 1100

    else:  # both
        # Комплекс стрижка+борода
        return 'Комплекс "стрижка + борода"', 75, 2400


def _apply_budget_adjustments(
    duration_minutes: int,
    price_from: int,
    budget: str,
) -> tuple[int, int]:
    """
    Для бюджета меняем только длительность, цену оставляем по прайсу.
    """
    d = duration_minutes
    p = price_from

    if budget == "careful":
        d = max(30, d - 10)
    elif budget == "result":
        d = d + 10

    return d, p


@router.get("/recommendations", response_model=List[Ritual])
async def get_ritual_recommendations(
    goal: str = Query(..., description="refresh | change | event"),
    zone: str = Query(..., description="hair | beard | both"),
    budget: str = Query(..., description="careful | result | talk"),
) -> List[Ritual]:
    """
    Отдаёт один ритуал под goal/zone/budget с корректными service_id
    для топ-мастера и арт-директора.
    """

    if goal not in {"refresh", "change", "event"}:
        goal = "refresh"
    if zone not in {"hair", "beard", "both"}:
        zone = "hair"
    if budget not in {"careful", "result", "talk"}:
        budget = "talk"

    name, base_duration, base_price = _ritual_config_by_zone(goal, zone)
    duration, price = _apply_budget_adjustments(base_duration, base_price, budget)

    service_map = YCLIENTS_SERVICES_BY_ROLE.get(name)
    if not service_map:
        return []

    try:
        top_id = int(service_map["top_master"])
        art_id = int(service_map["art_director"])
    except (KeyError, ValueError):
        return []

    ritual = Ritual(
        name=name,
        description=None,
        duration_minutes=duration,
        price_from=price,
        yclients_service_id_top_master=top_id,
        yclients_service_id_art_director=art_id,
    )

    return [ritual]

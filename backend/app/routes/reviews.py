from fastapi import APIRouter
from pydantic import BaseModel
from typing import Literal, List


# схема отзыва для API
class Review(BaseModel):
    id: int
    author: str
    source: Literal["yandex", "2gis", "site"]
    rating: int
    text: str


router = APIRouter(prefix="/reviews", tags=["reviews"])

# временные данные (заглушка вместо базы)
_FAKE_REVIEWS: List[Review] = [
    Review(
        id=1,
        author="Александр",
        source="yandex",
        rating=5,
        text="Отличное место: записываюсь заранее и всегда знаю, что выйду из кресла собранным. Без суеты, без очередей.",
    ),
    Review(
        id=2,
        author="Илья",
        source="2gis",
        rating=5,
        text="Мастера с головой: слышат запрос, предлагают варианты, честно говорят, что подойдёт. Атмосфера клуба.",
    ),
    Review(
        id=3,
        author="Дмитрий",
        source="site",
        rating=5,
        text="Зашёл по рекомендации — остался постоянным гостем. Нормальные разговоры и уважение к времени.",
    ),
]


@router.get("/", response_model=list[Review])
async def list_reviews() -> list[Review]:
    """
    Список отзывов для сайта.
    Пока отдаём данные из памяти, позже подключим базу.
    """
    return _FAKE_REVIEWS

FROM python:3.11-slim

# Рабочая директория внутри контейнера
WORKDIR /app

# Обновляем pip и ставим зависимости
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r /app/requirements.txt

# Копируем всё приложение (включая alembic.ini и migrations)
COPY . /app

# Переменные окружения (Python в прод‑режиме)
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Стартовый скрипт, который сначала применяет миграции, потом запускает uvicorn
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

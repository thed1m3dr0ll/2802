FROM python:3.11-slim

# Рабочая директория внутри контейнера
WORKDIR /app

# Устанавливаем зависимости
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Копируем всё приложение
COPY . /app

# Переменные окружения (Python в прод‑режиме)
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Команда запуска (тот же, что в docker-compose)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

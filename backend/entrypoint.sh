#!/bin/sh
set -e

cd /app

# Прогоняем миграции перед запуском приложения
alembic upgrade head

# Запускаем приложение
exec uvicorn app.main:app --host 0.0.0.0 --port 8000

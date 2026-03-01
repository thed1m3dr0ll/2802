FROM python:3.11-slim

WORKDIR /app

RUN pip install --no-cache-dir aiogram==3.10.0 aiohttp==3.9.5

COPY . .

CMD ["python", "main.py"]

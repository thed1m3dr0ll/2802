FROM python:3.12-slim-bookworm AS backend

WORKDIR /app

# копируем requirements и локальные wheels
COPY requirements.txt .
COPY wheelhouse ./wheelhouse

# ставим зависимости только из локальных .whl
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-index --find-links=wheelhouse -r requirements.txt

# копируем код
COPY . .
COPY entrypoint.sh /entrypoint.sh

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

RUN chmod +x /entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]

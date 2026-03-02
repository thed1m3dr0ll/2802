# === Stage 1: установка зависимостей (deps) ===
# Здесь я ставлю все node-зависимости по package-lock, без лишних dev-тулов.
FROM node:20-alpine AS deps

# Рабочая директория внутри контейнера
WORKDIR /app

# Раньше здесь ставился libc6-compat, сейчас отключено, чтобы не висла сборка
# RUN apk add --no-cache libc6-compat

# Сначала копирую только package.json / package-lock.json,
# чтобы кэшировать слой с node_modules
COPY package.json package-lock.json* ./

# Ставлю зависимости в строгом соответствии с lock-файлом
RUN npm ci



# === Stage 2: сборка Next.js (builder) ===
# На этом этапе собираю продовый билд Next.js в standalone-режиме.
FROM node:20-alpine AS builder

WORKDIR /app

# Подтягиваю готовые node_modules из deps-стейджа
COPY --from=deps /app/node_modules ./node_modules

# Копирую весь исходный код фронта
COPY . .

# Пробрасываю публичные переменные окружения для сборки (если нужно)
ARG NEXT_PUBLIC_METRIKA_ID
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_METRIKA_ID=$NEXT_PUBLIC_METRIKA_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Собираю продовый билд
RUN npm run build



# === Stage 3: минимальный production-образ (runner) ===
# Финальный образ — только то, что нужно для запуска продового Next.js.
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Создаю непривилегированного пользователя для запуска приложения
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Копирую только то, что реально нужно для работы:
# - public/ (статичные ресурсы)
# - standalone-сервер и static ассеты из .next
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переключаюсь на непривилегированного пользователя
USER nextjs

# Порт, на котором будет слушать Next.js внутри контейнера
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Стартую standalone-сервер Next.js
CMD ["node", "server.js"]

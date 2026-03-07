# === Stage 1: deps ===
# Устанавливаем все node-зависимости по package-lock
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci



# === Stage 2: build ===
# Собираем продовый билд Next.js
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Публичные переменные окружения (если нужно)
ARG NEXT_PUBLIC_METRIKA_ID
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_METRIKA_ID=$NEXT_PUBLIC_METRIKA_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build



# === Stage 3: prod runner (next start) ===
# Финальный образ для запуска продового Next.js
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Копируем всё нужное для запуска:
# - .next (билд)
# - public (статические файлы)
# - node_modules
# - package.json (для npm run start)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Создаём непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

USER nextjs

# Next.js будет слушать 3000 порт внутри контейнера
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Стартуем приложение в прод-режиме
CMD ["npm", "run", "start"]

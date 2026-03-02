/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаю standalone-режим, чтобы собирать компактный сервер для докера
  output: 'standalone',

  // Картинки рендерю без встроенного оптимизатора Next.js (в моём случае это ок)
  images: {
    unoptimized: true,
  },

  // Пробрасываю нужные переменные окружения в рантайм Next.js
  // Значения по умолчанию оставляю такими же, как и в проде
  env: {
    INTERNAL_API_URL:
      process.env.INTERNAL_API_URL || 'http://backend:8000',
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gentlemenbarber.ru',
    NEXT_PUBLIC_METRIKA_ID:
      process.env.NEXT_PUBLIC_METRIKA_ID || '107009193',
  },
};

module.exports = nextConfig;

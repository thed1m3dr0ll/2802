/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        // Общая CSP для всего фронта
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; " +
              // Разрешаем скрипты с Yandex.Metrika и YCLIENTS
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://w1258165.yclients.com; " +
              // Стили: свои, inline, + стили виджета и Google Fonts
              "style-src 'self' 'unsafe-inline' https://w1258165.yclients.com https://fonts.googleapis.com; " +
              // Картинки
              "img-src 'self' https: data: blob:; " +
              // Сеть: фронт ходит к бэку на localhost:8000 + Метрика (HTTP + WebSocket)
              "connect-src 'self' http://localhost:8000 https://mc.yandex.ru wss://mc.yandex.ru; " +
              // Шрифты
              "font-src 'self' https://fonts.gstatic.com data:; " +
              // Кто может фреймить нас и кого фреймим мы (Yandex, YCLIENTS, локальный дев)
              "frame-src https://yandex.ru https://b1258165.yclients.com https://w1258165.yclients.com http://localhost:3000; " +
              // Остальное
              "frame-ancestors 'self'; " +
              "object-src 'none';",
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  env: {
    // это старое, можешь потом выкинуть, сейчас фронт использует NEXT_PUBLIC_API_URL
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000',
  },
};

module.exports = nextConfig;

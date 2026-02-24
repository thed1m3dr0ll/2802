/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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
              // Скрипты: свои + Яндекс.Метрика + YCLIENTS
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://w1258165.yclients.com; " +
              // Стили: свои, inline, стили виджета и Google Fonts
              "style-src 'self' 'unsafe-inline' https://w1258165.yclients.com https://fonts.googleapis.com; " +
              // Картинки
              "img-src 'self' https: data: blob:; " +
              // Сеть: фронт ходит к бэку (API_URL) + Метрика (HTTP + WebSocket)
              `connect-src 'self' ${API_URL} https://mc.yandex.ru wss://mc.yandex.ru; ` +
              // Шрифты
              "font-src 'self' https://fonts.gstatic.com data:; " +
              // Кого фреймим (Yandex, YCLIENTS, сам сайт)
              `frame-src https://yandex.ru https://b1258165.yclients.com https://w1258165.yclients.com ${SITE_URL}; ` +
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
          // В проде эти заголовки лучше отдавать с бэка/Nginx, но для dev оставим
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
    // старое поле, можно выпилить после рефакторинга
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000',
  },
};

module.exports = nextConfig;

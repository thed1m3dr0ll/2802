/** @type {import('next').NextConfig} */

// URL бэкенда (FastAPI) для фронта
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://gentlemenbarber.ru";

const nextConfig = {
  images: {
    unoptimized: true,
  },

  // ВАЖНО: никакого CSP тут больше нет
  // async headers() { ... } — убрать полностью

  env: {
    API_BASE_URL:
      process.env.API_BASE_URL || "https://gentlemenbarber.ru",
    NEXT_PUBLIC_API_URL: API_URL,
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.gentlemenbarber.ru",
  },
};

module.exports = nextConfig;

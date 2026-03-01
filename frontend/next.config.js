/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    INTERNAL_API_URL:
      process.env.INTERNAL_API_URL || "http://backend:8000",
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.gentlemenbarber.ru",
    NEXT_PUBLIC_METRIKA_ID:
      process.env.NEXT_PUBLIC_METRIKA_ID || "107009193",
  },
};

module.exports = nextConfig;

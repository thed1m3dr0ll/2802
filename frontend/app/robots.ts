import { MetadataRoute } from "next";

// Роботс для продового домена www.gentlemenbarber.ru
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // Сайт в целом открыт для индексации
        allow: "/",
        // Служебные и приватные разделы вырезаем
        disallow: [
          "/admin",
          "/admin/",
          "/cabinet",
          "/cabinet/",
          "/api/",
          "/landing",
          "/thank-you",
          "/forgot-password",
        ],
      },
    ],
    // Host — без схемы, но с www (Яндекс)
    host: "www.gentlemenbarber.ru",
    // Sitemap — с https и www
    sitemap: "https://www.gentlemenbarber.ru/sitemap.xml",
  };
}

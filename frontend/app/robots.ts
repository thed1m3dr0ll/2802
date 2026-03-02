import { MetadataRoute } from 'next';

// Роботс, который я отдаю поисковикам для продового домена
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // Сайт в целом открыт для индексации
        allow: '/',
        // Но ряд служебных и приватных разделов я сознательно вырезаю
        disallow: [
          '/admin',
          '/admin/',
          '/cabinet',
          '/cabinet/',
          '/api/',
          '/landing',
          '/thank-you',
          '/forgot-password',
        ],
      },
    ],
    // Явно указываю основной хост (важно для Яндекса)
    host: 'https://www.gentlemenbarber.ru',
    // Подсказываю, где лежит sitemap
    sitemap: 'https://www.gentlemenbarber.ru/sitemap.xml',
  };
}

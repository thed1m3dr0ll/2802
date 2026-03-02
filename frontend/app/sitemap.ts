import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.gentlemenbarber.ru';

// Явно перечисляю те страницы, которые хочу видеть в sitemap
const sitemap = (): MetadataRoute.Sitemap => {
  return [
    // Главная
    {
      url: `${BASE_URL}/`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Ключевые коммерческие страницы
    {
      url: `${BASE_URL}/rituals`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/masters`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/stories`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacts`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    // Админку, личный кабинет и служебные страницы сюда специально не включаю
  ];
};

export default sitemap;

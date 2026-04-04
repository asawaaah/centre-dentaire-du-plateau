import type { MetadataRoute } from 'next';
import { SERVICES } from '../lib/services';

type StaticPage = {
  fr: string;
  en: string;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
};

const staticPages: StaticPage[] = [
  { fr: '',          en: '',       changeFrequency: 'weekly',  priority: 1.0 },
  { fr: '/services', en: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { fr: '/a-propos', en: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { fr: '/contact',  en: '/contact',  changeFrequency: 'monthly', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dentisteplateau.com';
  const locales = ['fr', 'en'] as const;

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      const localizedPath = page[locale];
      entries.push({
        url: `${baseUrl}/${locale}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr${page.fr}`,
            en: `${baseUrl}/en${page.en}`,
            'x-default': `${baseUrl}/fr${page.fr}`,
          },
        },
      });
    }

    for (const service of SERVICES) {
      const slug = service.slugs[locale as 'fr' | 'en'];
      entries.push({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr/services/${service.slugs.fr}`,
            en: `${baseUrl}/en/services/${service.slugs.en}`,
            'x-default': `${baseUrl}/fr/services/${service.slugs.fr}`,
          },
        },
      });
    }
  }

  return entries;
}

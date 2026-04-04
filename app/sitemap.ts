import type { MetadataRoute } from 'next';
import { SERVICES } from '../lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dentisteplateau.com';
  const locales = ['fr', 'en'];
  const pages = ['', '/services', '/a-propos', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/services' ? 0.9 : 0.8,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr${page}`,
            en: `${baseUrl}/en${page}`,
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
          },
        },
      });
    }
  }

  return entries;
}

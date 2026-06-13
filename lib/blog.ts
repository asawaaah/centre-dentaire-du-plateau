export type BlogCategory = 'urgence' | 'soins' | 'orthodontie' | 'prevention' | 'assurance';

export type Locale = 'fr' | 'en';

export interface BlogPostConfig {
  key: string;
  slugs: Record<Locale, string>;
  category: BlogCategory;
  publishedAt: string;
  readingTime: number;
  featuredImage: string;
}

export const BLOG_POSTS: BlogPostConfig[] = [
  {
    key: 'peur-du-dentiste',
    slugs: { fr: 'peur-du-dentiste-vaincre-anxiete-dentaire', en: 'fear-of-dentist-overcoming-dental-anxiety' },
    category: 'soins',
    publishedAt: '2026-06-13',
    readingTime: 8,
    featuredImage: '/images/blog/anxiete.jpg',
  },
  {
    key: 'sensibilite-causes',
    slugs: { fr: 'sensibilite-dentaire-causes-et-traitements', en: 'tooth-sensitivity-causes-and-treatments' },
    category: 'prevention',
    publishedAt: '2026-06-10',
    readingTime: 7,
    featuredImage: '/images/blog/sensibilite.jpg',
  },
  {
    key: 'urgence-quoi-faire',
    slugs: { fr: 'urgence-dentaire-quoi-faire-plateau', en: 'dental-emergency-what-to-do-plateau' },
    category: 'urgence',
    publishedAt: '2026-04-17',
    readingTime: 6,
    featuredImage: '/images/blog/urgence.jpg',
  },
  {
    key: 'implant-guide-complet',
    slugs: { fr: 'implant-dentaire-montreal-guide-complet', en: 'dental-implant-montreal-complete-guide' },
    category: 'soins',
    publishedAt: '2026-03-04',
    readingTime: 9,
    featuredImage: '/images/blog/implant.jpg',
  },
  {
    key: 'rcsd-eligibilite-2026',
    slugs: { fr: 'regime-canadien-soins-dentaires-eligibilite-2026', en: 'canadian-dental-care-plan-eligibility-2026' },
    category: 'assurance',
    publishedAt: '2026-02-15',
    readingTime: 7,
    featuredImage: '/images/blog/rcsd.jpg',
  },
  {
    key: 'invisalign-vs-broches',
    slugs: { fr: 'invisalign-vs-broches-orthodontie-plateau', en: 'invisalign-vs-braces-orthodontics-plateau' },
    category: 'orthodontie',
    publishedAt: '2026-01-16',
    readingTime: 7,
    featuredImage: '/images/blog/invisalign.jpg',
  },
  {
    key: 'detartrage-pourquoi',
    slugs: { fr: 'detartrage-dentaire-pourquoi-deux-fois-par-an', en: 'dental-scaling-why-twice-a-year' },
    category: 'prevention',
    publishedAt: '2025-12-08',
    readingTime: 5,
    featuredImage: '/images/blog/hygiene.jpg',
  },
  {
    key: 'blanchiment-pro-vs-maison',
    slugs: { fr: 'blanchiment-dentaire-professionnel-vs-maison', en: 'professional-teeth-whitening-vs-at-home' },
    category: 'soins',
    publishedAt: '2025-11-08',
    readingTime: 6,
    featuredImage: '/images/blog/blanchiment.jpg',
  },
];

export function getBlogPostBySlug(locale: string, slug: string): BlogPostConfig | undefined {
  return BLOG_POSTS.find((p) => p.slugs[locale as Locale] === slug);
}

export function getAllBlogStaticParams(): { locale: string; slug: string }[] {
  const locales: Locale[] = ['fr', 'en'];
  return BLOG_POSTS.flatMap((p) =>
    locales.map((locale) => ({ locale, slug: p.slugs[locale] }))
  );
}

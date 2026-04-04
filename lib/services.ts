export type ServiceKey =
  | 'hygiene'
  | 'veneers'
  | 'rootCanal'
  | 'implants'
  | 'orthodontics'
  | 'surgery'
  | 'radiology'
  | 'whitening'
  | 'technology';

export type Locale = 'fr' | 'en';

export interface ServiceConfig {
  key: ServiceKey;
  slugs: Record<Locale, string>;
  icon: string;
  bgClass: string;
}

export const SERVICES: ServiceConfig[] = [
  {
    key: 'hygiene',
    slugs: { fr: 'hygiene-dentaire', en: 'dental-hygiene' },
    icon: 'ShieldCheck',
    bgClass: 'bg-surface-container-lowest',
  },
  {
    key: 'veneers',
    slugs: { fr: 'facettes-porcelaine', en: 'veneers-fillings' },
    icon: 'Sparkles',
    bgClass: 'bg-surface-container-low',
  },
  {
    key: 'rootCanal',
    slugs: { fr: 'traitement-de-canal', en: 'root-canal' },
    icon: 'Drill',
    bgClass: 'bg-surface-container-lowest',
  },
  {
    key: 'implants',
    slugs: { fr: 'implants-dentaires', en: 'dental-implants' },
    icon: 'CircleDot',
    bgClass: 'bg-surface-container-low',
  },
  {
    key: 'orthodontics',
    slugs: { fr: 'orthodontie-invisible', en: 'invisible-orthodontics' },
    icon: 'Smile',
    bgClass: 'bg-surface-container-lowest',
  },
  {
    key: 'surgery',
    slugs: { fr: 'chirurgie-dentaire', en: 'oral-surgery' },
    icon: 'Stethoscope',
    bgClass: 'bg-surface-container-low',
  },
  {
    key: 'radiology',
    slugs: { fr: 'radiologie-numerique', en: 'digital-radiology' },
    icon: 'ScanLine',
    bgClass: 'bg-surface-container-lowest',
  },
  {
    key: 'whitening',
    slugs: { fr: 'blanchiment-dentaire', en: 'teeth-whitening' },
    icon: 'Sun',
    bgClass: 'bg-surface-container-low',
  },
  {
    key: 'technology',
    slugs: { fr: 'technologie-dentaire', en: 'dental-technology' },
    icon: 'Cpu',
    bgClass: 'bg-surface-container-lowest',
  },
];

/** Get service config by locale + slug. Returns undefined if not found. */
export function getServiceBySlug(locale: string, slug: string): ServiceConfig | undefined {
  return SERVICES.find((s) => s.slugs[locale as Locale] === slug);
}

/** Get the locale-specific slug for a service key. */
export function getServiceSlug(locale: string, key: ServiceKey): string {
  const service = SERVICES.find((s) => s.key === key);
  return service?.slugs[locale as Locale] ?? key;
}

/** Returns all { locale, slug } combinations for generateStaticParams. */
export function getAllStaticParams(): { locale: string; slug: string }[] {
  const locales: Locale[] = ['fr', 'en'];
  return SERVICES.flatMap((s) =>
    locales.map((locale) => ({ locale, slug: s.slugs[locale] }))
  );
}

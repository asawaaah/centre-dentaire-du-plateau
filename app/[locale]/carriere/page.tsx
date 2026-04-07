import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CarriereForm } from '../../../components/contact/CarriereForm';
import type { Metadata } from 'next';
import { routing } from '../../../i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Carriere.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://dentisteplateau.com/${locale}/carriere`,
      languages: {
        fr: 'https://dentisteplateau.com/fr/carriere',
        en: 'https://dentisteplateau.com/en/careers',
        'x-default': 'https://dentisteplateau.com/fr/carriere',
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CarrierePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Carriere');

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/[0.03]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-28 sm:py-36 text-center space-y-8">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-on-primary tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="font-body text-lg sm:text-xl text-on-primary/80 leading-relaxed mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* ==================== CONTENT ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Intro text */}
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-surface">
              {t('intro.title')}
            </h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              {t('intro.body')}
            </p>
          </div>

          {/* Form */}
          <CarriereForm />
        </div>
      </section>
    </>
  );
}

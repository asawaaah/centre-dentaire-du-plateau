import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '../../../i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://dentisteplateau.com/${locale}/confidentialite`,
      languages: {
        fr: 'https://dentisteplateau.com/fr/confidentialite',
        en: 'https://dentisteplateau.com/en/privacy-policy',
        'x-default': 'https://dentisteplateau.com/fr/confidentialite',
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Privacy');

  const sections = [
    'responsible',
    'collected_data',
    'google_lead_forms',
    'purposes',
    'legal_basis',
    'sharing',
    'retention',
    'rights',
    'cookies',
    'security',
    'changes',
    'contact_dpo',
  ] as const;

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
          <p className="font-body text-sm text-on-primary/60">
            {t('hero.last_updated')}
          </p>
        </div>
      </section>

      {/* ==================== TABLE OF CONTENTS ==================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing">
        <nav
          aria-label={t('toc.label')}
          className="bg-surface-container-low rounded-2xl p-8 shadow-[var(--shadow-ambient)]"
        >
          <h2 className="font-heading font-bold text-xl text-on-surface mb-6">
            {t('toc.title')}
          </h2>
          <ol className="space-y-3 list-decimal list-inside">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="font-body text-sm sm:text-base text-primary hover:text-primary-container transition-colors"
                >
                  {t(`sections.${section}.title`)}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* ==================== SECTIONS ==================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-spacing-section">
        <div className="space-y-16">
          {sections.map((section) => (
            <article
              key={section}
              id={section}
              className="scroll-mt-28"
            >
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface mb-6">
                {t(`sections.${section}.title`)}
              </h2>
              <div className="font-body text-base text-on-surface-variant leading-relaxed space-y-4">
                {t.rich(`sections.${section}.content`, {
                  p: (chunks) => <p>{chunks}</p>,
                  strong: (chunks) => <strong className="text-on-surface font-semibold">{chunks}</strong>,
                  ul: (chunks) => <ul className="list-disc list-inside space-y-2 ml-4">{chunks}</ul>,
                  li: (chunks) => <li>{chunks}</li>,
                  email: (chunks) => (
                    <a
                      href="mailto:info@dentisteplateau.com"
                      className="text-primary hover:text-primary-container transition-colors underline"
                    >
                      {chunks}
                    </a>
                  ),
                  phone: (chunks) => (
                    <a
                      href="tel:+15145281587"
                      className="text-primary hover:text-primary-container transition-colors underline"
                    >
                      {chunks}
                    </a>
                  ),
                  cai: (chunks) => (
                    <a
                      href="https://www.cai.gouv.qc.ca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-container transition-colors underline"
                    >
                      {chunks}
                    </a>
                  ),
                  opc: (chunks) => (
                    <a
                      href="https://www.priv.gc.ca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-container transition-colors underline"
                    >
                      {chunks}
                    </a>
                  ),
                  google: (chunks) => (
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-container transition-colors underline"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

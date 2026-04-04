import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../../i18n/routing";
import { notFound } from "next/navigation";
import { CheckCircle, ChevronRight, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import {
  getAllStaticParams,
  getServiceBySlug,
  getServiceSlug,
  SERVICES,
  type ServiceKey,
} from "../../../../lib/services";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(locale, slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: "ServicePages" });
  const key = service.key;

  return {
    title: t(`${key}.meta_title`),
    description: t(`${key}.meta_description`),
    alternates: {
      canonical: `https://dentisteplateau.com/${locale}/services/${slug}`,
      languages: {
        fr: `https://dentisteplateau.com/fr/services/${getServiceSlug('fr', key as ServiceKey)}`,
        en: `https://dentisteplateau.com/en/services/${getServiceSlug('en', key as ServiceKey)}`,
      },
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(locale, slug);
  if (!service) notFound();

  const t = await getTranslations("ServicePages");
  const tServices = await getTranslations("Services");
  const key = service.key;

  const features = t.raw(`${key}.features`) as string[];
  const faq = t.raw(`${key}.faq`) as { q: string; a: string }[];

  // Build list of other services for the sidebar
  const otherServices = SERVICES.filter((s) => s.key !== key).slice(0, 5);

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 text-center space-y-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-on-primary/60 font-body text-sm">
            <Link href="/" className="hover:text-on-primary transition-colors">
              {locale === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/services" className="hover:text-on-primary transition-colors">
              {locale === 'fr' ? 'Traitements' : 'Treatments'}
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-on-primary/80">{tServices(`${key}.title`)}</span>
          </nav>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-on-primary tracking-tight">
            {t(`${key}.hero_title`)}
          </h1>
          <p className="font-body text-lg sm:text-xl text-on-primary/80 leading-relaxed">
            {t(`${key}.hero_subtitle`)}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/10 border border-white/25 text-on-primary font-body font-semibold text-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
          >
            {locale === 'fr' ? 'Prendre Rendez-vous' : 'Book an Appointment'}
          </Link>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* ---- Left: Main content ---- */}
          <div className="lg:col-span-2 space-y-14">

            {/* Description */}
            <section className="space-y-6">
              <div className="w-1 h-12 rounded-full bg-primary" />
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                {t(`${key}.description`)}
              </p>
            </section>

            {/* Features */}
            {features.length > 0 && (
              <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                  {locale === 'fr' ? 'Ce que nous faisons pour vous' : 'What we do for you'}
                </h2>
                <ul className="space-y-4">
                  {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest">
                      <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
                      <span className="font-body text-on-surface leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQ */}
            {faq.length > 0 && (
              <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                  {locale === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}
                </h2>
                <div className="space-y-4">
                  {faq.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-2xl bg-surface-container-lowest overflow-hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-body font-semibold text-on-surface hover:text-primary transition-colors">
                        <span>{item.q}</span>
                        <ChevronDown
                          size={18}
                          aria-hidden="true"
                          className="flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                        />
                      </summary>
                      <p className="px-6 pb-6 font-body text-on-surface-variant leading-relaxed">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* ---- Right: Sidebar ---- */}
          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-surface-container-lowest p-8 space-y-5 sticky top-28">
              <h3 className="font-heading font-semibold text-lg text-on-surface">
                {locale === 'fr' ? 'Nos autres traitements' : 'Our other treatments'}
              </h3>
              <nav className="space-y-2">
                {otherServices.map((s) => (
                  <Link
                    key={s.key}
                    href={{ pathname: '/services/[slug]', params: { slug: getServiceSlug(locale, s.key as ServiceKey) } }}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-body text-sm text-on-surface-variant hover:text-primary hover:bg-primary-fixed/10 transition-all duration-200"
                  >
                    <span>{tServices(`${s.key}.title`)}</span>
                    <ChevronRight size={14} className="flex-shrink-0 text-primary" aria-hidden="true" />
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-body text-sm font-semibold text-primary hover:bg-primary-fixed/10 transition-all duration-200"
                >
                  <span>{locale === 'fr' ? 'Voir tous les traitements' : 'See all treatments'}</span>
                  <ChevronRight size={14} className="flex-shrink-0" aria-hidden="true" />
                </Link>
              </nav>

              <div className="pt-4 border-t border-outline-variant/20 space-y-3">
                <p className="font-body text-sm text-on-surface-variant">
                  {locale === 'fr'
                    ? 'Des questions ? Contactez-nous directement.'
                    : 'Have questions? Contact us directly.'}
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-primary text-primary font-body text-sm font-medium hover:bg-primary hover:text-on-primary transition-all duration-200"
                >
                  {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}

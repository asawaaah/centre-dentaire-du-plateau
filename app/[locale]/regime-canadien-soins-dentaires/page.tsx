import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/routing";
import { CheckCircle, ChevronDown, ChevronRight, Phone, Shield, DollarSign, Stethoscope, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { FaqSchemaOrg } from "../../../components/seo/SchemaOrg";
import { getServiceSlug, type ServiceKey } from "../../../lib/services";
import { BLOG_POSTS } from "../../../lib/blog";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RCSD" });
  const frPath = "fr/regime-canadien-soins-dentaires";
  const enPath = "en/canadian-dental-care-plan";
  const localePath = locale === "fr" ? frPath : enPath;

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `https://dentisteplateau.com/${localePath}`,
      languages: {
        fr: `https://dentisteplateau.com/${frPath}`,
        en: `https://dentisteplateau.com/${enPath}`,
        "x-default": `https://dentisteplateau.com/${frPath}`,
      },
    },
  };
}

export default async function RCSDPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("RCSD");

  const criteria = t.raw("eligibility.criteria") as { label: string; value: string }[];
  const coverageLevels = t.raw("eligibility.coverage_levels.items") as { income: string; rate: string }[];
  const coveredItems = t.raw("covered.items") as { category: string; services: string }[];
  const steps = t.raw("how_it_works.steps") as { step: string; title: string; desc: string }[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  // Service slugs for covered services links
  const hygieneSlug = getServiceSlug(locale, 'hygiene' as ServiceKey);
  const rootCanalSlug = getServiceSlug(locale, 'rootCanal' as ServiceKey);
  const implantsSlug = getServiceSlug(locale, 'implants' as ServiceKey);
  const orthodonticsSlug = getServiceSlug(locale, 'orthodontics' as ServiceKey);

  // Map covered service categories to service page slugs
  const coveredServiceLinks: Record<number, { slug: string; pathname: string }> = {
    0: { slug: hygieneSlug, pathname: '/services/[slug]' },       // Prevention
    1: { slug: rootCanalSlug, pathname: '/services/[slug]' },     // Basic treatments
    2: { slug: implantsSlug, pathname: '/services/[slug]' },      // Prosthetics
    3: { slug: orthodonticsSlug, pathname: '/services/[slug]' },  // Orthodontics
    4: { slug: '', pathname: '/urgence-dentaire' },                // Emergencies
  };

  // RCSD blog
  const rcsdBlog = BLOG_POSTS.find((p) => p.key === 'rcsd-eligibilite-2026');
  const rcsdBlogSlug = rcsdBlog?.slugs[locale as 'fr' | 'en'];

  return (
    <>
      <FaqSchemaOrg items={faqItems.map((item) => ({ question: item.q, answer: item.a }))} />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/[0.03]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
            <Shield size={14} className="text-green-300" aria-hidden="true" />
            <span className="font-body text-sm text-on-primary/90">{t("hero.eyebrow")}</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-on-primary tracking-tight">
            {t("hero.title")}
          </h1>

          <p className="font-body text-lg sm:text-xl text-on-primary/80 leading-relaxed mx-auto">
            {t("hero.subtitle")}
          </p>

          <p className="font-body text-sm text-on-primary/70 font-medium">
            {t("hero.badge")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-body font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {t("hero.cta_appointment")}
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
            <a
              href="tel:+15145281587"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/25 text-on-primary font-body font-semibold text-base transition-all duration-300 hover:bg-white/20"
            >
              <Phone size={16} aria-hidden="true" />
              {t("hero.cta_call")}
            </a>
          </div>
        </div>
      </section>

      {/* ==================== ELIGIBILITY ==================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 space-y-12">
        <div className="text-center space-y-4 mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-surface">
            {t("eligibility.title")}
          </h2>
          <p className="font-body text-on-surface-variant leading-relaxed">
            {t("eligibility.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Criteria */}
          <div className="space-y-4">
            {criteria.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10">
                <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider">{item.label}</p>
                  <p className="font-body font-medium text-on-surface mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Coverage levels table */}
          <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/10 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex items-center gap-2">
              <DollarSign size={18} className="text-primary" aria-hidden="true" />
              <h3 className="font-heading font-semibold text-on-surface text-base">
                {t("eligibility.coverage_levels.title")}
              </h3>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {coverageLevels.map((row, i) => (
                <div key={i} className={`flex items-center justify-between px-6 py-4 ${i === coverageLevels.length - 1 ? "opacity-50" : ""}`}>
                  <span className="font-body text-sm text-on-surface-variant">{row.income}</span>
                  <span className={`font-body font-semibold text-sm ${i < coverageLevels.length - 1 ? "text-primary" : "text-on-surface-variant"}`}>
                    {row.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COVERED SERVICES ==================== */}
      <section className="bg-surface-container-lowest/50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
          <div className="text-center space-y-4 mx-auto">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-surface">
              {t("covered.title")}
            </h2>
            <p className="font-body text-on-surface-variant leading-relaxed">
              {t("covered.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coveredItems.map((item, i) => {
              const link = coveredServiceLinks[i];
              const cardContent = (
                <>
                  <div className="flex items-center gap-3">
                    <Stethoscope size={18} className="text-primary flex-shrink-0" aria-hidden="true" />
                    <h3 className="font-heading font-semibold text-on-surface text-base">{item.category}</h3>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{item.services}</p>
                  {link && (
                    <span className="inline-flex items-center gap-1 font-body text-xs text-primary font-medium">
                      {locale === 'fr' ? 'Voir le service' : 'View service'}
                      <ChevronRight size={12} aria-hidden="true" />
                    </span>
                  )}
                </>
              );

              if (link) {
                const href = link.slug
                  ? { pathname: link.pathname as any, params: { slug: link.slug } }
                  : link.pathname;
                return (
                  <Link
                    key={i}
                    href={href as any}
                    className="rounded-2xl bg-surface-container-lowest p-6 space-y-3 border border-outline-variant/10 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200 block"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={i} className="rounded-2xl bg-surface-container-lowest p-6 space-y-3 border border-outline-variant/10">
                  {cardContent}
                </div>
              );
            })}
          </div>

          {/* Blog article link */}
          {rcsdBlogSlug && (
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 max-w-2xl mx-auto">
              <BookOpen size={20} className="text-primary flex-shrink-0" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                  {locale === 'fr' ? 'Guide complet' : 'Complete guide'}
                </p>
                <Link
                  href={`/blog/${rcsdBlogSlug}` as any}
                  className="font-body text-sm font-medium text-primary hover:underline"
                >
                  {locale === 'fr'
                    ? 'RCSD 2026 : êtes-vous éligible ? Tout comprendre'
                    : 'CDCP 2026: are you eligible? Everything you need to know'}
                </Link>
              </div>
              <ChevronRight size={16} className="text-primary flex-shrink-0" aria-hidden="true" />
            </div>
          )}

          <p className="text-center font-body text-sm text-on-surface-variant italic mx-auto">
            {t("covered.note")}
          </p>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-surface">
            {t("how_it_works.title")}
          </h2>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/10">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary font-heading font-bold text-lg flex items-center justify-center flex-shrink-0">
                {step.step}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-semibold text-on-surface">{step.title}</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="bg-surface-container-lowest/50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
          <div className="text-center">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-surface">
              {t("faq.title")}
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-surface-container-lowest overflow-hidden border border-outline-variant/10"
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
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="relative z-10  mx-auto px-6 sm:px-8 py-20 text-center space-y-6">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-primary">
            {t("cta.title")}
          </h2>
          <p className="font-body text-on-primary/80 text-lg">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-body font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {t("cta.button")}
            </Link>
            <a
              href="tel:+15145281587"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/25 text-on-primary font-body font-semibold text-base transition-all duration-300 hover:bg-white/20"
            >
              <Phone size={16} aria-hidden="true" />
              514 528-1587
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

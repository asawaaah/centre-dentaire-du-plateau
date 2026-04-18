import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/routing";
import { Phone, Clock, MapPin, AlertTriangle, ChevronDown, ChevronRight, Shield, BookOpen, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { EmergencySchemaOrg, FaqSchemaOrg } from "../../../components/seo/SchemaOrg";
import { getServiceSlug, type ServiceKey } from "../../../lib/services";
import { BLOG_POSTS } from "../../../lib/blog";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "UrgenceDentaire" });
  const frPath = "fr/urgence-dentaire";
  const enPath = "en/dental-emergency";
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

export default async function UrgenceDentairePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("UrgenceDentaire");

  const emergencyTypes = t.raw("types.items") as { title: string; desc: string }[];
  const firstAidItems = t.raw("firstaid.items") as { situation: string; advice: string }[];
  const hours = t.raw("availability.hours") as { days: string; time: string }[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  // Service slugs for internal links
  const rootCanalSlug = getServiceSlug(locale, 'rootCanal' as ServiceKey);
  const surgerySlug = getServiceSlug(locale, 'surgery' as ServiceKey);
  const implantsSlug = getServiceSlug(locale, 'implants' as ServiceKey);

  // Related blog
  const emergencyBlog = BLOG_POSTS.find((p) => p.key === 'urgence-quoi-faire');
  const emergencyBlogSlug = emergencyBlog?.slugs[locale as 'fr' | 'en'];

  return (
    <>
      <EmergencySchemaOrg locale={locale} />
      <FaqSchemaOrg items={faqItems.map((item) => ({ question: item.q, answer: item.a }))} />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/[0.03]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 text-center space-y-7">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
            <AlertTriangle size={14} className="text-orange-300" aria-hidden="true" />
            <span className="font-body text-sm text-on-primary/90">{t("hero.eyebrow")}</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-on-primary tracking-tight">
            {t("hero.title")}
          </h1>

          <p className="font-body text-lg sm:text-xl text-on-primary/80 leading-relaxed mx-auto">
            {t("hero.subtitle")}
          </p>

          {/* Badge */}
          <p className="font-body text-sm text-on-primary/70">
            {t("hero.badge")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="tel:+15145281587"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-primary font-body font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Phone size={18} aria-hidden="true" />
              {t("hero.cta_call")}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/25 text-on-primary font-body font-semibold text-base transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
            >
              {t("hero.cta_form")}
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== EMERGENCY TYPES ==================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 space-y-12">
        <div className="text-center space-y-4 mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-surface">
            {t("types.title")}
          </h2>
          <p className="font-body text-on-surface-variant leading-relaxed">
            {t("types.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {emergencyTypes.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-surface-container-lowest p-6 space-y-3 border border-outline-variant/10 hover:border-primary/20 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <AlertTriangle size={18} className="text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-semibold text-on-surface text-base">{item.title}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FIRST AID + AVAILABILITY ==================== */}
      <section className="bg-surface-container-lowest/50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* First aid */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="w-1 h-10 rounded-full bg-primary" />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                  {t("firstaid.title")}
                </h2>
              </div>
              <div className="space-y-4">
                {firstAidItems.map((item, i) => (
                  <div key={i} className="rounded-2xl bg-surface-container-lowest p-6 space-y-2 border border-outline-variant/10">
                    <p className="font-heading font-semibold text-primary text-sm">{item.situation}</p>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">{item.advice}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="w-1 h-10 rounded-full bg-primary" />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                  {t("availability.title")}
                </h2>
              </div>

              {/* Hours */}
              <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/10 overflow-hidden">
                <div className="p-6 space-y-3">
                  {hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-outline-variant/10 last:border-0">
                      <span className="font-body font-medium text-on-surface">{h.days}</span>
                      <span className="font-body text-primary font-semibold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-primary/5 border border-primary/15">
                <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {t("availability.note")}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-body text-sm text-on-surface leading-relaxed">
                  {t("availability.address")}
                </p>
              </div>

              {/* CTA */}
              <a
                href="tel:+15145281587"
                className="flex items-center justify-center gap-3 w-full px-8 py-4 rounded-full bg-primary text-on-primary font-body font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient-hover)]"
              >
                <Phone size={18} aria-hidden="true" />
                {t("hero.cta_call")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== RELATED SERVICES + BLOG ==================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 space-y-10">
        <div className="space-y-3">
          <div className="w-1 h-10 rounded-full bg-primary" />
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
            {locale === 'fr' ? 'Traitements liés aux urgences' : 'Emergency-related treatments'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link
            href={{ pathname: '/services/[slug]', params: { slug: rootCanalSlug } }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-surface-container-lowest hover:bg-primary-fixed/10 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ArrowRight size={18} className="text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading font-semibold text-on-surface text-sm group-hover:text-primary transition-colors">
                {locale === 'fr' ? 'Traitement de canal' : 'Root canal treatment'}
              </p>
              <p className="font-body text-xs text-on-surface-variant">
                {locale === 'fr' ? 'Sauver une dent infectée' : 'Save an infected tooth'}
              </p>
            </div>
          </Link>

          <Link
            href={{ pathname: '/services/[slug]', params: { slug: surgerySlug } }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-surface-container-lowest hover:bg-primary-fixed/10 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ArrowRight size={18} className="text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading font-semibold text-on-surface text-sm group-hover:text-primary transition-colors">
                {locale === 'fr' ? 'Chirurgie dentaire' : 'Oral surgery'}
              </p>
              <p className="font-body text-xs text-on-surface-variant">
                {locale === 'fr' ? 'Extractions et interventions' : 'Extractions and procedures'}
              </p>
            </div>
          </Link>

          <Link
            href={{ pathname: '/services/[slug]', params: { slug: implantsSlug } }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-surface-container-lowest hover:bg-primary-fixed/10 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ArrowRight size={18} className="text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading font-semibold text-on-surface text-sm group-hover:text-primary transition-colors">
                {locale === 'fr' ? 'Implants dentaires' : 'Dental implants'}
              </p>
              <p className="font-body text-xs text-on-surface-variant">
                {locale === 'fr' ? 'Remplacement après extraction' : 'Replacement after extraction'}
              </p>
            </div>
          </Link>
        </div>

        {/* Blog article link */}
        {emergencyBlogSlug && (
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-surface-container-lowest">
            <BookOpen size={20} className="text-primary flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                {locale === 'fr' ? 'Guide pratique' : 'Practical guide'}
              </p>
              <Link
                href={`/blog/${emergencyBlogSlug}` as any}
                className="font-body text-sm font-medium text-primary hover:underline"
              >
                {locale === 'fr'
                  ? 'Urgence dentaire : que faire ? Guide complèt du Dr. Barchichat'
                  : 'Dental emergency: what to do? Dr. Barchichat\'s complete guide'}
              </Link>
            </div>
            <ChevronRight size={16} className="text-primary flex-shrink-0" aria-hidden="true" />
          </div>
        )}
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 mb-2">
            <Shield size={18} className="text-primary" aria-hidden="true" />
          </div>
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
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="relative z-10 mx-auto px-6 sm:px-8 py-20 text-center space-y-6">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-primary">
            {locale === "fr" ? "Besoin d'aide maintenant ?" : "Need help right now?"}
          </h2>
          <p className="font-body text-on-primary/80 text-lg">
            {locale === "fr"
              ? "Appelez-nous directement ou envoyez-nous un message — nous vous répondons en priorité."
              : "Call us directly or send a message — we'll get back to you as a priority."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+15145281587"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-primary font-body font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Phone size={18} aria-hidden="true" />
              514 528-1587
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/25 text-on-primary font-body font-semibold text-base transition-all duration-300 hover:bg-white/20"
            >
              {locale === "fr" ? "Envoyer un message" : "Send a message"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

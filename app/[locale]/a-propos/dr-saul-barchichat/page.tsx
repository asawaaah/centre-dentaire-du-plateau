import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../../i18n/routing";
import Image from "next/image";
import { GraduationCap, Award, CheckCircle, ChevronRight, Phone, Heart, MessageCircle, Eye, Zap, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import {
  getAllStaticParams,
  getServiceBySlug,
  getServiceSlug,
  SERVICES,
  type ServiceKey,
} from "../../../../lib/services";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DrBarchichat" });
  const frPath = "fr/a-propos/dr-saul-barchichat";
  const enPath = "en/about/dr-saul-barchichat";
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

export default async function DrBarchichatPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("DrBarchichat");

  const credentials = t.raw("credentials.items") as { label: string; value: string }[];
  const expertiseItems = t.raw("expertise.items") as string[];
  const approachItems = t.raw("approach.items") as { title: string; desc: string }[];

  // Map expertise items (by index) to service keys
  const expertiseToService: Record<number, ServiceKey> = {
    0: 'implants',       // Implantologie dentaire
    1: 'orthodontics',   // Orthodontie invisible (Invisalign®)
    2: 'veneers',        // Dentisterie esthétique (facettes, blanchiment)
    3: 'hygiene',        // Soins préventifs & parodontologie
    4: 'rootCanal',      // Endodontie (traitement de canal)
    5: 'surgery',        // Chirurgie dentaire mini-invasive
    6: 'radiology',      // Radiologie numérique & imagerie 3D
  };

  const approachIcons = [
    <Heart key="heart" size={20} className="text-primary flex-shrink-0" aria-hidden="true" />,
    <MessageCircle key="msg" size={20} className="text-primary flex-shrink-0" aria-hidden="true" />,
    <Eye key="eye" size={20} className="text-primary flex-shrink-0" aria-hidden="true" />,
    <Zap key="zap" size={20} className="text-primary flex-shrink-0" aria-hidden="true" />,
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": "https://dentisteplateau.com/#dentist-barchichat",
    name: "Dr. Saul Barchichat",
    honorificPrefix: "Dr.",
    honorificSuffix: "DMD",
    image: "https://dentisteplateau.com/images/team/dr-barchichat.jpg",
    url: locale === "fr"
      ? "https://dentisteplateau.com/fr/a-propos/dr-saul-barchichat"
      : "https://dentisteplateau.com/en/about/dr-saul-barchichat",
    jobTitle: locale === "fr" ? "Dentiste — Fondateur" : "Dentist — Founder",
    description: locale === "fr"
      ? "Dr. Saul Barchichat, DMD, exerce la dentisterie au Plateau Mont-Royal depuis 1991. Diplômé de l'Université de Montréal et membre de l'Ordre des dentistes du Québec, il offre des soins complets dans une approche douce et personnalisée."
      : "Dr. Saul Barchichat, DMD, has practiced dentistry on Plateau Mont-Royal since 1991. A graduate of Université de Montréal and ODQ member, he provides comprehensive care with a gentle, personalized approach.",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Université de Montréal, Faculté de médecine dentaire",
    },
    memberOf: [
      { "@type": "Organization", name: "Ordre des dentistes du Québec (ODQ)" },
      { "@type": "Organization", name: locale === "fr" ? "Association dentaire canadienne" : "Canadian Dental Association" },
    ],
    worksFor: {
      "@id": "https://dentisteplateau.com/#organization",
      name: "Centre Dentaire du Plateau",
    },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1357 Avenue du Mont-Royal Est",
        addressLocality: "Montréal",
        addressRegion: "QC",
        postalCode: "H2J 1Y8",
        addressCountry: "CA",
      },
    },
    knowsLanguage: ["fr", "en"],
    sameAs: [
      "https://ca.linkedin.com/in/saul-barchichat-21a032158",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/[0.03]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 space-y-6">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-primary/60 font-body text-sm">
            <Link href="/" className="hover:text-on-primary transition-colors">
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/a-propos" className="hover:text-on-primary transition-colors">
              {t("breadcrumb_about")}
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-on-primary/80">Dr. Saul Barchichat</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Photo */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 border-2 border-white/30 flex-shrink-0 overflow-hidden relative">
              <Image
                src="/images/team/dr-barchichat.jpg"
                alt="Dr. Saul Barchichat DMD"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>

            <div className="space-y-4">
              <p className="font-body text-sm text-on-primary/70 uppercase tracking-wider">
                {t("hero.eyebrow")}
              </p>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-on-primary tracking-tight">
                {t("hero.title")}
              </h1>
              <p className="font-body text-lg text-on-primary/80 leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary font-body font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {t("hero.cta_appointment")}
                </Link>
                <a
                  href="tel:+15145281587"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/25 text-on-primary font-body font-semibold text-sm transition-all duration-300 hover:bg-white/20"
                >
                  <Phone size={16} aria-hidden="true" />
                  {t("hero.cta_call")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CREDENTIALS ==================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Credentials */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="w-1 h-10 rounded-full bg-primary" />
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                {t("credentials.title")}
              </h2>
            </div>
            <div className="space-y-4">
              {credentials.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {i === 0 ? (
                      <GraduationCap size={18} className="text-primary" aria-hidden="true" />
                    ) : (
                      <Award size={18} className="text-primary" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider">{item.label}</p>
                    <p className="font-body font-medium text-on-surface mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="w-1 h-10 rounded-full bg-primary" />
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                {t("philosophy.title")}
              </h2>
            </div>
            <p className="font-body text-on-surface-variant leading-relaxed text-lg">
              {t("philosophy.body")}
            </p>

            {/* Approach items */}
            <div className="space-y-4 pt-2">
              {approachItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10">
                  {approachIcons[i]}
                  <div>
                    <p className="font-heading font-semibold text-on-surface text-sm">{item.title}</p>
                    <p className="font-body text-sm text-on-surface-variant mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EXPERTISE ==================== */}
      <section className="bg-surface-container-lowest/50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
          <div className="space-y-3">
            <div className="w-1 h-10 rounded-full bg-primary" />
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
              {t("expertise.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {expertiseItems.map((item, i) => {
              const serviceKey = expertiseToService[i];
              if (serviceKey) {
                const slug = getServiceSlug(locale, serviceKey);
                return (
                  <Link
                    key={i}
                    href={{ pathname: '/services/[slug]', params: { slug } }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <CheckCircle size={18} className="text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">{item}</span>
                  </Link>
                );
              }
              return (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10">
                  <CheckCircle size={18} className="text-primary flex-shrink-0" aria-hidden="true" />
                  <span className="font-body text-sm text-on-surface">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="relative z-10 mx-auto px-6 sm:px-8 py-20 text-center space-y-6">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-primary">
            {t("cta.title")}
          </h2>
          <p className="font-body text-on-primary/80 text-lg">
            {t("cta.subtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-body font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {t("cta.button")}
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Award, Cpu, History, ScanLine, Fingerprint, Zap } from "lucide-react";
import type { Metadata } from "next";
import { TestimonialsCarousel } from "@/components/ui/TestimonialsCarousel";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? "Dr. Saul Barchichat | Dentiste à Montréal — Centre Dentaire du Plateau"
      : "Dr. Saul Barchichat | Dentist in Montreal — Centre Dentaire du Plateau",
    description: locale === 'fr'
      ? "Rencontrez le Dr. Saul Barchichat, dentiste au Centre Dentaire du Plateau à Montréal. Membre de l'ODQ, il offre des soins complets pour patients de tous âges au Plateau Mont-Royal."
      : "Meet Dr. Saul Barchichat, dentist at Centre Dentaire du Plateau in Montreal. ODQ member providing comprehensive care for patients of all ages on Plateau Mont-Royal.",
    alternates: {
      canonical: `https://dentisteplateau.com/${locale === 'fr' ? 'fr/a-propos' : 'en/about'}`,
      languages: {
        fr: 'https://dentisteplateau.com/fr/a-propos',
        en: 'https://dentisteplateau.com/en/about',
        'x-default': 'https://dentisteplateau.com/fr/a-propos',
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const tHome = await getTranslations("Home");


  const pillars = [
    { key: "quality", icon: <Award className="text-primary" size={28} aria-hidden="true" /> },
    { key: "innovation", icon: <Cpu className="text-primary" size={28} aria-hidden="true" /> },
    { key: "history", icon: <History className="text-primary" size={28} aria-hidden="true" /> },
  ];

  const technologies = [
    { key: "cone_beam", icon: <ScanLine className="text-primary" size={32} aria-hidden="true" /> },
    { key: "optical", icon: <Fingerprint className="text-primary" size={32} aria-hidden="true" /> },
    { key: "laser", icon: <Zap className="text-primary" size={32} aria-hidden="true" /> },
  ];


  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/[0.03]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-28 sm:py-36 text-center space-y-8">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-on-primary tracking-tight leading-tight">
            {t("hero.title")}
          </h1>
          <p className="font-body text-lg sm:text-xl text-on-primary/80 leading-relaxed mx-auto">
            {t("hero.subtitle")}
          </p>
          <blockquote className="font-heading italic text-on-primary/60 text-lg pt-4">
            &ldquo;{t("hero.quote")}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ==================== MISSION ==================== */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-6">
              {t("mission.title")}
            </h2>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed">
              {t("mission.description")}
            </p>
          </div>

          {/* 3 Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className="bg-surface-container-lowest rounded-[2rem] p-10 space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-ambient-hover)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed/20 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-on-surface">
                  {t(`mission.${pillar.key}.title`)}
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  {t(`mission.${pillar.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TECHNOLOGY ==================== */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-4">
              {t("tech.title")}
            </h2>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed">
              {t("tech.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech) => (
              <div
                key={tech.key}
                className="bg-surface-container-lowest rounded-[2rem] p-10 space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-ambient-hover)]"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-signature flex items-center justify-center">
                  <div className="text-on-primary">{tech.icon}</div>
                </div>
                <h3 className="font-heading font-bold text-xl text-on-surface">
                  {t(`tech.${tech.key}.title`)}
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  {t(`tech.${tech.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TEAM ==================== */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-4">
              {t("team.title")}
            </h2>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed">
              {t("team.subtitle")}
            </p>
          </div>

          {/* Single doctor profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            {/* Photo */}
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/team/dr-barchichat.jpg"
                  alt="Dr. Saul Barchichat — Centre Dentaire du Plateau"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 384px, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2.5rem] bg-primary-fixed/10 -z-10" />
            </div>

            {/* Bio */}
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-3xl sm:text-4xl text-on-surface">
                  {t("team.member.name")}
                </h3>
                <p className="font-body font-semibold text-primary text-lg">
                  {t("team.member.role")}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {(["badge_odq", "badge_ages", "badge_insurance", "badge_languages"] as const).map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed/15 text-primary font-body font-medium text-sm"
                  >
                    {t(`team.member.${badge}`)}
                  </span>
                ))}
              </div>

              <div className="space-y-5">
                <p className="font-body text-on-surface-variant leading-relaxed">{t("team.member.bio_1")}</p>
                <p className="font-body text-on-surface-variant leading-relaxed">{t("team.member.bio_2")}</p>
                <p className="font-body text-on-surface-variant leading-relaxed">{t("team.member.bio_3")}</p>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 space-y-3">
                <p className="font-heading font-semibold text-on-surface text-sm uppercase tracking-wider">
                  {t("team.member.services_title")}
                </p>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  {t("team.member.services")}
                </p>
              </div>
            </div>
          </div>

          {/* Staff cards */}
          <div className="mt-20">
            <h3 className="font-heading font-bold text-2xl text-on-surface text-center mb-12">
              {t("team.staff_title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {(["grace", "cristina", "sabrina"] as const).map((key) => (
                <div
                  key={key}
                  className="bg-surface-container-lowest rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-ambient-hover)]"
                >
                  <div className="relative w-full aspect-[3/4]">
                    <Image
                      src="/images/placeholder-f.svg"
                      alt={t(`team.${key}.name`)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white font-body text-xs font-medium whitespace-nowrap">
                      {locale === "fr" ? "Photo à venir" : "Photo coming soon"}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div>
                      <h4 className="font-heading font-bold text-lg text-on-surface">
                        {t(`team.${key}.name`)}
                      </h4>
                      <p className="font-body text-sm font-semibold text-primary mt-0.5">
                        {t(`team.${key}.role`)}
                      </p>
                    </div>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      {t(`team.${key}.bio`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <TestimonialsCarousel
        testimonials={[
          { quote: tHome("testimonials.items.0.quote"), author: tHome("testimonials.items.0.author") },
          { quote: tHome("testimonials.items.1.quote"), author: tHome("testimonials.items.1.author") },
          { quote: tHome("testimonials.items.2.quote"), author: tHome("testimonials.items.2.author") },
        ]}
        sectionTitle={tHome("testimonials.section_title")}
        sectionSubtitle={tHome("testimonials.section_subtitle")}
      />
    </>
  );
}

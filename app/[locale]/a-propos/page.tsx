import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Award, Cpu, History, ScanLine, Fingerprint, Zap } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? "À Propos | Notre Équipe & Notre Mission"
      : "About Us | Our Team & Mission",
    description: locale === 'fr'
      ? "Rencontrez l'équipe du Centre Dentaire du Plateau. Depuis 2008, nos spécialistes allient technologie de pointe et approche bienveillante pour votre sourire."
      : "Meet the team at Centre Dentaire du Plateau. Since 2008, our specialists combine cutting-edge technology with a caring approach for your smile.",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  const pillars = [
    { key: "quality", icon: <Award className="text-primary" size={28} /> },
    { key: "innovation", icon: <Cpu className="text-primary" size={28} /> },
    { key: "history", icon: <History className="text-primary" size={28} /> },
  ];

  const technologies = [
    { key: "cone_beam", icon: <ScanLine className="text-primary" size={32} /> },
    { key: "optical", icon: <Fingerprint className="text-primary" size={32} /> },
    { key: "laser", icon: <Zap className="text-primary" size={32} /> },
  ];

  const teamMembers = [
    { key: "aris", image: "/images/team/dr-aris.png" },
    { key: "chen", image: "/images/team/dr-chen.png" },
    { key: "laurent", image: "/images/team/dr-laurent.png" },
    { key: "martin", image: "/images/team/dr-martin.png" },
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.key}
                className="bg-surface-container-lowest rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-ambient-hover)]"
              >
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt={t(`team.members.${member.key}.name`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-7 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-on-surface">
                    {t(`team.members.${member.key}.name`)}
                  </h3>
                  <p className="font-body text-sm font-medium text-primary">
                    {t(`team.members.${member.key}.role`)}
                  </p>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {t(`team.members.${member.key}.bio`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

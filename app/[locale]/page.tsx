import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Baby,
  Zap,
  HeartPulse,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr
      ? "Centre Dentaire du Plateau | Expérience Sérénité à Montréal"
      : "Centre Dentaire du Plateau | Serenity Experience in Montreal",
    description: isFr
      ? "Clinique dentaire haut de gamme au Plateau Mont-Royal. Implants dentaires, esthétique, orthodontie invisible et soins préventifs dans une atmosphère apaisante. Prenez rendez-vous."
      : "Premium dental clinic in Plateau Mont-Royal. Dental implants, cosmetics, invisible orthodontics and preventive care in a soothing atmosphere. Book an appointment.",
    openGraph: {
      title: isFr
        ? "Centre Dentaire du Plateau | Votre sourire mérite l'excellence"
        : "Centre Dentaire du Plateau | Your smile deserves excellence",
      description: isFr
        ? "Découvrez une expérience dentaire repensée dans un cadre apaisant au cœur du Plateau Mont-Royal."
        : "Discover a reimagined dental experience in a soothing setting in the heart of Plateau Mont-Royal.",
      images: ['/images/clinic/hero-smile.png'],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-signature" />

        {/* Decorative organic shapes */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/[0.04]" />
        <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-white/[0.05]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="font-heading font-bold text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl text-on-primary leading-[1.1] tracking-tight">
                  {t("hero.title")}
                </h1>
                <p className="font-body text-lg sm:text-xl text-on-primary/75 leading-relaxed max-w-lg">
                  {t("hero.subtitle")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-surface-container-lowest text-primary font-body font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient-hover)]"
                >
                  {t("hero.cta_primary")}
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-full font-body font-medium text-base transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    color: "white",
                    outline: "2px solid rgba(255,255,255,0.3)",
                    outlineOffset: "-2px",
                  }}
                >
                  {t("hero.cta_secondary")}
                  <ArrowRight size={18} className="ml-2.5" />
                </Link>
              </div>
            </div>

            {/* Hero Image — visible on ALL screens */}
            <div className="relative">
              {/* Mobile: centered, smaller */}
              <div className="relative w-full max-w-md mx-auto lg:max-w-none aspect-[4/3] lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/clinic/hero-smile.png"
                  alt="Sourire parfait - Centre Dentaire du Plateau"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 45vw"
                />
              </div>
              {/* Floating accent behind image */}
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-[2.5rem] bg-white/[0.06] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES PREVIEW ==================== */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-surface">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-primary mb-6">
              {t("services.section_title")}
            </h2>
            <p className="font-body text-lg sm:text-xl text-on-surface-variant leading-relaxed">
              {t("services.section_subtitle")}
            </p>
          </div>

          {/* Main Services Grid — 2 large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            {/* Aesthetic Card */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-10 sm:p-12 space-y-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-ambient-hover)]">
              <div className="w-16 h-16 rounded-2xl bg-primary-fixed/20 flex items-center justify-center">
                <Sparkles className="text-primary" size={32} />
              </div>
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-2xl text-on-surface">
                  {t("services.aesthetic.title")}
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed text-[1.05rem]">
                  {t("services.aesthetic.description")}
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 font-body font-semibold text-primary hover:gap-4 transition-all duration-300 pt-2"
              >
                {t("services.aesthetic.cta")}
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Implants Card */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-10 sm:p-12 space-y-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-ambient-hover)]">
              <div className="w-16 h-16 rounded-2xl bg-primary-fixed/20 flex items-center justify-center">
                <Shield className="text-primary" size={32} />
              </div>
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-2xl text-on-surface">
                  {t("services.implants.title")}
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed text-[1.05rem]">
                  {t("services.implants.description")}
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 font-body font-semibold text-primary hover:gap-4 transition-all duration-300 pt-2"
              >
                {t("services.implants.cta")}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Secondary Services Grid — 3 smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-surface-container-low rounded-[1.5rem] p-8 space-y-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient)]">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center">
                <Baby className="text-primary" size={24} />
              </div>
              <h4 className="font-heading font-semibold text-xl text-on-surface">
                {t("services.pediatric.title")}
              </h4>
              <p className="font-body text-on-surface-variant leading-relaxed">
                {t("services.pediatric.description")}
              </p>
            </div>
            <div className="bg-surface-container-low rounded-[1.5rem] p-8 space-y-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient)]">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center">
                <Zap className="text-tertiary" size={24} />
              </div>
              <h4 className="font-heading font-semibold text-xl text-on-surface">
                {t("services.emergency.title")}
              </h4>
              <p className="font-body text-on-surface-variant leading-relaxed">
                {t("services.emergency.description")}
              </p>
            </div>
            <div className="bg-surface-container-low rounded-[1.5rem] p-8 space-y-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient)]">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center">
                <HeartPulse className="text-primary" size={24} />
              </div>
              <h4 className="font-heading font-semibold text-xl text-on-surface">
                {t("services.prevention.title")}
              </h4>
              <p className="font-body text-on-surface-variant leading-relaxed">
                {t("services.prevention.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERENITY SECTION ==================== */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image — with overlapping accent */}
            <div className="relative">
              <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden">
                <Image
                  src="/images/clinic/interior.png"
                  alt="Intérieur apaisant de la clinique"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Organic overlap accent */}
              <div className="absolute -bottom-5 -left-5 w-3/4 h-24 rounded-[2rem] bg-surface-container-lowest -z-10" />
            </div>

            {/* Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-primary leading-tight">
                  {t("serenity.title")}
                </h2>
                <p className="font-body text-lg sm:text-xl text-on-surface-variant leading-relaxed">
                  {t("serenity.subtitle")}
                </p>
              </div>

              <ul className="space-y-7">
                {["atmosphere", "punctuality", "technology"].map((item) => (
                  <li key={item} className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="text-primary" size={20} />
                    </div>
                    <span className="font-body text-lg text-on-surface leading-relaxed">
                      {t(`serenity.items.${item}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/routing";
import {
  ShieldCheck,
  Sparkles,
  CircleDot,
  Smile,
  Stethoscope,
  ScanLine,
  Sun,
  Cpu,
  Drill,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { SERVICES, getServiceSlug, type ServiceKey } from "../../../lib/services";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? "Nos Traitements | Hygiène, Implants, Esthétique & Orthodontie | Montréal"
      : "Our Treatments | Hygiene, Implants, Cosmetics & Orthodontics | Montreal",
    description: locale === 'fr'
      ? "Découvrez nos 9 traitements dentaires au Plateau Mont-Royal : nettoyage, implants, facettes, traitement de canal, Invisalign, chirurgie, blanchiment et plus. Technologie de pointe."
      : "Explore our 9 dental treatments on Plateau Mont-Royal: cleaning, implants, veneers, root canal, Invisalign, surgery, whitening and more. Cutting-edge technology.",
    alternates: {
      canonical: `https://dentisteplateau.com/${locale}/services`,
      languages: {
        fr: 'https://dentisteplateau.com/fr/services',
        en: 'https://dentisteplateau.com/en/services',
        'x-default': 'https://dentisteplateau.com/fr/services',
      },
    },
  };
}

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="text-primary" size={32} aria-hidden="true" />,
  Sparkles: <Sparkles className="text-primary" size={32} aria-hidden="true" />,
  Drill: <Drill className="text-primary" size={32} aria-hidden="true" />,
  CircleDot: <CircleDot className="text-primary" size={32} aria-hidden="true" />,
  Smile: <Smile className="text-primary" size={32} aria-hidden="true" />,
  Stethoscope: <Stethoscope className="text-primary" size={32} aria-hidden="true" />,
  ScanLine: <ScanLine className="text-primary" size={32} aria-hidden="true" />,
  Sun: <Sun className="text-primary" size={32} aria-hidden="true" />,
  Cpu: <Cpu className="text-primary" size={32} aria-hidden="true" />,
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/[0.03]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-28 sm:py-36 text-center space-y-8">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-on-primary tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="font-body text-lg sm:text-xl text-on-primary/80 leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ==================== SERVICES GRID ==================== */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const slug = getServiceSlug(locale, service.key as ServiceKey);
            const icon = ICON_MAP[service.icon];
            return (
              <Link
                key={service.key}
                href={{ pathname: '/services/[slug]', params: { slug } }}
                className={`group flex flex-col gap-5 rounded-[2rem] p-8 ${service.bgClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-ambient-hover)]`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed/20 flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div className="flex-1 space-y-3">
                  <h2 className="font-heading font-bold text-xl text-on-surface">
                    {t(`${service.key}.title`)}
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {t(`${service.key}.description`)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary font-body text-sm font-medium">
                  <span>{locale === 'fr' ? 'En savoir plus' : 'Learn more'}</span>
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>


    </>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/routing";
import { CheckCircle, Smile, ScanLine, Stethoscope, CircleDot } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? "Nos Traitements | Implants, Esthétique & Orthodontie"
      : "Our Treatments | Implants, Cosmetics & Orthodontics",
    description: locale === 'fr'
      ? "Découvrez nos traitements dentaires : soins préventifs, orthodontie invisible, dentisterie esthétique et implantologie. Technologies de pointe au Plateau Mont-Royal."
      : "Discover our dental treatments: preventive care, invisible orthodontics, cosmetic dentistry and implantology. Cutting-edge technology in Plateau Mont-Royal.",
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");

  const services = [
    {
      key: "preventive",
      icon: <Stethoscope className="text-primary" size={32} />,
      features: ["xray", "cleaning"],
      bgClass: "bg-surface-container-lowest",
    },
    {
      key: "orthodontics",
      icon: <Smile className="text-primary" size={32} />,
      features: null,
      bgClass: "bg-surface-container-low",
    },
    {
      key: "aesthetic",
      icon: <ScanLine className="text-primary" size={32} />,
      features: null,
      bgClass: "bg-surface-container-lowest",
    },
    {
      key: "implants",
      icon: <CircleDot className="text-primary" size={32} />,
      features: null,
      bgClass: "bg-surface-container-low",
    },
  ];

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
          <p className="font-body text-lg sm:text-xl text-on-primary/80 leading-relaxed mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {services.map((service, index) => (
          <section
            key={service.key}
            className={`py-12 sm:py-16 ${index > 0 ? '' : 'pt-20 sm:pt-28'}`}
          >
            <div className={`rounded-[2.5rem] p-10 sm:p-14 lg:p-20 ${service.bgClass} transition-all duration-300`}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                index % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}>
                {/* Content side */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="w-16 h-16 rounded-2xl bg-primary-fixed/20 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                    {t(`${service.key}.title`)}
                  </h2>
                  <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                    {t(`${service.key}.description`)}
                  </p>
                  {service.features && (
                    <ul className="space-y-3 pt-2">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3">
                          <CheckCircle className="text-primary flex-shrink-0" size={20} />
                          <span className="font-body text-on-surface">
                            {t(`${service.key}.features.${feat}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Visual side */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="w-full aspect-[4/3] rounded-[1.5rem] bg-surface-container-high flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <p className="font-body text-sm text-on-surface-variant">
                        {t(`${service.key}.title`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ==================== CTA ==================== */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-surface-container-low">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-on-surface">
            {t("cta.title")}
          </h2>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-on-primary font-body font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient-hover)]"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}

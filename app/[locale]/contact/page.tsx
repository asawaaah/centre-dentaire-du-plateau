import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactBlock } from "../../../components/contact/ContactBlock";
import { FaqSection } from "../../../components/contact/FaqSection";
import { FaqSchemaOrg } from "../../../components/seo/SchemaOrg";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? "Contact | Prenez Rendez-vous"
      : "Contact | Book an Appointment",
    description: locale === 'fr'
      ? "Contactez le Centre Dentaire du Plateau au 1357 Avenue du Mont-Royal Est. Prenez rendez-vous en ligne ou appelez-nous. Horaires, accès et FAQ."
      : "Contact Centre Dentaire du Plateau at 1357 Avenue du Mont-Royal Est. Book an appointment online or call us. Hours, access and FAQ.",
    alternates: {
      canonical: `https://dentisteplateau.com/${locale}/contact`,
      languages: {
        fr: 'https://dentisteplateau.com/fr/contact',
        en: 'https://dentisteplateau.com/en/contact',
        'x-default': 'https://dentisteplateau.com/fr/contact',
      },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

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

      {/* ==================== CONTACT FORM ==================== */}
      <ContactBlock />

      {/* ==================== FAQ ==================== */}
      <FaqSection />

      {/* FAQ Schema.org for Rich Snippets */}
      <FaqSchemaOrg
        items={[
          {
            question: t('faq.items.new_patients.question'),
            answer: t('faq.items.new_patients.answer'),
          },
          {
            question: t('faq.items.payment.question'),
            answer: t('faq.items.payment.answer'),
          },
          {
            question: t('faq.items.emergency.question'),
            answer: t('faq.items.emergency.answer'),
          },
        ]}
      />
    </>
  );
}

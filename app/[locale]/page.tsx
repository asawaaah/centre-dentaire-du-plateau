import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "../../components/ui/Button";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Index");

  return (
    <main className="flex-1 flex flex-col w-full h-full">
      {/* Signature Hero Section */}
      <section className="bg-gradient-signature min-h-[80vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-b-[3rem] shadow-[var(--shadow-ambient)] relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-[var(--spacing-xl)] relative z-20">
          <h1 className="font-sans font-bold text-5xl md:text-7xl text-[var(--color-on-primary)] tracking-tight">
            {t("title")}
          </h1>
          <p className="font-sans text-xl md:text-2xl text-[var(--color-surface-container-low)] max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button variant="primary" className="w-full sm:w-auto bg-[var(--color-surface-container-lowest)] !text-[var(--color-primary)]">
              Prendre Rendez-vous
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto bg-transparent border border-[var(--color-on-primary)] border-opacity-20 !text-[var(--color-on-primary)] hover:bg-[var(--color-on-primary)] hover:!text-[var(--color-primary)]">
              Nos Services
            </Button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-[var(--spacing-xl)] px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] relative z-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-xl)] items-center">
          <div className="space-y-8">
             <h2 className="text-4xl text-[var(--color-primary)] font-bold">Clinical Serenity</h2>
             <p className="text-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                Notre approche rejette le design médical froid. Profitez d'une atmosphère chaleureuse où l'anxiété disparaît au profit d'une expérience de soin haut de gamme.
             </p>
          </div>
          <div className="bg-[var(--color-surface-container-low)] rounded-[2rem] h-[400px] w-full shadow-inner flex items-center justify-center">
             <span className="text-[var(--color-outline-variant)]">Image chaleureuse de la clinique</span>
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from '../../i18n/routing';

// Map FAQ keys to contextual internal links (Option A: separate CTA blocks)
const FAQ_LINKS: Record<string, { href: string; labelFr: string; labelEn: string }> = {
  new_patients: {
    href: '/regime-canadien-soins-dentaires',
    labelFr: 'Voir notre page RCSD',
    labelEn: 'See our CDCP page',
  },
  cdcp: {
    href: '/regime-canadien-soins-dentaires',
    labelFr: 'En savoir plus sur le RCSD',
    labelEn: 'Learn more about the CDCP',
  },
  emergency: {
    href: '/urgence-dentaire',
    labelFr: 'Voir notre page Urgences',
    labelEn: 'See our Emergency page',
  },
  ramq: {
    href: '/regime-canadien-soins-dentaires',
    labelFr: 'Découvrir le Régime canadien de soins dentaires',
    labelEn: 'Discover the Canadian Dental Care Plan',
  },
  children: {
    href: '/services/hygiene-dentaire',
    labelFr: 'Voir notre service Hygiène dentaire',
    labelEn: 'See our Dental Hygiene service',
  },
};

export function FaqSection() {
  const t = useTranslations('Contact.faq');
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = ['new_patients', 'cdcp', 'payment', 'emergency', 'languages', 'insurance_direct', 'children', 'ramq'];

  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8 bg-surface-container-low">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-4">
            {t('title')}
          </h2>
          <p className="font-body text-lg text-on-surface-variant">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const link = FAQ_LINKS[item];
            return (
              <div
                key={item}
                className="bg-surface-container-lowest rounded-[1.25rem] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-ambient)]"
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-panel-${index}`}
                >
                  <h3 className="font-heading font-semibold text-on-surface pr-4">
                    {t(`items.${item}.question`)}
                  </h3>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-4 font-body text-on-surface-variant leading-relaxed">
                    {t(`items.${item}.answer`)}
                  </p>
                  {link && (
                    <div className="px-6 pb-6">
                      <Link
                        href={link.href as any}
                        className="inline-flex items-center gap-1.5 font-body text-sm text-primary font-medium hover:gap-2.5 transition-all duration-200"
                      >
                        {locale === 'fr' ? link.labelFr : link.labelEn}
                        <ChevronRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


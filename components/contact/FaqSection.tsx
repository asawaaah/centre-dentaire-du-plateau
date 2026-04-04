'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export function FaqSection() {
  const t = useTranslations('Contact.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = ['new_patients', 'payment', 'emergency'];

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
          {faqItems.map((item, index) => (
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
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-6 font-body text-on-surface-variant leading-relaxed">
                  {t(`items.${item}.answer`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

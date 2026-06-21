'use client';

import { useEffect, useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

const VIRTUAL_TOUR_SRC =
  'https://www.google.com/maps/embed?pb=!4v1782064455162!6m8!1m7!1sCAoSLEFGMVFpcE5mSWhvc0h4NE9qNHVkckgzcVZ2ajZOT2hxb0tzMnpJYl9sSE1G!2m2!1d45.53048138404247!2d-73.57710976926973!3f348.58!4f-6.409999999999997!5f0.7820865974627469';

interface VirtualTourModalProps {
  className?: string;
}

export function VirtualTourModal({ className }: VirtualTourModalProps) {
  const t = useTranslations('VirtualTour');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-on-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${className ?? ''}`}
        aria-label={t('cta')}
      >
        <MapPin size={16} aria-hidden="true" />
        {t('cta')}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('title')}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative flex h-full w-full flex-col sm:h-auto sm:max-h-[90vh] sm:max-w-5xl sm:rounded-2xl sm:overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t('close')}
            >
              <X size={20} aria-hidden="true" />
            </button>

            <iframe
              src={VIRTUAL_TOUR_SRC}
              className="h-full w-full flex-1 sm:aspect-video sm:h-auto"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('title')}
            />
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Loader2 } from 'lucide-react';

export function ContactForm() {
  const t = useTranslations('Contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 sm:p-10 space-y-6 sticky top-28">
      <h3 className="font-heading font-bold text-2xl text-on-surface">
        {t('title')}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="contact-name" className="font-body text-sm font-medium text-on-surface">
            {t('name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-body text-on-surface placeholder:text-outline ghost-border focus:ghost-border-focus transition-all duration-200 outline-none"
            placeholder={t('name')}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="contact-email" className="font-body text-sm font-medium text-on-surface">
            {t('email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
            title="Veuillez entrer une adresse email valide"
            required
            className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-body text-on-surface placeholder:text-outline ghost-border focus:ghost-border-focus transition-all duration-200 outline-none"
            placeholder={t('email')}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="contact-phone" className="font-body text-sm font-medium text-on-surface">
            {t('phone')}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            pattern="^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
            title="Veuillez entrer un numéro de téléphone valide (ex: 514-123-4567)"
            className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-body text-on-surface placeholder:text-outline ghost-border focus:ghost-border-focus transition-all duration-200 outline-none"
            placeholder={t('phone')}
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label htmlFor="contact-date" className="font-body text-sm font-medium text-on-surface">
            {t('date')}
          </label>
          <input
            id="contact-date"
            name="date"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-body text-on-surface placeholder:text-outline [color-scheme:light] dark:[color-scheme:dark] ghost-border focus:ghost-border-focus transition-all duration-200 outline-none"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="contact-message" className="font-body text-sm font-medium text-on-surface">
            {t('message')}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-body text-on-surface placeholder:text-outline ghost-border focus:ghost-border-focus transition-all duration-200 outline-none resize-none"
            placeholder={t('message')}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-on-primary font-body font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient-hover)] disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{t('submit')}</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>{t('submit')}</span>
            </>
          )}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="bg-primary-fixed/20 rounded-xl p-4 text-center">
            <p className="font-body text-sm text-primary font-medium">{t('success')}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="bg-error-container rounded-xl p-4 text-center">
            <p className="font-body text-sm text-error font-medium">{t('error')}</p>
          </div>
        )}
      </form>
    </div>
  );
}

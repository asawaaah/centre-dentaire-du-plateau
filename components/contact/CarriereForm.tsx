'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, Loader2, Paperclip, X } from 'lucide-react';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB
const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export function CarriereForm() {
  const t = useTranslations('Carriere.form');
  const locale = useLocale();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) return t('file_too_large');
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext) && !ACCEPTED_TYPES.includes(file.type)) {
      return t('file_invalid');
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileError(null);
    if (file) {
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        setSelectedFile(null);
        e.target.value = '';
        return;
      }
    }
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);
    setStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('locale', locale);

    try {
      const response = await fetch('/api/carriere', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit');

      setStatus('success');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 sm:p-10 space-y-6">
      <h3 className="font-heading font-bold text-2xl text-on-surface">
        {t('title')}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First name + Last name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="carriere-firstName" className="font-body text-sm font-medium text-on-surface">
              {t('firstName')} <span aria-hidden="true" className="text-error">*</span>
            </label>
            <input
              id="carriere-firstName"
              name="firstName"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-body text-on-surface placeholder:text-outline ghost-border focus:ghost-border-focus transition-all duration-200 outline-none"
              placeholder={t('firstName')}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="carriere-lastName" className="font-body text-sm font-medium text-on-surface">
              {t('lastName')} <span aria-hidden="true" className="text-error">*</span>
            </label>
            <input
              id="carriere-lastName"
              name="lastName"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-body text-on-surface placeholder:text-outline ghost-border focus:ghost-border-focus transition-all duration-200 outline-none"
              placeholder={t('lastName')}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="carriere-email" className="font-body text-sm font-medium text-on-surface">
            {t('email')} <span aria-hidden="true" className="text-error">*</span>
          </label>
          <input
            id="carriere-email"
            name="email"
            type="email"
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
            title={t('email_title')}
            required
            className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-body text-on-surface placeholder:text-outline ghost-border focus:ghost-border-focus transition-all duration-200 outline-none"
            placeholder={t('email')}
          />
        </div>

        {/* Position */}
        <div className="space-y-2">
          <label htmlFor="carriere-position" className="font-body text-sm font-medium text-on-surface">
            {t('position')} <span aria-hidden="true" className="text-error">*</span>
          </label>
          <input
            id="carriere-position"
            name="position"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-body text-on-surface placeholder:text-outline ghost-border focus:ghost-border-focus transition-all duration-200 outline-none"
            placeholder={t('position_placeholder')}
          />
        </div>

        {/* CV Upload */}
        <div className="space-y-2">
          <label htmlFor="carriere-cv" className="font-body text-sm font-medium text-on-surface">
            {t('cv')} <span aria-hidden="true" className="text-error">*</span>
          </label>
          <div className="relative">
            {selectedFile ? (
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg ghost-border bg-surface-container-lowest">
                <Paperclip size={16} className="text-primary shrink-0" />
                <span className="font-body text-sm text-on-surface truncate flex-1">{selectedFile.name}</span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-outline hover:text-on-surface transition-colors shrink-0"
                  aria-label="Retirer le fichier"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="carriere-cv"
                className="flex items-center gap-3 px-4 py-3 rounded-lg ghost-border bg-surface-container-lowest cursor-pointer hover:ghost-border-focus transition-all duration-200"
              >
                <Paperclip size={16} className="text-outline shrink-0" />
                <span className="font-body text-sm text-outline">{t('cv_hint')}</span>
              </label>
            )}
            <input
              id="carriere-cv"
              name="cv"
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required={!selectedFile}
              className="sr-only"
            />
          </div>
          {fileError && (
            <p className="font-body text-xs text-error">{fileError}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !selectedFile}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-on-primary font-body font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient-hover)] disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              <span>{t('submit')}</span>
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" />
              <span>{t('submit')}</span>
            </>
          )}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <div role="alert" className="bg-primary-fixed/20 rounded-xl p-4 text-center">
            <p className="font-body text-sm text-primary font-medium">{t('success')}</p>
          </div>
        )}
        {status === 'error' && (
          <div role="alert" className="bg-error-container rounded-xl p-4 text-center">
            <p className="font-body text-sm text-error font-medium">{t('error')}</p>
          </div>
        )}
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '../../i18n/routing';
import { Phone, Menu, X, Globe } from 'lucide-react';
import { useRouter } from '../../i18n/routing';
import { useLocale } from 'next-intl';

export function Navbar() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/a-propos', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-on-primary text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="tel:+15145281587" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Phone size={14} />
            <span className="font-body">{t('phone')}</span>
          </a>
          <span className="hidden sm:block font-body text-on-primary/80">{t('hours_short')}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="glass shadow-[var(--shadow-ambient)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.svg"
                alt="Centre Dentaire du Plateau"
                width={32}
                height={32}
                className="w-8 h-8"
                priority
              />
              <span className="hidden sm:block font-heading font-bold text-xl text-primary">
                Centre Dentaire du Plateau
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors duration-200 hover:text-primary ${pathname === link.href
                      ? 'text-primary'
                      : 'text-on-surface-variant'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={switchLocale}
                className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-body text-sm"
                aria-label={t('switch_lang')}
              >
                <Globe size={16} />
                <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-on-primary font-body font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient-hover)]"
              >
                {t('cta')}
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-on-surface-variant"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden glass border-t border-outline-variant/15 animate-in slide-in-from-top">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block font-body text-base font-medium py-2 transition-colors ${pathname === link.href
                      ? 'text-primary'
                      : 'text-on-surface-variant'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={switchLocale}
                  className="flex items-center gap-1.5 text-on-surface-variant font-body text-sm"
                >
                  <Globe size={16} />
                  <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
                </button>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-6 py-2.5 rounded-full bg-primary text-on-primary font-body font-medium text-sm"
                >
                  {t('cta')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

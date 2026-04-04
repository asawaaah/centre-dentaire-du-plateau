'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '../../i18n/routing';
import { Phone, Menu, X, Globe, Clock } from 'lucide-react';
import { useRouter } from '../../i18n/routing';
import { useLocale } from 'next-intl';

export function Navbar() {
  const t = useTranslations('Nav');
  const tFooter = useTranslations('Footer');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToContact = () => {
    document.getElementById('rendez-vous')?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/services' as const, label: t('services') },
    { href: '/a-propos' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ];

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname as '/' | '/services' | '/a-propos' | '/contact', { locale: newLocale, scroll: false });
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-on-primary text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <span className="hidden sm:block font-body text-on-primary/80">{t('hours_short')}</span>
          <a href="tel:+15145281587" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Phone size={14} aria-hidden="true" />
            <span className="font-body">{t('phone')}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav aria-label={t('nav_label')} className="glass shadow-[var(--shadow-ambient)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <Image
                src="/images/logo.svg"
                alt="Centre Dentaire du Plateau"
                width={32}
                height={32}
                className="w-8 h-8 md:w-11 md:h-11 shrink-0"
                priority
              />
              <span className="font-heading font-bold text-sm md:text-xl text-primary leading-tight flex flex-col">
                <span>Centre Dentaire</span>
                <span className="uppercase tracking-wide">du Plateau</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`font-body text-sm font-medium transition-colors duration-200 hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={switchLocale}
                className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-body text-sm"
                aria-label={t('switch_lang')}
              >
                <Globe size={16} aria-hidden="true" />
                <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
              </button>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-on-primary font-body font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient-hover)]"
              >
                {t('cta')}
              </button>
            </div>

            {/* Mobile Right Area */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-primary text-on-primary font-body font-medium text-xs transition-all duration-300"
              >
                {t('cta')}
              </button>
              <button
                className="p-2 text-on-surface-variant"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? t('menu_close') : t('menu_open')}
              >
                {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden glass border-t border-outline-variant/15 animate-in slide-in-from-top">
            <div className="px-4 py-6">
              {/* Nav links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={`block font-body text-base font-medium py-2.5 transition-colors ${pathname === link.href ? 'text-primary' : 'text-on-surface-variant'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Language switcher */}
              <div className="border-t border-outline-variant/15 mt-4 pt-4">
                <button
                  onClick={switchLocale}
                  className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-body text-sm"
                  aria-label={t('switch_lang')}
                >
                  <Globe size={16} aria-hidden="true" />
                  <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
                </button>
              </div>

              {/* Opening hours */}
              <div className="border-t border-outline-variant/15 mt-4 pt-4">
                <p className="flex items-center gap-2 font-heading font-semibold text-sm text-on-surface mb-3">
                  <Clock size={15} aria-hidden="true" />
                  {tFooter('hours_title')}
                </p>
                <ul className="space-y-1.5 font-body text-sm text-on-surface-variant">
                  <li>{tFooter('hours.mon_thu')}</li>
                  <li>{tFooter('hours.fri')}</li>
                  <li>{tFooter('hours.sat')}</li>
                  <li>{tFooter('hours.sun')}</li>
                </ul>
              </div>

              {/* CTA */}
              <div className="border-t border-outline-variant/15 mt-4 pt-4">
                <button
                  onClick={scrollToContact}
                  className="block w-full text-center px-6 py-3 rounded-full bg-primary text-on-primary font-body font-medium text-sm transition-all duration-300 hover:shadow-[var(--shadow-ambient-hover)]"
                >
                  {t('cta')}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

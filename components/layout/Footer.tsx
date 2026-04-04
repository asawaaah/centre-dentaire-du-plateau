import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/routing';
import { MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-surface-container-low">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-signature flex items-center justify-center">
                <span className="text-on-primary font-heading font-bold text-sm">S</span>
              </div>
              <span className="font-heading font-bold text-xl text-primary">
                Sérénité
              </span>
            </div>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="tel:+15141234567"
                className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[var(--shadow-ambient)]"
                aria-label={t('phone_label')}
              >
                <Phone size={18} />
              </a>
              <a
                href="mailto:info@centre-dentaire-plateau.com"
                className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[var(--shadow-ambient)]"
                aria-label={t('email_label')}
              >
                <Mail size={18} />
              </a>
              <a
                href="https://maps.google.com/?q=1357+Avenue+Mont-Royal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[var(--shadow-ambient)]"
                aria-label={t('map_label')}
              >
                <MapPin size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-on-surface text-sm tracking-wide uppercase">
              {t('services_title')}
            </h4>
            <ul className="space-y-3">
              {['implants', 'whitening', 'orthodontics', 'pediatric'].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {t(`services.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-on-surface text-sm tracking-wide uppercase">
              {t('navigation_title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-on-surface text-sm tracking-wide uppercase">
              {t('hours_title')}
            </h4>
            <div className="space-y-2 font-body text-sm text-on-surface-variant">
              <p>{t('hours.mon_thu')}</p>
              <p>{t('hours.fri')}</p>
              <p>{t('hours.sat')}</p>
              <p>{t('hours.sun')}</p>
            </div>
            <div className="pt-2">
              <p className="font-body text-xs text-on-surface-variant">
                1357 Avenue Mont-Royal
              </p>
              <p className="font-body text-xs text-on-surface-variant">
                {t('phone_number')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-on-surface-variant">
              {t('copyright')}
            </p>
            <div className="flex items-center gap-4">
              <Link href="/" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">
                {t('legal')}
              </Link>
              <Link href="/" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">
                {t('privacy')}
              </Link>
              <Link href="/" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">
                {t('accessibility')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/services': '/services',
    '/services/[slug]': '/services/[slug]',
    '/a-propos': {
      fr: '/a-propos',
      en: '/about',
    },
    '/contact': '/contact',
    '/carriere': {
      fr: '/carriere',
      en: '/careers',
    },
    '/urgence-dentaire': {
      fr: '/urgence-dentaire',
      en: '/dental-emergency',
    },
    '/a-propos/dr-saul-barchichat': {
      fr: '/a-propos/dr-saul-barchichat',
      en: '/about/dr-saul-barchichat',
    },
    '/regime-canadien-soins-dentaires': {
      fr: '/regime-canadien-soins-dentaires',
      en: '/canadian-dental-care-plan',
    },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
  },
});

export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);

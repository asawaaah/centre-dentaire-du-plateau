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
  },
});

export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);

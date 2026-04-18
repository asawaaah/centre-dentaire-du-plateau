import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/routing';
import { Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '../../../lib/blog';
import { BlogCardImage } from '../../../components/ui/BlogCardImage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? 'Blog Dentaire — Conseils & Actualités | Dentiste Plateau Mont-Royal'
      : 'Dental Blog — Tips & News | Dentist Plateau Mont-Royal',
    description: locale === 'fr'
      ? 'Conseils dentaires, guides pratiques et actualités de santé bucco-dentaire rédigés par le Dr. Barchichat, dentiste au Plateau Mont-Royal depuis 1991.'
      : 'Dental tips, practical guides and oral health news written by Dr. Barchichat, dentist on the Plateau Mont-Royal since 1991.',
    alternates: {
      canonical: `https://dentisteplateau.com/${locale}/blog`,
      languages: {
        fr: 'https://dentisteplateau.com/fr/blog',
        en: 'https://dentisteplateau.com/en/blog',
        'x-default': 'https://dentisteplateau.com/fr/blog',
      },
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  urgence: 'bg-orange-500/80 text-white',
  soins: 'bg-blue-500/80 text-white',
  orthodontie: 'bg-purple-500/80 text-white',
  prevention: 'bg-green-500/80 text-white',
  assurance: 'bg-yellow-500/80 text-white',
};

export default async function BlogHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Blog');
  const tPages = await getTranslations('BlogPages');

  const baseUrl = 'https://dentisteplateau.com';
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'fr' ? 'Blog Dentaire — Centre Dentaire du Plateau' : 'Dental Blog — Centre Dentaire du Plateau',
    url: `${baseUrl}/${locale}/blog`,
    itemListElement: BLOG_POSTS.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${baseUrl}/${locale}/blog/${post.slugs[locale as 'fr' | 'en']}`,
      name: tPages(`${post.key}.hero_title`),
    })),
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28 text-center space-y-5">
          <p className="font-body text-sm font-medium text-on-primary/60 uppercase tracking-widest">
            Blog
          </p>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-on-primary leading-tight">
            {t('hero_title')}
          </h1>
          <p className="font-body text-base sm:text-lg text-on-primary/80 mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => {
            const slug = post.slugs[locale as 'fr' | 'en'];
            const title = tPages(`${post.key}.hero_title`);
            const categoryLabel = t(`categories.${post.category}`);
            const colorClass = CATEGORY_COLORS[post.category] ?? 'bg-surface-container/80 text-white';

            return (
              <article
                key={post.key}
                className="group flex flex-col rounded-2xl bg-surface-container-lowest overflow-hidden hover:shadow-[var(--shadow-ambient)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail with title overlay */}
                <Link href={{ pathname: '/blog/[slug]', params: { slug } }} className="block">
                  <div className="relative h-52 bg-surface-container overflow-hidden">
                    {/* Real image with gradient fallback */}
                    <BlogCardImage src={post.featuredImage} alt={title} />
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${colorClass}`}>
                        {categoryLabel}
                      </span>
                    </div>

                    {/* Title overlaid on image */}
                    <div className="absolute inset-0 flex items-end p-5">
                      <h2 className="font-heading font-semibold text-base text-white leading-snug line-clamp-3 drop-shadow-md group-hover:opacity-90 transition-opacity">
                        {title}
                      </h2>
                    </div>
                  </div>
                </Link>

                {/* Card footer */}
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant font-body">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" />
                      {post.readingTime} {t('min_read')}
                    </span>
                  </div>

                  <Link
                    href={{ pathname: '/blog/[slug]', params: { slug } }}
                    className="flex items-center gap-1 font-body text-xs font-medium text-primary hover:gap-2 transition-all"
                    aria-label={`${t('read_more')} — ${title}`}
                  >
                    {t('read_more')}
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
    </>
  );
}

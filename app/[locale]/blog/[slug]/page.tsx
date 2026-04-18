import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../../../i18n/routing';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ChevronRight, ChevronDown, Phone, User } from 'lucide-react';
import type { Metadata } from 'next';
import {
  getAllBlogStaticParams,
  getBlogPostBySlug,
  BLOG_POSTS,
} from '../../../../lib/blog';
import {
  ArticleSchemaOrg,
  BlogBreadcrumbSchemaOrg,
  FaqSchemaOrg,
} from '../../../../components/seo/SchemaOrg';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(locale, slug);
  if (!post) return {};

  const t = await getTranslations({ locale, namespace: 'BlogPages' });
  const key = post.key;

  return {
    title: t(`${key}.meta_title`),
    description: t(`${key}.meta_description`),
    alternates: {
      canonical: `https://dentisteplateau.com/${locale}/blog/${slug}`,
      languages: {
        fr: `https://dentisteplateau.com/fr/blog/${post.slugs.fr}`,
        en: `https://dentisteplateau.com/en/blog/${post.slugs.en}`,
        'x-default': `https://dentisteplateau.com/fr/blog/${post.slugs.fr}`,
      },
    },
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Dr. Saul Barchichat'],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  urgence: 'bg-orange-100 text-orange-700',
  soins: 'bg-blue-100 text-blue-700',
  orthodontie: 'bg-purple-100 text-purple-700',
  prevention: 'bg-green-100 text-green-700',
  assurance: 'bg-yellow-100 text-yellow-700',
};

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations('BlogPages');
  const tBlog = await getTranslations('Blog');
  const key = post.key;

  const sections = t.raw(`${key}.sections`) as { h2: string; body: string; list?: string[] }[];
  const faq = t.raw(`${key}.faq`) as { q: string; a: string }[];
  const heroTitle = t(`${key}.hero_title`);
  const heroSubtitle = t(`${key}.hero_subtitle`);
  const intro = t(`${key}.intro`);
  const internalLink = t(`${key}.internal_link`);
  const internalLinkLabel = t(`${key}.internal_link_label`);
  const categoryLabel = tBlog(`categories.${post.category}`);
  const colorClass = CATEGORY_COLORS[post.category] ?? 'bg-surface-container text-on-surface-variant';

  const relatedPosts = BLOG_POSTS.filter((p) => p.key !== key).slice(0, 3);

  const authorPagePath = locale === 'fr' ? '/a-propos/dr-saul-barchichat' : '/a-propos/dr-saul-barchichat';

  return (
    <>
      <ArticleSchemaOrg
        title={heroTitle}
        description={t(`${key}.meta_description`)}
        slug={slug}
        locale={locale}
        publishedAt={post.publishedAt}
        imageUrl={post.featuredImage}
      />
      <BlogBreadcrumbSchemaOrg locale={locale} articleTitle={heroTitle} articleSlug={slug} />
      {faq.length > 0 && (
        <FaqSchemaOrg items={faq.map((item) => ({ question: item.q, answer: item.a }))} />
      )}

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-signature" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28 space-y-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-primary/60 font-body text-sm flex-wrap">
            <Link href="/" className="hover:text-on-primary transition-colors">
              {locale === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/blog" className="hover:text-on-primary transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-on-primary/80 line-clamp-1">{heroTitle}</span>
          </nav>

          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                {categoryLabel}
              </span>
              <span className="flex items-center gap-1.5 text-on-primary/60 text-xs font-body">
                <Calendar size={12} aria-hidden="true" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </span>
              <span className="flex items-center gap-1.5 text-on-primary/60 text-xs font-body">
                <Clock size={12} aria-hidden="true" />
                {post.readingTime} {tBlog('min_read')}
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-on-primary leading-tight">
              {heroTitle}
            </h1>
            <p className="font-body text-base sm:text-lg text-on-primary/80 leading-relaxed">
              {heroSubtitle}
            </p>
            <p className="flex items-center gap-2 font-body text-sm text-on-primary/60">
              <User size={14} aria-hidden="true" />
              {tBlog('by_author')}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* ---- Article body ---- */}
          <article className="lg:col-span-2 space-y-12">

            {/* Intro */}
            <div className="space-y-4">
              <div className="w-1 h-12 rounded-full bg-primary" />
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                {intro}
              </p>
            </div>

            {/* Sections */}
            {sections.map((section, i) => (
              <section key={i} className="space-y-5">
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                  {section.h2}
                </h2>
                <p className="font-body text-base text-on-surface-variant leading-relaxed">
                  {section.body}
                </p>
                {section.list && section.list.length > 0 && (
                  <ul className="space-y-3">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest">
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" aria-hidden="true" />
                        <span className="font-body text-on-surface leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Internal link to service page */}
            {internalLink && (
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-primary/10 flex items-center justify-between gap-4 flex-wrap">
                <p className="font-body text-sm text-on-surface-variant">{internalLinkLabel}</p>
                <Link
                  href={internalLink as '/'}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary text-primary font-body text-sm font-medium hover:bg-primary hover:text-on-primary transition-all duration-200 whitespace-nowrap"
                >
                  {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
                  <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </div>
            )}

            {/* FAQ */}
            {faq.length > 0 && (
              <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                  {locale === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}
                </h2>
                <div className="space-y-4">
                  {faq.map((item, i) => (
                    <details key={i} className="group rounded-2xl bg-surface-container-lowest overflow-hidden">
                      <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-body font-semibold text-on-surface hover:text-primary transition-colors">
                        <span>{item.q}</span>
                        <ChevronDown
                          size={18}
                          aria-hidden="true"
                          className="flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                        />
                      </summary>
                      <p className="px-6 pb-6 font-body text-on-surface-variant leading-relaxed">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom CTA */}
            <div className="rounded-[2rem] bg-gradient-signature p-8 sm:p-10 space-y-5 text-center">
              <h3 className="font-heading font-bold text-2xl text-on-primary">
                {locale === 'fr' ? 'Prêt à prendre soin de votre sourire ?' : 'Ready to take care of your smile?'}
              </h3>
              <p className="font-body text-on-primary/80 text-sm">
                {locale === 'fr'
                  ? 'Notre équipe au Plateau Mont-Royal est disponible du lundi au vendredi.'
                  : 'Our team on Plateau Mont-Royal is available Monday through Friday.'}
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/25 text-on-primary font-body text-sm font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  {locale === 'fr' ? 'Prendre rendez-vous' : 'Book an appointment'}
                </Link>
                <a
                  href="tel:+15145281587"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-on-primary font-body text-sm font-semibold hover:bg-white/30 transition-all duration-300"
                >
                  <Phone size={16} aria-hidden="true" />
                  514-528-1587
                </a>
              </div>
            </div>

            {/* Back to blog */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-body text-sm text-primary hover:underline"
            >
              {tBlog('back_to_blog')}
            </Link>

          </article>

          {/* ---- Sidebar ---- */}
          <aside className="space-y-6">

            {/* CTA card */}
            <div className="rounded-[2rem] bg-gradient-signature p-6 space-y-4 sticky top-28">
              <h3 className="font-heading font-semibold text-lg text-on-primary">
                {tBlog('sidebar_cta_title')}
              </h3>
              <p className="font-body text-sm text-on-primary/80">
                {tBlog('sidebar_cta_subtitle')}
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/15 border border-white/25 text-on-primary font-body text-sm font-medium hover:bg-white/25 transition-all duration-200"
              >
                {tBlog('sidebar_cta_button')}
              </Link>
              <a
                href="tel:+15145281587"
                className="flex items-center justify-center gap-2 font-body text-sm text-on-primary/80 hover:text-on-primary transition-colors"
              >
                <Phone size={14} aria-hidden="true" />
                514-528-1587
              </a>
            </div>

            {/* Author card */}
            <div className="rounded-[2rem] bg-surface-container-lowest p-6 space-y-4">
              <h3 className="font-heading font-semibold text-sm text-on-surface uppercase tracking-wide">
                {tBlog('sidebar_author_title')}
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-on-surface">{tBlog('sidebar_author_name')}</p>
                  <p className="font-body text-xs text-on-surface-variant">{tBlog('sidebar_author_bio')}</p>
                </div>
              </div>
              <Link
                href={authorPagePath as '/'}
                className="flex items-center gap-1.5 font-body text-sm text-primary hover:underline"
              >
                {tBlog('sidebar_author_link')}
                <ChevronRight size={13} aria-hidden="true" />
              </Link>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="rounded-[2rem] bg-surface-container-lowest p-6 space-y-4">
                <h3 className="font-heading font-semibold text-sm text-on-surface uppercase tracking-wide">
                  {tBlog('related_articles')}
                </h3>
                <nav className="space-y-2">
                  {relatedPosts.map((related) => {
                    const relatedSlug = related.slugs[locale as 'fr' | 'en'];
                    const relatedTitle = t(`${related.key}.hero_title`);
                    return (
                      <Link
                        key={related.key}
                        href={`/blog/${relatedSlug}` as `/blog/${string}`}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl font-body text-sm text-on-surface-variant hover:text-primary hover:bg-primary-fixed/10 transition-all duration-200"
                      >
                        <ChevronRight size={14} className="flex-shrink-0 text-primary mt-0.5" aria-hidden="true" />
                        <span className="line-clamp-2">{relatedTitle}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}

          </aside>

        </div>
      </div>
    </>
  );
}

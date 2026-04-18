export function SchemaOrg({ locale }: { locale: string }) {
  const isFr = locale === 'fr';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Dentist', 'LocalBusiness', 'MedicalBusiness'],
        '@id': 'https://dentisteplateau.com/#organization',
        name: 'Centre Dentaire du Plateau',
        url: 'https://dentisteplateau.com',
        logo: 'https://dentisteplateau.com/images/logo.svg',
        image: 'https://dentisteplateau.com/images/clinic/interior.png',
        description: isFr
          ? 'Votre dentiste de quartier au Plateau Mont-Royal. Implants dentaires, soins esthétiques, orthodontie et soins préventifs dans un environnement chaleureux et accessible.'
          : 'Your neighborhood dentist in Plateau Mont-Royal. Dental implants, cosmetic care, orthodontics and preventive care in a warm, welcoming environment.',
        telephone: '+1-514-528-1587',
        email: 'info@dentisteplateau.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1357 Avenue du Mont-Royal Est',
          addressLocality: 'Montréal',
          addressRegion: 'QC',
          postalCode: 'H2J 1Y8',
          addressCountry: 'CA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.5255,
          longitude: -73.5773,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Friday',
            opens: '09:00',
            closes: '14:00',
          },
        ],
        priceRange: '$$',
        currenciesAccepted: 'CAD',
        paymentAccepted: 'Cash, Credit Card, Debit Card',
        areaServed: [
          { '@type': 'City', name: 'Montréal' },
          { '@type': 'Neighborhood', name: 'Plateau Mont-Royal' },
          { '@type': 'Neighborhood', name: 'Rosemont' },
          { '@type': 'Neighborhood', name: 'Mile-End' },
          { '@type': 'Neighborhood', name: 'Outremont' },
          { '@type': 'Neighborhood', name: 'Villeray' },
        ],
        medicalSpecialty: 'Dentistry',
        hasMap: 'https://maps.google.com/?q=1357+Avenue+du+Mont-Royal+Est+Montreal',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isFr ? 'Traitements Dentaires' : 'Dental Treatments',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: isFr ? 'Implants Dentaires' : 'Dental Implants',
                procedureType: 'https://schema.org/SurgicalProcedure',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: isFr ? 'Orthodontie Invisible' : 'Invisible Orthodontics',
                procedureType: 'https://schema.org/NoninvasiveProcedure',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: isFr ? 'Blanchiment Dentaire' : 'Teeth Whitening',
                procedureType: 'https://schema.org/NoninvasiveProcedure',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: isFr ? 'Soins Préventifs' : 'Preventive Care',
                procedureType: 'https://schema.org/NoninvasiveProcedure',
              },
            },
          ],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.1',
          reviewCount: '82',
          bestRating: '5',
          worstRating: '1',
        },
        sameAs: [
          'https://www.facebook.com/dentisteplateau/',
          'https://ca.linkedin.com/in/saul-barchichat-21a032158',
          'https://www.google.com/maps?q=1357+Avenue+du+Mont-Royal+Est+Montreal',
        ],
        foundingDate: '2008',
        founder: {
          '@type': 'Physician',
          '@id': 'https://dentisteplateau.com/#dentist-barchichat',
          name: 'Dr. Saul Barchichat',
          honorificPrefix: 'Dr.',
          honorificSuffix: 'DMD',
          jobTitle: isFr ? 'Fondateur & Dentiste' : 'Founder & Dentist',
          image: 'https://dentisteplateau.com/images/team/dr-barchichat.jpg',
          url: 'https://dentisteplateau.com/fr/a-propos',
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: isFr ? 'Université de Montréal, Faculté de médecine dentaire' : 'Université de Montréal, Faculty of Dental Medicine',
          },
          memberOf: [
            { '@type': 'Organization', name: isFr ? 'Ordre des dentistes du Québec' : 'Ordre des dentistes du Québec (ODQ)' },
            { '@type': 'Organization', name: isFr ? 'Association dentaire canadienne' : 'Canadian Dental Association' },
          ],
          description: isFr
            ? 'Dr. Saul Barchichat, DMD, exerce la dentisterie au Plateau Mont-Royal depuis 1991. Diplômé de l\'Université de Montréal et membre de l\'Ordre des dentistes du Québec, il offre des soins complets pour patients de tous âges dans une approche douce et personnalisée.'
            : 'Dr. Saul Barchichat, DMD, has practiced dentistry on Plateau Mont-Royal since 1991. A graduate of Université de Montréal and member of the Ordre des dentistes du Québec, he provides comprehensive care for patients of all ages with a gentle, personalized approach.',
          worksFor: { '@id': 'https://dentisteplateau.com/#organization' },
          knowsLanguage: ['fr', 'en'],
        },
        employee: [
          {
            '@type': 'Physician',
            '@id': 'https://dentisteplateau.com/#dentist-barchichat',
            name: 'Dr. Saul Barchichat',
            jobTitle: isFr ? 'Dentiste' : 'Dentist',
            image: 'https://dentisteplateau.com/images/team/dr-barchichat.jpg',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://dentisteplateau.com/#website',
        url: 'https://dentisteplateau.com',
        name: 'Centre Dentaire du Plateau',
        inLanguage: [locale],
        publisher: {
          '@id': 'https://dentisteplateau.com/#organization',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchemaOrg({
  locale,
  serviceName,
  serviceSlug,
}: {
  locale: string;
  serviceName: string;
  serviceSlug: string;
}) {
  const base = 'https://dentisteplateau.com';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'fr' ? 'Accueil' : 'Home', item: `${base}/${locale}` },
      { '@type': 'ListItem', position: 2, name: locale === 'fr' ? 'Traitements' : 'Treatments', item: `${base}/${locale}/services` },
      { '@type': 'ListItem', position: 3, name: serviceName, item: `${base}/${locale}/services/${serviceSlug}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EmergencySchemaOrg({ locale }: { locale: string }) {
  const isFr = locale === 'fr';
  const base = 'https://dentisteplateau.com';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EmergencyService',
        '@id': `${base}/#emergency`,
        name: isFr ? 'Urgence Dentaire — Centre Dentaire du Plateau' : 'Dental Emergency — Centre Dentaire du Plateau',
        url: isFr ? `${base}/fr/urgence-dentaire` : `${base}/en/dental-emergency`,
        telephone: '+1-514-528-1587',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1357 Avenue du Mont-Royal Est',
          addressLocality: 'Montréal',
          addressRegion: 'QC',
          postalCode: 'H2J 1Y8',
          addressCountry: 'CA',
        },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '18:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '14:00' },
        ],
        areaServed: { '@type': 'AdministrativeArea', name: 'Plateau-Mont-Royal, Montréal' },
        parentOrganization: { '@id': `${base}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchemaOrg({
  title,
  description,
  slug,
  locale,
  publishedAt,
  imageUrl,
}: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  publishedAt: string;
  imageUrl: string;
}) {
  const url = `https://dentisteplateau.com/${locale}/blog/${slug}`;
  const authorPagePath = locale === 'fr' ? 'fr/a-propos/dr-saul-barchichat' : 'en/about/dr-saul-barchichat';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    image: `https://dentisteplateau.com${imageUrl}`,
    author: {
      '@type': 'Person',
      name: 'Dr. Saul Barchichat',
      jobTitle: 'Dentiste DMD',
      url: `https://dentisteplateau.com/${authorPagePath}`,
    },
    publisher: {
      '@type': 'Dentist',
      name: 'Centre Dentaire du Plateau',
      url: 'https://dentisteplateau.com',
      logo: { '@type': 'ImageObject', url: 'https://dentisteplateau.com/images/logo.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogBreadcrumbSchemaOrg({
  locale,
  articleTitle,
  articleSlug,
}: {
  locale: string;
  articleTitle: string;
  articleSlug: string;
}) {
  const base = 'https://dentisteplateau.com';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'fr' ? 'Accueil' : 'Home', item: `${base}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${base}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: articleTitle, item: `${base}/${locale}/blog/${articleSlug}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqSchemaOrg({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

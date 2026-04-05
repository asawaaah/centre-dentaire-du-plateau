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
          ? 'Clinique dentaire haut de gamme au Plateau Mont-Royal. Implants, esthétique, orthodontie invisible et soins préventifs dans une atmosphère apaisante.'
          : 'Premium dental clinic in Plateau Mont-Royal. Implants, cosmetics, invisible orthodontics and preventive care in a soothing atmosphere.',
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
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Sunday',
            opens: '10:00',
            closes: '14:00',
          },
        ],
        priceRange: '$$$',
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
        sameAs: [],
        foundingDate: '2008',
        founder: {
          '@type': 'Person',
          name: 'Dr. Saul Barchichat',
          jobTitle: isFr ? 'Fondateur & Dentiste' : 'Founder & Dentist',
        },
        employee: [
          {
            '@type': 'Dentist',
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

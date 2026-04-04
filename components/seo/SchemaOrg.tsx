export function SchemaOrg({ locale }: { locale: string }) {
  const isFr = locale === 'fr';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Dentist', 'LocalBusiness', 'MedicalBusiness'],
        '@id': 'https://centre-dentaire-plateau.com/#organization',
        name: 'Centre Dentaire du Plateau',
        alternateName: 'Clinique Dentaire Sérénité',
        url: 'https://centre-dentaire-plateau.com',
        logo: 'https://centre-dentaire-plateau.com/images/logo.png',
        image: 'https://centre-dentaire-plateau.com/images/clinic/interior.png',
        description: isFr
          ? 'Clinique dentaire haut de gamme au Plateau Mont-Royal. Implants, esthétique, orthodontie invisible et soins préventifs dans une atmosphère apaisante.'
          : 'Premium dental clinic in Plateau Mont-Royal. Implants, cosmetics, invisible orthodontics and preventive care in a soothing atmosphere.',
        telephone: '+1-514-123-4567',
        email: 'info@centre-dentaire-plateau.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1357 Avenue Mont-Royal',
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
        areaServed: {
          '@type': 'City',
          name: 'Montréal',
        },
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
          name: 'Dr. Jean Aris',
          jobTitle: isFr ? 'Fondateur & Implantologue' : 'Founder & Implantologist',
        },
        employee: [
          {
            '@type': 'Dentist',
            name: 'Dr. Jean Aris',
            jobTitle: isFr ? 'Fondateur & Implantologie' : 'Founder & Implantology',
            image: 'https://centre-dentaire-plateau.com/images/team/dr-aris.png',
          },
          {
            '@type': 'Dentist',
            name: 'Dr. Sophie Chen',
            jobTitle: isFr ? 'Orthodontie Invisible' : 'Invisible Orthodontics',
            image: 'https://centre-dentaire-plateau.com/images/team/dr-chen.png',
          },
          {
            '@type': 'Dentist',
            name: 'Dr. Marc Laurent',
            jobTitle: isFr ? 'Chirurgie Orale' : 'Oral Surgery',
            image: 'https://centre-dentaire-plateau.com/images/team/dr-laurent.png',
          },
          {
            '@type': 'Dentist',
            name: 'Dr. Léa Martin',
            jobTitle: isFr ? 'Pédodontie & Prévention' : 'Pedodontics & Prevention',
            image: 'https://centre-dentaire-plateau.com/images/team/dr-martin.png',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://centre-dentaire-plateau.com/#website',
        url: 'https://centre-dentaire-plateau.com',
        name: 'Centre Dentaire du Plateau',
        inLanguage: [locale],
        publisher: {
          '@id': 'https://centre-dentaire-plateau.com/#organization',
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

// frontend/components/SchemaOrgLocalBusiness.tsx

export function SchemaOrgLocalBusiness() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": "https://www.gentlemenbarber.ru/#organization",
    name: "Джентльмены Культуры",
    alternateName: "Gentlemen Barbershop Club",
    description:
      "Премиальный барбершоп-клуб в Нижнем Новгороде. Мужские стрижки, борода, ночной формат. Только по записи.",
    url: "https://www.gentlemenbarber.ru",
    telephone: "+79877553000",
    priceRange: "₽₽",
    image: "https://www.gentlemenbarber.ru/og-image.jpg",
    logo: "https://www.gentlemenbarber.ru/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Белозёрская улица, 4",
      addressLocality: "Нижний Новгород",
      addressRegion: "Нижегородская область",
      postalCode: "603016",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 56.348966,
      longitude: 43.875272,
    },
    hasMap:
      "https://yandex.ru/maps/org/dzhentlmeny_kultury/101569682800/",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
    ],
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, Credit Card",
    areaServed: {
      "@type": "City",
      name: "Нижний Новгород",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://vk.com/barbershop_gentlemen",
      "https://yandex.ru/maps/org/dzhentlmeny_kultury/101569682800/",
      "https://2gis.ru/n_novgorod/firm/70000001080133566",
      "https://zoon.ru/nn/beauty/barbershop_dzhentlmeny_kultury/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

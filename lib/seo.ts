import type { Metadata } from 'next';
import { FAQ_ITEMS, SERVICES, SITE_IMAGES, SITE_INFO, TESTIMONIALS } from './site-data';

export function getBaseUrl(): string {
  const raw = process.env.APP_URL;
  if (raw && raw.startsWith('http')) {
    return raw.replace(/\/+$/, '');
  }
  return 'https://hilaltesisat.com.tr';
}

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${options.path === '/' ? '' : options.path}`;

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url: canonicalUrl,
      siteName: SITE_INFO.brandName,
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}${SITE_IMAGES.heroVilla}`,
          width: 1280,
          height: 720,
          alt: 'Hilal Tesisat – Ankara Profesyonel Doğalgaz ve Sıhhi Tesisat Çözümleri',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description: options.description,
      images: [`${baseUrl}${SITE_IMAGES.heroVilla}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function buildLocalBusinessJsonLd(baseUrl = getBaseUrl()) {
  const avgRating =
    TESTIMONIALS.reduce((sum, item) => sum + item.rating, 0) / Math.max(1, TESTIMONIALS.length);

  return {
    '@context': 'https://schema.org',
    '@type': ['Plumber', 'HVACBusiness', 'LocalBusiness'],
    '@id': `${baseUrl}/#organization`,
    name: SITE_INFO.brandName,
    url: baseUrl,
    logo: `${baseUrl}${SITE_IMAGES.emblemMetal}`,
    image: `${baseUrl}${SITE_IMAGES.heroVilla}`,
    description:
      'Ankara Pursaklar merkezli doğalgaz projesi, kombi bakımı, ilaçlı petek temizliği, su arıtma ve kameralı tıkanıklık açma hizmetleri.',
    telephone: '+905550784418',
    email: SITE_INFO.email,
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Edebali Cd. No:78',
      addressLocality: 'Pursaklar',
      addressRegion: 'Ankara',
      postalCode: '06145',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.0384,
      longitude: 32.9022,
    },
    areaServed: SITE_INFO.serviceDistricts.map((district) => ({
      '@type': 'City',
      name: `${district}, Ankara`,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: TESTIMONIALS.length,
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hilal Tesisat Hizmet Kataloğu',
      itemListElement: SERVICES.map((svc) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: svc.title,
          description: svc.summary,
          url: `${baseUrl}/hizmetler#${svc.slug}`,
        },
      })),
    },
  };
}

export function buildFaqJsonLd(items = FAQ_ITEMS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  crumbs: { name: string; path: string }[],
  baseUrl = getBaseUrl(),
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };
}

import type { Metadata } from 'next';
import {
  FAQ_ITEMS,
  FIELD_VIDEOS,
  SERVICES,
  SITE_IMAGES,
  SITE_INFO,
  TESTIMONIALS,
} from './site-data';

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
    metadataBase: new URL(baseUrl),
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    authors: [{ name: SITE_INFO.brandName, url: baseUrl }],
    creator: SITE_INFO.brandName,
    publisher: SITE_INFO.brandName,
    category: 'Tesisat, Doğalgaz & Isıtma Mühendisliği',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'tr-TR': canonicalUrl,
      },
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
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
          alt: 'Hilal Tesisat – Ankara Pursaklar Doğalgaz, Kombi Bakımı ve Sıhhi Tesisat',
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
      nocache: false,
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
    alternateName: [
      'Hilal Teknik Servis',
      'Hilal Tesisat Ankara',
      'Hilal Tesisat Pursaklar',
      'Hilal Tesisat Saray Cumhuriyet',
    ],
    url: baseUrl,
    logo: `${baseUrl}${SITE_IMAGES.emblemMetal}`,
    image: [
      `${baseUrl}${SITE_IMAGES.heroVilla}`,
      `${baseUrl}${SITE_IMAGES.bannerHeating}`,
      `${baseUrl}${SITE_IMAGES.bannerGas}`,
    ],
    description:
      'Hilal Tesisat: Ankara Pursaklar Saray Cumhuriyet merkezli Başkentgaz yetkili doğalgaz projesi, kombi bakımı, ilaçlı petek temizliği, su arıtma ve 7/24 kameralı tıkanıklık açma.',
    telephone: '+905350784418',
    email: SITE_INFO.email,
    priceRange: '₺₺',
    currenciesAccepted: 'TRY',
    paymentAccepted: 'Nakit, Kredi Kartı, Havale/EFT',
    hasMap: SITE_INFO.googleMapsUrl,
    sameAs: [SITE_INFO.instagramCanonicalUrl, SITE_INFO.googleMapsUrl],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Saray Cumhuriyet, Edebali Sk. 7 B',
      addressLocality: 'Pursaklar',
      addressRegion: 'Ankara',
      postalCode: '06146',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_INFO.coordinates.lat,
      longitude: SITE_INFO.coordinates.lng,
    },
    areaServed: SITE_INFO.serviceDistricts.map((district) => ({
      '@type': 'City',
      name: `${district}, Ankara`,
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+905350784418',
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: ['Turkish'],
        hoursAvailable: {
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
      },
    ],
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
    review: TESTIMONIALS.slice(0, 3).map((item) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: item.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(item.rating),
        bestRating: '5',
      },
      reviewBody: item.quote,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hilal Tesisat Hizmet Kataloğu',
      itemListElement: SERVICES.map((svc) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: svc.title,
          description: svc.summary,
          areaServed: 'Ankara',
          url: `${baseUrl}/hizmetler#${svc.slug}`,
        },
      })),
    },
  };
}

export function buildWebSiteJsonLd(baseUrl = getBaseUrl()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: SITE_INFO.brandName,
    alternateName: 'Hilal Tesisat Ankara Pursaklar',
    inLanguage: 'tr-TR',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  };
}

export function buildVideoGalleryJsonLd(baseUrl = getBaseUrl()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hilal Tesisat Gerçek Saha Uygulama Videoları',
    itemListElement: FIELD_VIDEOS.map((video, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'VideoObject',
        name: `${video.title} | Hilal Tesisat`,
        description: video.description,
        thumbnailUrl: `${baseUrl}${video.poster}`,
        contentUrl: `${baseUrl}${video.src}`,
        uploadDate: '2026-11-15T09:00:00+03:00',
        inLanguage: 'tr-TR',
        publisher: {
          '@type': 'Organization',
          name: SITE_INFO.brandName,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}${SITE_IMAGES.emblemMetal}`,
          },
        },
      },
    })),
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

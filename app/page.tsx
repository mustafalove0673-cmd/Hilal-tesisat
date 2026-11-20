import React from 'react';
import { HomeLanding } from '@/components/HomeLanding';
import { buildFaqJsonLd, buildVideoGalleryJsonLd } from '@/lib/seo';

export default function HomePage() {
  const videoGallerySchema = buildVideoGalleryJsonLd();
  const faqSchema = buildFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeLanding />
    </>
  );
}

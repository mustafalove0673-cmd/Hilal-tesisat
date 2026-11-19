import React from 'react';
import type { Metadata } from 'next';
import { buildFaqJsonLd, buildPageMetadata } from '@/lib/seo';
import { SITE_IMAGES } from '@/lib/site-data';
import { SubpageShell } from '@/components/SubpageShell';
import { FaqAccordion } from '@/components/FaqAccordion';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sıkça Sorulan Sorular (SSS) | Hilal Tesisat',
  description:
    'Kombi bakımı, ilaçlı petek temizliği, Başkentgaz doğalgaz proje süreci, su kaçağı tespiti ve garanti koşulları hakkında sıkça sorulan sorular.',
  path: '/sss',
});

export default function SssPage() {
  const faqSchema = buildFaqJsonLd();

  return (
    <SubpageShell
      eyebrow="Bilgi Merkezi"
      title="Sıkça Sorulan Sorular"
      description="Tesisat, kombi bakımı, doğalgaz projelendirme ve garanti süreçlerimizle ilgili en çok merak edilen soruları yanıtladık."
      heroImage={SITE_IMAGES.bannerWater}
      heroImageAlt="Hilal Tesisat Modern Banyo ve Sıhhi Tesisat Çözümleri"
      heroMetricValue="Aynı Gün Yanıt"
      heroMetricLabel="Garanti & Mevzuat Rehberi"
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Sıkça Sorulan Sorular', path: '/sss' },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqAccordion />
    </SubpageShell>
  );
}

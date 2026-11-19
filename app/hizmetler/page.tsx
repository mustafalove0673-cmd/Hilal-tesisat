import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_IMAGES } from '@/lib/site-data';
import { SubpageShell } from '@/components/SubpageShell';
import { ServicesExplorer } from '@/components/ServicesExplorer';

export const metadata: Metadata = buildPageMetadata({
  title: 'Hizmetlerimiz | Hilal Tesisat – Kombi, Petek, Doğalgaz & Sıhhi Tesisat',
  description:
    'Kombi bakımı, ilaçlı petek temizliği, Başkentgaz onaylı doğalgaz projesi, su arıtma cihazları ve kırmadan tıkanıklık açma hizmetlerimiz.',
  path: '/hizmetler',
  keywords: [
    'kombi bakımı Ankara',
    'petek temizliği Pursaklar',
    'doğalgaz proje çizimi Ankara',
    'su arıtma cihazı servisi',
    'kameralı tıkanıklık açma',
  ],
});

export default function HizmetlerPage() {
  return (
    <SubpageShell
      eyebrow="Mühendislik & Saha Hizmetleri"
      title="Profesyonel Tesisat Hizmetleri"
      description="Ankara geneli konut, villa ve ticari işletmeler için garantili ısıtma, doğalgaz mühendisliği, su arıtma ve sıhhi tesisat çözümleri."
      heroImage={SITE_IMAGES.bannerHeating}
      heroImageAlt="Hilal Tesisat Modern Yoğuşmalı Kombi ve Bakır Kollektör Mekanik Odası"
      heroMetricValue="8 Uzman Çözüm"
      heroMetricLabel="TSE & Başkentgaz Onaylı"
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Hizmetler', path: '/hizmetler' },
      ]}
    >
      <ServicesExplorer />
    </SubpageShell>
  );
}

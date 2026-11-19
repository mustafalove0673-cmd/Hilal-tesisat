import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_IMAGES } from '@/lib/site-data';
import { SubpageShell } from '@/components/SubpageShell';
import { ProjectsGallery } from '@/components/ProjectsGallery';

export const metadata: Metadata = buildPageMetadata({
  title: 'Projelerimiz | Hilal Tesisat – Ankara Referans Uygulamalar',
  description:
    'Ankara Pursaklar, Çankaya, Oran ve Keçiören bölgelerinde tamamladığımız villa mekanik tesisatı, yerden ısıtma ve doğalgaz projeleri.',
  path: '/projelerimiz',
});

export default function ProjelerimizPage() {
  return (
    <SubpageShell
      eyebrow="Tamamlanan Referanslar"
      title="Gerçekleştirdiğimiz Özel Projeler"
      description="Konut, villa ve ticari yapılarda estetik, enerji tasarrufu ve yüksek mühendislik güvenliğini bir araya getiren seçkin uygulamalarımız."
      heroImage={SITE_IMAGES.projectVillaExterior}
      heroImageAlt="Hilal Tesisat Ankara Modern Villa Mekanik ve Doğalgaz Uygulaması"
      heroMetricValue="1000+ Proje"
      heroMetricLabel="40 Bar Basınç Testi Onaylı"
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Projelerimiz', path: '/projelerimiz' },
      ]}
    >
      <ProjectsGallery />
    </SubpageShell>
  );
}

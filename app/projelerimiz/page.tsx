import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
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
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Projelerimiz', path: '/projelerimiz' },
      ]}
    >
      <ProjectsGallery />
    </SubpageShell>
  );
}

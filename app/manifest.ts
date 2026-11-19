import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hilal Tesisat – Profesyonel Tesisat & Doğalgaz Çözümleri',
    short_name: 'Hilal Tesisat',
    description:
      'Ankara Pursaklar merkezli doğalgaz projesi, kombi bakımı, petek temizliği, su arıtma ve sıhhi tesisat hizmetleri.',
    start_url: '/',
    display: 'standalone',
    background_color: '#EFECE9',
    theme_color: '#4A0D13',
    lang: 'tr',
    icons: [
      {
        src: '/images/emblem_crescent_metal_1795098583546.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}

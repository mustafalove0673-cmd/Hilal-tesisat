import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/hizmetler', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/projelerimiz', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/kurumsal', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/sss', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/iletisim', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/yasal/kvkk', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/yasal/gizlilik-politikasi', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/yasal/kullanim-sartlari', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/yasal/cerez-politikasi', priority: 0.4, changeFrequency: 'yearly' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

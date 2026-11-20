import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import {
  buildLocalBusinessJsonLd,
  buildPageMetadata,
  buildWebSiteJsonLd,
} from '@/lib/seo';
import { MotionShell, ScrollProgressBar } from '@/components/MotionPrimitives';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { FloatingContactActions } from '@/components/FloatingContactActions';
import { FloatingLiveLocationMap } from '@/components/FloatingLiveLocationMap';
import { LocationProvider } from '@/components/LocationProvider';

const displayFont = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = buildPageMetadata({
  title: 'Hilal Tesisat – Pursaklar Ankara Doğalgaz, Kombi & Sıhhi Tesisat',
  description:
    'Hilal Tesisat: Saray Cumhuriyet Pursaklar Ankara merkezli 7/24 doğalgaz projesi, kombi bakımı, ilaçlı petek temizliği, su arıtma ve tıkanıklık açma. Tel: 0535 078 44 18.',
  path: '/',
  keywords: [
    'Hilal Tesisat',
    'Hilal Teknik Servis',
    'Hilal Tesisat Pursaklar',
    'Hilal Tesisat Ankara',
    'Saray Cumhuriyet tesisatçı',
    'Pursaklar doğalgaz tesisat',
    'Ankara kombi bakımı',
    'Ankara ilaçlı petek temizliği',
    'Başkentgaz yetkili doğalgaz firması',
    'Pursaklar su arıtma montajı',
    'kırmadan su kaçağı tespiti Ankara',
    'kameralı pis su tıkanıklığı açma',
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const businessSchema = buildLocalBusinessJsonLd();
  const websiteSchema = buildWebSiteJsonLd();

  return (
    <html
      lang="tr"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${sansFont.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#EFECE9] text-[#1B1817]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <MotionShell>
          <LocationProvider>
            <ScrollProgressBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
            <FloatingLiveLocationMap />
            <FloatingContactActions />
          </LocationProvider>
        </MotionShell>
      </body>
    </html>
  );
}

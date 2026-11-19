import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { buildLocalBusinessJsonLd, buildPageMetadata } from '@/lib/seo';
import { MotionShell, ScrollProgressBar } from '@/components/MotionPrimitives';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { FloatingContactActions } from '@/components/FloatingContactActions';

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
  title: 'Hilal Tesisat – Ankara Doğalgaz, Kombi Bakımı & Sıhhi Tesisat',
  description:
    'Ankara Pursaklar merkezli 7/24 doğalgaz projesi, kombi bakımı, petek temizliği, su arıtma ve kırmadan tıkanıklık açma çözümleri.',
  path: '/',
  keywords: [
    'Hilal Tesisat',
    'Ankara tesisatçı',
    'Pursaklar tesisat',
    'kombi bakımı Ankara',
    'petek temizliği Ankara',
    'Başkentgaz yetkili doğalgaz firması',
    'su arıtma cihazı montajı',
    'kırmadan su kaçağı tespiti',
    'pis su tıkanıklığı açma',
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const businessSchema = buildLocalBusinessJsonLd();

  return (
    <html lang="tr" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#EFECE9] text-[#1B1817]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <MotionShell>
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <FloatingContactActions />
        </MotionShell>
      </body>
    </html>
  );
}

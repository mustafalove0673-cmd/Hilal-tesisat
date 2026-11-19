import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo';
import { SubpageShell } from '@/components/SubpageShell';
import { ContactFormLoader } from '@/components/ContactFormLoader';
import { QuoteForm } from '@/components/QuoteForm';
import { SafeImage } from '@/components/SafeImage';
import { SITE_IMAGES, SITE_INFO } from '@/lib/site-data';

export const metadata: Metadata = buildPageMetadata({
  title: 'İletişim & Teklif Al | Hilal Tesisat – 7/24 Ankara Destek',
  description:
    'Hilal Tesisat ile 7/24 iletişime geçin, ücretsiz keşif ve fiyat teklifi alın. Edebali Cd. 78, Pursaklar / Ankara · +90 555 078 44 18.',
  path: '/iletisim',
});

export default function IletisimPage() {
  return (
    <SubpageShell
      eyebrow="7/24 Destek & Ücretsiz Keşif"
      title="Uzman Ekibimizle Hemen İletişime Geçin"
      description="Keşif randevusu, doğalgaz projesi, kombi bakımı veya acil su/gaz kaçağı desteği için formumuzu doldurun ya da telefon hattımızdan bize ulaşın."
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'İletişim', path: '/iletisim' },
      ]}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Direct Contact & 3D Phone Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#2B0509] via-[#4D0D14] to-[#1D0306] text-[#F8F5F2] p-7 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#C8A287]/35 shrink-0">
                  <SafeImage
                    src={SITE_IMAGES.phoneOrbital}
                    alt="Hilal Tesisat İletişim Hattı"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs text-[#C8A287]">Merkez Ofis & Acil Müdahale</span>
                  <h2 className="font-display text-2xl font-semibold text-white mt-0.5">
                    {SITE_INFO.brandName}
                  </h2>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/15">
                <a
                  href={SITE_INFO.phoneHref}
                  className="flex items-center gap-3.5 hover:text-[#E9D1C0] transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-white/10 border border-[#C8A287]/35 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#E9D1C0]" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-base font-semibold tabular-nums">
                      {SITE_INFO.phoneDisplay}
                    </div>
                    <div className="text-xs text-[#CBB8AE]">7/24 Acil Teknik Destek</div>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="flex items-center gap-3.5 hover:text-[#E9D1C0] transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-white/10 border border-[#C8A287]/35 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#E9D1C0]" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-base font-semibold">{SITE_INFO.email}</div>
                    <div className="text-xs text-[#CBB8AE]">Teklif & Kurumsal E-posta</div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-full bg-white/10 border border-[#C8A287]/35 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#E9D1C0]" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-base font-semibold">{SITE_INFO.addressLine1}</div>
                    <div className="text-xs text-[#CBB8AE]">{SITE_INFO.addressLine2}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap gap-4 text-xs text-[#DFD3CC]">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C8A287]" aria-hidden="true" />
                  30–45 Dk Ortalama Varış
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A287]" aria-hidden="true" />
                  Garantili İşçilik
                </span>
              </div>
            </div>
          </div>

          {/* Right: Validated Quote Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<QuoteForm />}>
              <ContactFormLoader />
            </Suspense>
          </div>
        </div>
      </div>
    </SubpageShell>
  );
}

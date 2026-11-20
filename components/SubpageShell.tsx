import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsappHref, SITE_IMAGES, SITE_INFO } from '@/lib/site-data';
import { buildBreadcrumbJsonLd } from '@/lib/seo';
import { SafeImage } from './SafeImage';
import { ArchitecturalMaskReveal, SilkRibbonParallax } from './MotionPrimitives';

interface SubpageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: { name: string; path: string }[];
  heroImage?: string;
  heroImageAlt?: string;
  heroMetricLabel?: string;
  heroMetricValue?: string;
  showContactBand?: boolean;
  children: React.ReactNode;
}

export function SubpageShell({
  eyebrow,
  title,
  description,
  breadcrumbs,
  heroImage = SITE_IMAGES.bannerHeating,
  heroImageAlt = 'Hilal Tesisat Modern Mühendislik Uygulaması',
  heroMetricLabel = '7/24 Ankara Teknik Destek',
  heroMetricValue = '15+ Yıl Deneyim',
  showContactBand = true,
  children,
}: SubpageShellProps) {
  const breadcrumbSchema = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="relative min-h-screen bg-[#EBE7E4] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Rich Atmospheric Silk Pearl & Burgundy Ribbon Canvas */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-45">
        <SafeImage
          src={SITE_IMAGES.pearlSilkBackdrop}
          alt=""
          className="w-full h-full object-cover object-center saturate-125 contrast-105"
        />
        <div className="absolute inset-0 bg-[#EBE7E4]/54" />
      </div>

      {/* Scroll-Driven Structural Silk Hairlines Positioned Strictly Below Hero Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[460px] sm:top-[520px] bottom-0 z-0 overflow-hidden"
      >
        <SilkRibbonParallax className="w-full h-full opacity-45" />
      </div>

      {/* Architectural Split Subpage Hero */}
      <section className="relative z-10 overflow-hidden pt-6 sm:pt-12 pb-10 sm:pb-16">
        {/* Top Atmospheric Backdrop */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <SafeImage
            src={SITE_IMAGES.pearlSilkBackdrop}
            alt=""
            className="w-full h-full object-cover object-right opacity-90 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#F3EEE9]/94 via-[#F3EEE9]/76 via-50% to-[#F3EEE9]/20" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#EBE7E4] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
          <nav
            aria-label="İçerik Haritası"
            className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#615855] mb-4 sm:mb-7"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.path}>
                  {idx > 0 ? (
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60" aria-hidden="true" />
                  ) : null}
                  {isLast ? (
                    <span className="font-semibold text-[#36080D]">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="hover:text-[#36080D] transition-colors">
                      {crumb.name}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-7 space-y-3 sm:space-y-5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="h-[1px] w-7 sm:w-10 bg-[#8C5B4D]" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#7A353B]">
                  {eyebrow}
                </span>
              </div>
              <ArchitecturalMaskReveal>
                <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.06] tracking-[-0.015em] text-[#1D1716] text-balance">
                  {title}
                </h1>
              </ArchitecturalMaskReveal>
              <p className="text-xs sm:text-base leading-relaxed text-[#453D3B] max-w-2xl">
                {description}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs font-medium text-[#4D1017]">
                <span>{heroMetricValue}</span>
                <span aria-hidden="true" className="text-[#9E8B84]">
                  ·
                </span>
                <span className="text-[#514946]">{heroMetricLabel}</span>
                <span aria-hidden="true" className="text-[#9E8B84]">
                  ·
                </span>
                <span className="text-[#514946]">Pursaklar & Tüm Ankara</span>
              </div>
            </div>

            {/* Organic Arched Architectural Hero Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-tl-[74px] rounded-bl-[52px] rounded-tr-[22px] rounded-br-[22px] sm:rounded-tl-[135px] sm:rounded-bl-[92px] sm:rounded-tr-[28px] sm:rounded-br-[28px] overflow-hidden border-2 border-white/85 shadow-[0_24px_55px_-22px_rgba(43,5,9,0.34)] aspect-[16/10] bg-[#D6CECA]">
                <SafeImage
                  src={heroImage}
                  alt={heroImageAlt}
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-[#260508]/25 via-transparent to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 pb-12 sm:pb-20">{children}</div>

      {/* Signature Sweeping Deep Burgundy S-Curve Band Anchoring Every Subpage */}
      {showContactBand ? (
        <section className="relative z-10 py-14 sm:py-20 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <svg viewBox="0 0 1440 380" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="subpageContactWave" x1="0" y1="0" x2="1" y2="0.4">
                  <stop offset="0%" stopColor="#2A0509" />
                  <stop offset="48%" stopColor="#521017" />
                  <stop offset="100%" stopColor="#210306" />
                </linearGradient>
              </defs>
              <path
                d="M0,18 C360,82 840,-16 1440,52 L1440,336 C1020,382 460,284 0,352 Z"
                fill="url(#subpageContactWave)"
              />
              <path
                d="M0,30 C380,94 860,-4 1440,64"
                fill="none"
                stroke="#C8A287"
                strokeWidth="1.5"
                opacity="0.55"
              />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8 text-[#F8F5F2]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
              <div className="lg:col-span-6 space-y-2.5 sm:space-y-4">
                <span className="text-[11px] sm:text-xs font-medium text-[#E5CFC1]">
                  Ücretsiz Keşif & Acil Destek
                </span>
                <h2 className="font-display text-2xl sm:text-[34px] font-semibold leading-[1.12] text-white text-balance">
                  Ankara Geneli 7/24 Uzman Ekip Desteği
                </h2>
                <p className="text-xs sm:text-sm text-[#DFD3CC] leading-relaxed max-w-lg">
                  Doğalgaz projesi, kombi bakımı, ilaçlı petek temizliği ve su kaçağı tespiti için
                  ücretsiz keşif randevusu oluşturun.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 rounded-full bg-[#F8F5F2] text-[#2A060A] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold shadow-lg hover:bg-white transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    <span>Teklif & Keşif Formu</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={buildWhatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1C5D36] hover:bg-[#174D2C] border border-white/20 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={SITE_INFO.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full border border-[#C8A287]/55 bg-white/10 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-white/15 transition-colors tabular-nums whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E9D1C0]" aria-hidden="true" />
                    <span>{SITE_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="flex items-center gap-3 rounded-2xl bg-white/8 border border-white/15 p-3.5 sm:p-4 hover:bg-white/12 transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-[#C8A287]/45 text-[#E9D1C0] shrink-0">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-white truncate">
                      {SITE_INFO.email}
                    </div>
                    <div className="text-[11px] text-[#CBB8AE]">Kurumsal Teklif Hattı</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-2xl bg-white/8 border border-white/15 p-3.5 sm:p-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-[#C8A287]/45 text-[#E9D1C0] shrink-0">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      {SITE_INFO.addressLine1}
                    </div>
                    <div className="text-[11px] text-[#CBB8AE]">{SITE_INFO.addressLine2}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}


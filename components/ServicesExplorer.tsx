'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Clock, ShieldCheck, X } from 'lucide-react';
import {
  SERVICES,
  SERVICE_CATEGORY_SHOWCASES,
  type ServiceCategory,
  type ServiceItem,
} from '@/lib/site-data';
import { SafeImage } from './SafeImage';
import { AwwwardsFadeUpCard, EASE_LUXURY } from './MotionPrimitives';
import { computeStaggeredRevealDelay } from '@/lib/awwwards-motion';

const CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: 'tumu', label: 'Tüm Hizmetler' },
  { id: 'isitma', label: 'Isıtma Sistemleri' },
  { id: 'dogalgaz', label: 'Doğalgaz Mühendislik' },
  { id: 'su-tesisat', label: 'Su & Sıhhi Tesisat' },
];

export function ServicesExplorer() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('tumu');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filtered =
    activeCategory === 'tumu'
      ? SERVICES
      : SERVICES.filter((svc) => svc.category === activeCategory);

  const showcase = SERVICE_CATEGORY_SHOWCASES[activeCategory];

  return (
    <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      {/* Category Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Hizmet kategorileri"
          className="inline-flex flex-wrap items-center gap-1 rounded-2xl bg-white/85 border border-white p-1.5 shadow-[0_12px_30px_-14px_rgba(54,8,13,0.16)] backdrop-blur-md"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-[#4B4441] hover:text-[#1D1716]'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="service-tab-indicator"
                    transition={{ duration: 0.22, ease: EASE_LUXURY }}
                    className="absolute inset-0 rounded-xl burgundy-cta"
                  />
                ) : null}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-[#5E5451] tabular-nums">
          Gösterilen çözüm sayısı: <strong className="text-[#36080D]">{filtered.length}</strong>
        </p>
      </div>

      {/* Architectural Category Feature Banner (Transforms per Category!) */}
      <AnimatePresence mode="wait">
        <motion.section
          key={showcase.id}
          initial={{ opacity: 0.5, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.5, y: -6 }}
          transition={{ duration: 0.28, ease: EASE_LUXURY }}
          className="relative rounded-tl-[64px] rounded-br-[64px] rounded-tr-[24px] rounded-bl-[24px] sm:rounded-tl-[110px] sm:rounded-br-[110px] sm:rounded-tr-[32px] sm:rounded-bl-[32px] overflow-hidden shadow-[0_28px_70px_-24px_rgba(43,5,9,0.34)] border border-white/80 bg-[#23060A]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Full-Bleed Architectural Photograph */}
            <div className="lg:col-span-6 relative min-h-[210px] sm:min-h-[300px] lg:min-h-[340px] overflow-hidden">
              <SafeImage
                src={showcase.image}
                alt={showcase.headline}
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#2A0509] via-[#2A0509]/30 to-transparent"
              />
            </div>

            {/* Category Editorial Overview */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4 text-[#F8F5F2] bg-gradient-to-br from-[#2B0509] via-[#4A0D13] to-[#1D0306]">
              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-[#E5CFC1]">
                <span className="font-semibold text-[#C8A287]">{showcase.label}</span>
                <span aria-hidden="true">·</span>
                <span>{showcase.standardNote}</span>
                <span aria-hidden="true">·</span>
                <span>{showcase.responseNote}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-semibold leading-[1.12] text-white text-balance">
                {showcase.headline}
              </h2>
              <p className="text-xs sm:text-sm text-[#DFD3CC] leading-relaxed">
                {showcase.description}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/#iletisim"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F8F5F2] text-[#2A060A] px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-md hover:bg-white transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <span>Bu Kategori İçin Keşif Al</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Editorial Asymmetric Service Showcase Panels (Zero Plain Grey Square Cards!) */}
      <div className="space-y-6 sm:space-y-8">
        {filtered.map((svc, idx) => {
          const isEven = idx % 2 === 0;
          const numPrefix = String(idx + 1).padStart(2, '0');

          return (
            <AwwwardsFadeUpCard
              as="article"
              key={`${activeCategory}-${svc.slug}`}
              id={svc.slug}
              testId="service-explorer-card"
              trigger={activeCategory === 'tumu' ? 'inView' : 'immediate'}
              delay={computeStaggeredRevealDelay(idx, 1, 0.06, 0.24)}
              y={38}
              duration={0.72}
              className="pearl-glass rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* Floating Sculpted Hardware Showcase Stage */}
              <div
                className={`lg:col-span-5 relative flex items-center justify-center p-6 sm:p-10 bg-gradient-to-br from-[#F9F6F4] via-[#EFEAE6] to-[#E4DBD5] ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.92)_0%,transparent_72%)]"
                />
                <div className="relative z-10 w-full max-w-[270px] aspect-[4/3] flex items-center justify-center">
                  <SafeImage
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-contain mix-blend-multiply contrast-[1.06] saturate-[1.10] [mask-image:radial-gradient(closest-side,black_58%,transparent_94%)]"
                  />
                </div>
              </div>

              {/* Technical Copy & Deliverables */}
              <div
                className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-5 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B625E]">
                    <span className="font-semibold text-[#7A353B]">{svc.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{svc.responseTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{svc.warranty}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1D1716] leading-[1.15] text-balance">
                    <span className="text-[#8C5B4D] mr-2 tabular-nums">{numPrefix}.</span>
                    {svc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#423B39] leading-relaxed">{svc.summary}</p>
                  <p className="text-xs text-[#5E5451] leading-relaxed">{svc.details}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-[#E2DAD3]">
                    {svc.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#342D2B]">
                        <Check
                          className="w-3.5 h-3.5 text-[#4A0D13] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E2DAD3]">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[#36080D]">
                    {svc.standards.map((std, sIdx) => (
                      <React.Fragment key={std}>
                        {sIdx > 0 ? <span aria-hidden="true">·</span> : null}
                        <span>{std}</span>
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedService(svc)}
                      className="rounded-full bg-white/90 border border-[#D4CBC4] px-4 py-2 text-xs font-semibold text-[#2A1F1D] hover:border-[#4A0D13] hover:text-[#4A0D13] transition-colors whitespace-nowrap"
                    >
                      Teknik Detay
                    </button>
                    <Link
                      href="/#iletisim"
                      className="inline-flex items-center gap-2 rounded-full burgundy-cta px-5 py-2 text-xs font-medium text-white whitespace-nowrap"
                    >
                      <span>Teklif Al</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </AwwwardsFadeUpCard>
          );
        })}
      </div>

      {/* Technical Detail Quick Modal */}
      <AnimatePresence>
        {selectedService ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="services-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: EASE_LUXURY }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl bg-[#F7F5F3] border border-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-[#7A353B]">
                    {selectedService.categoryLabel} · {selectedService.responseTime}
                  </span>
                  <h3
                    id="services-modal-title"
                    className="font-display text-2xl sm:text-3xl font-semibold text-[#1D1716] mt-1"
                  >
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Teknik detayı kapat"
                  onClick={() => setSelectedService(null)}
                  className="w-9 h-9 rounded-full bg-white border border-[#D8CFC9] flex items-center justify-center text-[#1D1716] hover:bg-[#EAE4DF]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                <div className="sm:col-span-5 rounded-2xl bg-gradient-to-br from-[#F9F6F4] to-[#E9E2DC] p-4 aspect-square flex items-center justify-center">
                  <SafeImage
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-contain mix-blend-multiply brightness-[1.09]"
                  />
                </div>
                <div className="sm:col-span-7 space-y-3">
                  <p className="text-sm text-[#423B39] leading-relaxed">{selectedService.details}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-[#36080D] font-medium pt-1">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                      {selectedService.warranty}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {selectedService.responseTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E1D9D3] flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/#iletisim"
                  className="inline-flex items-center gap-2 rounded-full burgundy-cta px-6 py-2.5 text-sm font-medium text-white"
                >
                  <span>Ücretsiz Keşif & Teklif Al</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="text-xs font-semibold text-[#5A5350] hover:text-[#1D1716]"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

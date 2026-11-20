'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, Instagram, MapPin } from 'lucide-react';
import { PROJECTS, SITE_INFO, type ProjectItem } from '@/lib/site-data';
import { SafeImage } from './SafeImage';
import { EASE_LUXURY } from './MotionPrimitives';

const PROJECT_FILTERS: ('Tümü' | ProjectItem['category'])[] = [
  'Tümü',
  'Villa & Konut',
  'Isıtma Sistemleri',
  'Banyo & Sıhhi',
  'Ticari Proje',
];

function getProjectCardDelay(index: number): number {
  const colDelay = (index % 2) * 0.085;
  const rowDelay = Math.floor(index / 2) * 0.055;
  return Math.min(colDelay + rowDelay, 0.28);
}

export function ProjectsGallery() {
  const [filter, setFilter] = useState<'Tümü' | ProjectItem['category']>('Tümü');
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const items = filter === 'Tümü' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const safeFeatured = items[featuredIdx] ?? items[0] ?? PROJECTS[0];

  return (
    <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
      {/* Category Segmented Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Proje kategorileri"
          className="inline-flex flex-wrap items-center gap-1 rounded-2xl bg-white/85 border border-white p-1.5 shadow-[0_12px_30px_-14px_rgba(54,8,13,0.16)] backdrop-blur-md"
        >
          {PROJECT_FILTERS.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(cat);
                  setFeaturedIdx(0);
                }}
                className={`relative px-3.5 py-2 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                  active ? 'text-white' : 'text-[#4B4441] hover:text-[#1D1716]'
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="project-tab-indicator"
                    transition={{ duration: 0.22, ease: EASE_LUXURY }}
                    className="absolute inset-0 rounded-xl burgundy-cta"
                  />
                ) : null}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-[#5E5451] tabular-nums">
          Referans proje sayısı: <strong className="text-[#36080D]">{items.length}</strong>
        </p>
      </div>

      {/* Empty Filter State */}
      {items.length === 0 ? (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE_LUXURY }}
          className="pearl-glass rounded-3xl p-8 sm:p-12 text-center space-y-4"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1D1716]">
            Bu Kategoride Yeni Referanslar Hazırlanıyor
          </h2>
          <p className="text-xs sm:text-sm text-[#4B4441] max-w-lg mx-auto leading-relaxed">
            Ticari kazan dairesi, otel ve mağaza doğalgaz/mekanik tesisat referanslarımızı keşif
            görüşmesinde yerinde sunuyoruz.
          </p>
          <div className="pt-1 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setFilter('Tümü')}
              className="rounded-full bg-white border border-[#D4CBC4] px-5 py-2 text-xs font-semibold text-[#2A1F1D]"
            >
              Tüm Projeleri Göster
            </button>
            <Link
              href="/#iletisim"
              className="inline-flex items-center gap-2 rounded-full burgundy-cta px-5 py-2 text-xs font-medium text-white"
            >
              <span>Ticari Proje Teklifi Al</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Flagship Arched Spotlight Showcase with Subtle Viewport Reveal */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.62, ease: EASE_LUXURY }}
          >
            <AnimatePresence mode="wait">
              <motion.section
                key={safeFeatured.id}
                initial={prefersReducedMotion ? false : { opacity: 0.55, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0.55, y: -6 }}
                transition={{ duration: 0.28, ease: EASE_LUXURY }}
                className="pearl-glass rounded-3xl p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center"
              >
                <div className="lg:col-span-7">
                  <div className="relative rounded-tl-[76px] rounded-bl-[54px] rounded-tr-[22px] rounded-br-[22px] sm:rounded-tl-[145px] sm:rounded-bl-[95px] sm:rounded-tr-[32px] sm:rounded-br-[32px] overflow-hidden border-2 border-white shadow-[0_24px_55px_-22px_rgba(38,12,14,0.34)] aspect-[16/10] bg-[#23191A]">
                    <SafeImage
                      src={safeFeatured.image}
                      alt={safeFeatured.title}
                      className="w-full h-full object-cover"
                    />
                    <a
                      href={SITE_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Projelerimizi Instagram'da incele: ${SITE_INFO.instagramHandle}`}
                      className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#4A0915]/78 hover:bg-[#9E162C] border border-[#E9D1C0]/45 px-3 py-1.5 text-[11px] font-medium text-[#FAF5F0] backdrop-blur-md shadow-lg transition-all hover:scale-[1.03]"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#F3D9C7]" aria-hidden="true" />
                      <span>{SITE_INFO.instagramHandle}</span>
                    </a>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                    />
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white/95">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#E5CFC1]" aria-hidden="true" />
                        {safeFeatured.location}
                      </span>
                      <span className="tabular-nums font-medium">{safeFeatured.year}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#7A353B] font-semibold">
                    <span>Öne Çıkan Uygulama</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#5E5451] font-medium">{safeFeatured.category}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-semibold leading-[1.12] text-[#1D1716] text-balance">
                    {safeFeatured.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B4441] leading-relaxed">
                    {safeFeatured.description}
                  </p>

                  <div className="pt-2 border-t border-[#E1D9D3] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold text-[#36080D] tabular-nums">
                    {safeFeatured.metrics.map((m, idx) => (
                      <React.Fragment key={m}>
                        {idx > 0 ? <span aria-hidden="true">·</span> : null}
                        <span>{m}</span>
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2.5">
                    <Link
                      href="/#iletisim"
                      className="inline-flex items-center gap-2 rounded-full burgundy-cta px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white whitespace-nowrap"
                    >
                      <span>Benzer Proje Teklifi Al</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={SITE_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#B81B35]/30 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#9E162C] hover:bg-[#9E162C] hover:text-white transition-colors whitespace-nowrap"
                    >
                      <Instagram className="w-4 h-4" aria-hidden="true" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </motion.section>
            </AnimatePresence>
          </motion.div>

          {/* Editorial Asymmetric Project Cards Grid with Staggered Viewport Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {items.map((proj, idx) => {
              const isSelected = proj.id === safeFeatured.id;
              const revealDelay = getProjectCardDelay(idx);

              return (
                <motion.article
                  key={`${filter}-${proj.id}`}
                  data-testid="project-card"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 24, scale: 0.985 }
                  }
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.58,
                    delay: revealDelay,
                    ease: EASE_LUXURY,
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -4,
                          transition: { duration: 0.24, ease: EASE_LUXURY },
                        }
                  }
                  className={`group rounded-3xl overflow-hidden transition-colors duration-200 flex flex-col justify-between will-change-transform ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#5E0C1B] via-[#8D1428] to-[#470914] text-[#F8F5F2] shadow-2xl border border-[#DFBCA3]/35'
                      : 'pearl-glass text-[#1D1716]'
                  }`}
                >
                  <div>
                    <div className="relative aspect-[16/9.5] overflow-hidden">
                      <motion.div
                        initial={prefersReducedMotion ? false : { scale: 1.05 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                          duration: 0.78,
                          delay: revealDelay,
                          ease: EASE_LUXURY,
                        }}
                        className="w-full h-full will-change-transform"
                      >
                        <SafeImage
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </motion.div>
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                      />
                      <a
                        href={SITE_INFO.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${proj.title} — Instagram'da gör`}
                        className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#4A0915]/75 hover:bg-[#9E162C] border border-[#E9D1C0]/40 px-2.5 py-1 text-[10.5px] font-medium text-[#FAF5F0] backdrop-blur-md shadow-md transition-colors"
                      >
                        <Instagram className="w-3 h-3 text-[#F3D9C7]" aria-hidden="true" />
                        <span>{SITE_INFO.instagramHandle}</span>
                      </a>
                      <div className="absolute bottom-3.5 left-5 right-5 flex items-center justify-between text-xs text-white/95">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#E5CFC1]" aria-hidden="true" />
                          {proj.location}
                        </span>
                        <span className="tabular-nums">{proj.year}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 space-y-2.5">
                      <div
                        className={`text-xs font-semibold ${
                          isSelected ? 'text-[#E9D1C0]' : 'text-[#A81830]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}. {proj.category}
                      </div>
                      <h3
                        className={`font-display text-2xl font-semibold leading-snug ${
                          isSelected ? 'text-white' : 'text-[#1D1716]'
                        }`}
                      >
                        {proj.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isSelected ? 'text-[#DFD3CC]' : 'text-[#4B4441]'
                        }`}
                      >
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`px-6 sm:px-7 pb-6 pt-3 border-t flex flex-wrap items-center justify-between gap-3 ${
                      isSelected ? 'border-white/15' : 'border-[#E1D9D3]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setFeaturedIdx(idx)}
                      className={`text-xs font-semibold underline-offset-4 hover:underline ${
                        isSelected ? 'text-[#E9D1C0]' : 'text-[#4A0D13]'
                      }`}
                    >
                      {isSelected ? 'Üst Vitrinde Seçili' : 'Üst Vitrinde İncele'}
                    </button>

                    <Link
                      href="/#iletisim"
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap ${
                        isSelected
                          ? 'text-white hover:text-[#E9D1C0]'
                          : 'text-[#36080D] hover:underline'
                      }`}
                    >
                      <span>Keşif Talep Et</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

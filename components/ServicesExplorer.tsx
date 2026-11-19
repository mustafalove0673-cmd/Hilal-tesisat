'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Check, Clock, ShieldCheck } from 'lucide-react';
import { SERVICES, type ServiceCategory } from '@/lib/site-data';
import { SafeImage } from './SafeImage';
import { EASE_LUXURY } from './MotionPrimitives';

const CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: 'tumu', label: 'Tüm Hizmetler' },
  { id: 'isitma', label: 'Isıtma Sistemleri' },
  { id: 'dogalgaz', label: 'Doğalgaz Mühendislik' },
  { id: 'su-tesisat', label: 'Su & Sıhhi Tesisat' },
];

export function ServicesExplorer() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('tumu');

  const filtered =
    activeCategory === 'tumu'
      ? SERVICES
      : SERVICES.filter((svc) => svc.category === activeCategory);

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Hizmet kategorileri"
        className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl bg-white/75 border border-[#DDD4CE] p-1.5 backdrop-blur-md"
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
              className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${
                isActive ? 'text-white' : 'text-[#4B4441] hover:text-[#1D1716]'
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="service-tab-indicator"
                  transition={{ duration: 0.22, ease: EASE_LUXURY }}
                  className="absolute inset-0 rounded-xl burgundy-cta -z-0"
                />
              ) : null}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filtered.map((svc) => (
          <article
            key={svc.slug}
            id={svc.slug}
            className="pearl-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white/70 border border-white flex items-center justify-center p-2 shrink-0">
                  <SafeImage
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B625E]">
                    <span className="font-semibold text-[#7A353B]">{svc.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{svc.responseTime}</span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-[#1D1716] leading-snug">
                    {svc.title}
                  </h2>
                  <p className="text-sm text-[#4B4441] leading-relaxed">{svc.summary}</p>
                </div>
              </div>

              <p className="text-xs sm:text-[13.5px] text-[#57504D] leading-relaxed border-t border-[#E1D9D3] pt-4">
                {svc.details}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {svc.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-[#3D3633]">
                    <Check className="w-3.5 h-3.5 text-[#4A0D13] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E1D9D3]">
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#36080D]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  {svc.warranty}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {svc.responseTime}
                </span>
              </div>

              <Link
                href={`/iletisim?hizmet=${svc.slug}`}
                className="inline-flex items-center gap-2 rounded-full burgundy-cta px-5 py-2.5 text-xs font-medium text-white whitespace-nowrap"
              >
                <span>Teklif Al</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

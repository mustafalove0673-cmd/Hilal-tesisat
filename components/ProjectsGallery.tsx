'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '@/lib/site-data';
import { SafeImage } from './SafeImage';

const PROJECT_FILTERS: ('Tümü' | ProjectItem['category'])[] = [
  'Tümü',
  'Villa & Konut',
  'Isıtma Sistemleri',
  'Banyo & Sıhhi',
  'Ticari Proje',
];

export function ProjectsGallery() {
  const [filter, setFilter] = useState<'Tümü' | ProjectItem['category']>('Tümü');

  const items = filter === 'Tümü' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-wrap items-center gap-2">
        {PROJECT_FILTERS.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                active
                  ? 'burgundy-cta text-white'
                  : 'bg-white/80 border border-[#D8CFC9] text-[#4B4441] hover:text-[#1D1716]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((proj) => (
          <article
            key={proj.id}
            className="pearl-glass rounded-3xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#23191A] relative">
                <SafeImage
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/95">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E5CFC1]" aria-hidden="true" />
                    {proj.location}
                  </span>
                  <span className="tabular-nums">{proj.year}</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-3">
                <div className="text-xs font-semibold text-[#7A353B]">{proj.category}</div>
                <h2 className="font-display text-2xl font-semibold text-[#1D1716] leading-snug">
                  {proj.title}
                </h2>
                <p className="text-sm text-[#4B4441] leading-relaxed">{proj.description}</p>
              </div>
            </div>

            <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#E1D9D3] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#36080D] tabular-nums">
                {proj.metrics.map((m, idx) => (
                  <React.Fragment key={m}>
                    {idx > 0 ? <span aria-hidden="true">·</span> : null}
                    <span>{m}</span>
                  </React.Fragment>
                ))}
              </div>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A0D13] hover:underline whitespace-nowrap"
              >
                <span>Benzer Proje Teklifi Al</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

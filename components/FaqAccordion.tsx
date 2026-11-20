'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, Phone, Search } from 'lucide-react';
import { FAQ_ITEMS, SITE_IMAGES, SITE_INFO } from '@/lib/site-data';
import { EASE_LUXURY } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

export function FaqAccordion() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const categories = ['Tümü', ...Array.from(new Set(FAQ_ITEMS.map((item) => item.category)))];

  const normalizedQuery = query.trim().toLocaleLowerCase('tr-TR');
  const filtered = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'Tümü' || item.category === activeCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.question.toLocaleLowerCase('tr-TR').includes(normalizedQuery) ||
      item.answer.toLocaleLowerCase('tr-TR').includes(normalizedQuery) ||
      item.category.toLocaleLowerCase('tr-TR').includes(normalizedQuery)
    );
  });

  return (
    <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Sticky Visual Support & Topic Panel */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#5C0B1A] via-[#891327] to-[#460814] text-[#F8F5F2] shadow-2xl border border-[#DFBCA3]/35">
            <div className="aspect-[16/9] relative overflow-hidden">
              <SafeImage
                src={SITE_IMAGES.bannerHeating}
                alt="Hilal Tesisat Teknik Danışmanlık"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#5C0B1A] via-[#5C0B1A]/35 to-transparent"
              />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[11px] font-medium text-[#C8A287]">Doğrudan Uzman Desteği</span>
                <h2 className="font-display text-2xl font-semibold text-white mt-0.5">
                  Aradığınız Yanıtı Bulamadınız mı?
                </h2>
              </div>
              <p className="text-xs text-[#DFD3CC] leading-relaxed">
                Başkentgaz mevzuatı, yoğuşmalı kombi arıza kodları veya sıhhi tesisat keşfi için
                mühendis ve tekniker ekibimizi 7/24 arayabilirsiniz.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  href={SITE_INFO.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-[#F8F5F2] text-[#2A060A] px-4 py-2 text-xs font-semibold tabular-nums whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{SITE_INFO.phoneDisplay}</span>
                </a>
                <Link
                  href="/#iletisim"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#C8A287]/50 px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  <span>Soru İletin</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Search + Category Filter + Editorial Accordion */}
        <div className="lg:col-span-8 space-y-5">
          {/* Search Bar & Topic Chips */}
          <div className="pearl-glass rounded-3xl p-4 sm:p-5 space-y-4">
            <div className="relative">
              <label htmlFor="faq-search" className="sr-only">
                Soru veya konu ara
              </label>
              <Search
                className="w-4 h-4 text-[#6B625E] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Konu veya anahtar kelime ara (ör. kombi, petek, Başkentgaz, garanti)..."
                className="w-full rounded-2xl bg-white/95 border border-[#D4CBC4] pl-11 pr-4 py-3 text-xs sm:text-sm text-[#1D1716] placeholder:text-[#7D7470] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5E1119]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'burgundy-cta text-white'
                        : 'bg-white/80 text-[#4B4441] border border-[#DFD7D1] hover:text-[#1D1716]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion List */}
          {filtered.length === 0 ? (
            <div className="pearl-glass rounded-3xl p-8 text-center space-y-3">
              <p className="text-sm text-[#4B4441]">
                Aramanızla eşleşen bir soru bulunamadı. Uzman ekibimize doğrudan sorabilirsiniz.
              </p>
              <Link
                href="/#iletisim"
                className="inline-flex items-center gap-2 rounded-full burgundy-cta px-5 py-2.5 text-xs font-medium text-white"
              >
                <span>Bize Sorun</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="pearl-glass rounded-3xl divide-y divide-[#E3DBD5] overflow-hidden">
              {filtered.map((item, idx) => {
                const isOpen = openId === item.id;
                const num = String(idx + 1).padStart(2, '0');
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full text-left px-5 sm:px-7 py-5 flex items-center justify-between gap-4 hover:bg-white/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119]"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#A81830]">
                          <span className="tabular-nums">{num}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.category}</span>
                        </div>
                        <span className="font-display text-lg sm:text-xl font-semibold text-[#1D1716] block leading-snug">
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#9E162C] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.24, ease: EASE_LUXURY }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-7 pb-6 pt-1 text-xs sm:text-sm leading-relaxed text-[#423B39]">
                            {item.answer}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

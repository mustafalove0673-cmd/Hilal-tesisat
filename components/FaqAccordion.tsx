'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, Search } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/site-data';
import { EASE_LUXURY } from './MotionPrimitives';

export function FaqAccordion() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const normalizedQuery = query.trim().toLocaleLowerCase('tr-TR');
  const filtered = normalizedQuery
    ? FAQ_ITEMS.filter(
        (item) =>
          item.question.toLocaleLowerCase('tr-TR').includes(normalizedQuery) ||
          item.answer.toLocaleLowerCase('tr-TR').includes(normalizedQuery) ||
          item.category.toLocaleLowerCase('tr-TR').includes(normalizedQuery),
      )
    : FAQ_ITEMS;

  return (
    <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Search Input */}
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
          className="w-full rounded-2xl bg-white/85 border border-[#D4CBC4] pl-11 pr-4 py-3.5 text-sm text-[#1D1716] placeholder:text-[#7D7470] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5E1119]"
        />
      </div>

      {/* Accordion Items */}
      {filtered.length === 0 ? (
        <div className="pearl-glass rounded-3xl p-8 text-center space-y-3">
          <p className="text-sm text-[#4B4441]">
            Aramanızla eşleşen bir soru bulunamadı. Uzman ekibimize doğrudan sorabilirsiniz.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-full burgundy-cta px-5 py-2.5 text-xs font-medium text-white"
          >
            <span>Bize Sorun</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="pearl-glass rounded-2xl overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119]"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-[#7A353B] block mb-1">
                      {item.category}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-semibold text-[#1D1716]">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#4A0D13] shrink-0 transition-transform duration-200 ${
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
                      <div className="px-6 pb-5 pt-1 text-sm leading-relaxed text-[#4B4441] border-t border-[#E5DDD7]">
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
  );
}

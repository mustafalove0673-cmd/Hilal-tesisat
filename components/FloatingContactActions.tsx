'use client';

import React from 'react';
import { Instagram, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsappHref, SITE_INFO } from '@/lib/site-data';

export function FloatingContactActions() {
  return (
    <div
      aria-label="Hızlı İletişim Kanalları"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex items-center gap-2"
    >
      <a
        href={SITE_INFO.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram: ${SITE_INFO.instagramHandle}`}
        title={`Instagram · ${SITE_INFO.instagramHandle}`}
        className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-[#B81B35]/30 text-[#B81B35] shadow-[0_12px_26px_-8px_rgba(135,18,37,0.32)] backdrop-blur-md hover:border-[#B81B35] hover:bg-[#FFF5F7] hover:scale-105 transition-all"
      >
        <Instagram className="w-4 h-4" aria-hidden="true" />
      </a>

      <a
        href={SITE_INFO.phoneHref}
        aria-label={`Telefonla Ara: ${SITE_INFO.phoneDisplay}`}
        className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-[#9E162C]/30 text-[#9E162C] shadow-[0_12px_26px_-8px_rgba(135,18,37,0.34)] backdrop-blur-md hover:border-[#9E162C] hover:scale-105 transition-all"
      >
        <Phone className="w-4 h-4" aria-hidden="true" />
      </a>

      <a
        href={buildWhatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile Destek Al"
        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#1C5D36] hover:bg-[#174D2C] text-white px-3.5 h-10 sm:px-4.5 sm:h-11 shadow-[0_14px_30px_-8px_rgba(20,70,40,0.5)] border border-white/25 transition-all hover:scale-[1.03] active:scale-95"
      >
        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="text-[11.5px] sm:text-xs font-semibold whitespace-nowrap">
          <span className="sm:hidden">WhatsApp</span>
          <span className="hidden sm:inline">WhatsApp ile Destek Al</span>
        </span>
      </a>
    </div>
  );
}

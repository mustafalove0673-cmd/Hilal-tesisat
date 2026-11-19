'use client';

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { buildWhatsappHref, SITE_INFO } from '@/lib/site-data';

export function FloatingContactActions() {
  return (
    <div
      aria-label="Hızlı İletişim Kanalları"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex items-center gap-2"
    >
      <a
        href={SITE_INFO.phoneHref}
        aria-label={`Telefonla Ara: ${SITE_INFO.phoneDisplay}`}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95 border border-[#D4CBC4] text-[#4A0D13] shadow-[0_10px_24px_-8px_rgba(38,12,14,0.3)] backdrop-blur-md hover:border-[#4A0D13] hover:scale-105 transition-all"
      >
        <Phone className="w-4 h-4" aria-hidden="true" />
      </a>

      <a
        href={buildWhatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile İletişime Geç"
        className="inline-flex items-center gap-2 rounded-full bg-[#1C5D36] hover:bg-[#174D2C] text-white px-3.5 h-10 sm:px-4 shadow-[0_12px_28px_-8px_rgba(20,70,40,0.45)] border border-white/25 transition-all hover:scale-[1.03] active:scale-95"
      >
        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">
          WhatsApp
        </span>
      </a>
    </div>
  );
}

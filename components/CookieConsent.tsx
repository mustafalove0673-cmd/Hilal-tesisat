'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

const STORAGE_KEY = 'hilal_tesisat_cookie_consent_v1';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const timer = window.setTimeout(() => setVisible(true), 10500);
        return () => window.clearTimeout(timer);
      }
    } catch {
      // Ignore storage access restriction
    }
  }, []);

  function savePreference(mode: 'all' | 'essential') {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ mode, updatedAt: new Date().toISOString() }),
      );
    } catch {
      // Ignore storage write restriction
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      aria-label="Çerez Tercihleri"
      className="fixed bottom-16 left-3 right-3 sm:right-auto sm:left-5 sm:bottom-5 sm:max-w-xs z-40 rounded-xl bg-[#230508]/95 text-[#F8F5F2] border border-[#C8A287]/35 px-3 py-2.5 shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-start gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#C8A287] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-[10.5px] leading-snug text-[#E9DFD9]">
            Zorunlu güvenlik çerezleri kullanıyoruz.{' '}
            <Link href="/yasal/cerez-politikasi" className="underline text-white hover:text-[#C8A287]">
              Çerez Politikası
            </Link>{' '}
            ve{' '}
            <Link href="/yasal/kvkk" className="underline text-white hover:text-[#C8A287]">
              KVKK
            </Link>
            .
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => savePreference('all')}
              className="px-2.5 py-0.5 rounded-full bg-[#F8F5F2] text-[#230508] text-[10px] font-semibold hover:bg-[#EAE2DC] transition-colors whitespace-nowrap"
            >
              Kabul Et
            </button>
            <button
              type="button"
              onClick={() => savePreference('essential')}
              className="px-2.5 py-0.5 rounded-full border border-white/25 text-[10px] font-medium text-[#F8F5F2] hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Yalnızca Zorunlu
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label="Çerez bildirimini kapat"
          onClick={() => savePreference('essential')}
          className="text-[#C8A287] hover:text-white p-0.5 rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

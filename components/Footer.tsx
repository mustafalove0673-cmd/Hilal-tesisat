'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { HilalLogo } from './HilalLogo';
import { buildWhatsappHref, SITE_INFO } from '@/lib/site-data';

const QUICK_ROUTES = [
  { href: '/#hero', label: 'Ana Sayfa' },
  { href: '/#hizmetler', label: 'Hizmetler' },
  { href: '/#projeler', label: 'Projeler' },
  { href: '/#saha-videolari', label: 'Saha Videoları' },
  { href: '/#kurumsal', label: 'Kurumsal' },
  { href: '/#sss', label: 'SSS' },
  { href: '/#iletisim', label: 'İletişim' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setFeedback('Lütfen e-posta adresinizi girin.');
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: '' }),
      });
      const json = (await res.json()) as { ok: boolean; message: string };
      if (!res.ok || !json.ok) {
        setStatus('error');
        setFeedback(json.message || 'Kayıt başarısız oldu.');
        return;
      }
      setStatus('success');
      setFeedback(json.message);
      setEmail('');
    } catch {
      setStatus('error');
      setFeedback('Bağlantı hatası. Lütfen tekrar deneyin.');
    }
  }

  return (
    <footer className="relative overflow-hidden bg-[#E7E2DE] text-[#261E1D] pt-10 sm:pt-16">
      {/* Flowing Burgundy Satin Ribbon Sweeping Along Top Edge without Colliding with Columns */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-16 sm:h-24 overflow-hidden"
      >
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="footerWaveRight" x1="0" y1="0" x2="1" y2="0.15">
              <stop offset="0%" stopColor="#EBE7E4" stopOpacity="0" />
              <stop offset="18%" stopColor="#9E162C" stopOpacity="0.72" />
              <stop offset="48%" stopColor="#B81B35" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#5C0B1A" stopOpacity="0.98" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 L1440,0 L1440,78 C1110,104 760,34 390,58 C210,70 85,32 0,14 Z"
            fill="url(#footerWaveRight)"
          />
          <path
            d="M0,18 C240,68 560,38 920,66 C1160,84 1320,86 1440,80"
            fill="none"
            stroke="#C8A287"
            strokeWidth="1.4"
            opacity="0.72"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-8 sm:pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-10">
          {/* Column 1: Brand */}
          <div className="col-span-2 lg:col-span-4 space-y-2.5 sm:space-y-4">
            <Link href="/" className="inline-block scale-90 sm:scale-100 origin-left">
              <HilalLogo variant="dark" showTagline />
            </Link>
            <p className="text-[11px] sm:text-sm leading-relaxed text-[#57504D] max-w-xs">
              Ankara Pursaklar merkezli yetkili doğalgaz projesi, kombi bakımı, petek temizliği, su
              arıtma ve 7/24 sıhhi tesisat çözümleri.
            </p>
          </div>

          {/* Column 2: Quick Links (Dedicated Pages) */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="font-display text-base sm:text-lg font-semibold text-[#23191A] mb-2.5 sm:mb-4">
              Hızlı Erişim
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-[#4D4644]">
              {QUICK_ROUTES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#A81830] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="col-span-1 lg:col-span-3">
            <h3 className="font-display text-base sm:text-lg font-semibold text-[#23191A] mb-2.5 sm:mb-4">
              İletişim Bilgileri
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#4D4644]">
              <li>
                <a
                  href={SITE_INFO.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-[#A81830] transition-colors tabular-nums"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#A81830]/12 text-[#A81830] shrink-0">
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                  </span>
                  <span className="truncate">{SITE_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#1C5D36] transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1C5D36]/12 text-[#1C5D36] shrink-0">
                    <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                  </span>
                  <span>WhatsApp ile Destek Al</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#B81B35] transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#B81B35]/12 text-[#B81B35] shrink-0">
                    <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                  </span>
                  <span className="truncate">{SITE_INFO.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#A81830] transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#A81830]/12 text-[#A81830] shrink-0">
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                  </span>
                  <span className="break-all">{SITE_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 hover:text-[#A81830] transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#A81830]/12 text-[#A81830] shrink-0 mt-0.5">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                  </span>
                  <span>
                    {SITE_INFO.addressLine1}
                    <br />
                    {SITE_INFO.addressLine2}
                    <span className="mt-0.5 block text-[11px] font-semibold text-[#15803D]">
                      Google Haritalar’da Yol Tarifi →
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className="font-display text-base sm:text-lg font-semibold text-[#23191A] mb-2 sm:mb-3">
              Bizi Takip Edin & Bülten
            </h3>
            <a
              href={SITE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white border border-[#B81B35]/25 hover:border-[#B81B35] px-3.5 py-1.5 text-[11.5px] sm:text-xs font-medium text-[#660D1C] shadow-sm transition-all whitespace-nowrap"
            >
              <Instagram className="w-3.5 h-3.5 text-[#B81B35] shrink-0" aria-hidden="true" />
              <span>Instagram · {SITE_INFO.instagramHandle}</span>
            </a>
            <p className="text-[11px] sm:text-xs text-[#57504D] mb-2.5 sm:mb-3 leading-relaxed">
              Periyodik kombi bakım hatırlatmaları ve teknik bilgilendirmeler için kaydolun.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-1.5" noValidate>
              <label htmlFor="footer-newsletter-email" className="sr-only">
                E-posta adresiniz
              </label>
              <div className="flex items-center rounded-full bg-white/95 border border-[#D4CBC5] p-1 shadow-sm focus-within:ring-2 focus-within:ring-[#5E1119]">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  suppressHydrationWarning
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="w-full bg-transparent px-3 py-1.5 text-[11px] sm:text-xs text-[#1B1817] placeholder:text-[#7B7370] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  aria-label="Bültene abone ol"
                  className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full burgundy-cta text-white shrink-0 transition-transform active:scale-95 disabled:opacity-60"
                >
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </button>
              </div>
              {feedback ? (
                <p
                  role="status"
                  className={`text-[11px] flex items-center gap-1.5 ${
                    status === 'success' ? 'text-emerald-800' : 'text-[#8C1D28]'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  ) : null}
                  <span>{feedback}</span>
                </p>
              ) : null}
            </form>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-[#D1C8C2] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10.5px] sm:text-xs text-[#5D5653]">
          <p>© {new Date().getFullYear()} Hilal Tesisat. Tüm Hakları Saklıdır.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-1">
            <Link
              href="/yasal/gizlilik-politikasi"
              className="hover:text-[#A81830] transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/yasal/kvkk" className="hover:text-[#A81830] transition-colors">
              KVKK
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/yasal/kullanim-sartlari"
              className="hover:text-[#A81830] transition-colors"
            >
              Kullanım Şartları
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/yasal/cerez-politikasi"
              className="hover:text-[#A81830] transition-colors"
            >
              Çerez Politikası
            </Link>
            {/* Moving Target Defense canary link ignored by real users & honest crawlers */}
            <a
              href="/api/trap?source=canary"
              rel="nofollow"
              aria-hidden="true"
              tabIndex={-1}
              className="sr-only"
            >
              Arşiv Dizin Node
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { HilalLogo } from './HilalLogo';
import { EASE_LUXURY } from './MotionPrimitives';

const NAV_LINKS = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/projelerimiz', label: 'Projelerimiz' },
  { href: '/kurumsal', label: 'Kurumsal' },
  { href: '/sss', label: 'SSS' },
  { href: '/iletisim', label: 'İletişim' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#ECE7E4]/92 backdrop-blur-xl border-b border-[#D6CEC8]/75 shadow-[0_10px_30px_-20px_rgba(54,8,13,0.2)]'
          : 'bg-[#ECE7E4]/70 backdrop-blur-md border-b border-white/40'
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8 h-13 sm:h-[70px] flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Logo (compact on mobile) */}
        <Link
          href="/"
          aria-label="Hilal Tesisat Ana Sayfa"
          className="whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119] rounded-md scale-[0.86] origin-left sm:scale-100"
        >
          <HilalLogo variant="dark" />
        </Link>

        {/* Zone 2: Clean Nav Links */}
        <nav aria-label="Ana Menü" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119] rounded ${
                  isActive
                    ? 'text-[#36080D]'
                    : 'text-[#4B4543] hover:text-[#36080D]'
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ duration: 0.25, ease: EASE_LUXURY }}
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#5E1119]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Compact Mobile & Desktop Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-1.5 rounded-full burgundy-cta px-3 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-[13px] font-medium text-[#FAF7F5] whitespace-nowrap shrink-0 transition-transform duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5E1119]"
          >
            <span>Teklif Al</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/85 border border-[#D7CFC9] text-[#23191A] hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119]"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE_LUXURY }}
            className="lg:hidden border-t border-[#D8D0CA] bg-[#F7F5F3]/95 backdrop-blur-xl px-3 py-3 shadow-lg"
          >
            <nav aria-label="Mobil Menü" className="grid grid-cols-2 gap-1.5">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#4A0D13] text-white'
                        : 'text-[#2C2523] bg-white/65 hover:bg-[#EAE4DF]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

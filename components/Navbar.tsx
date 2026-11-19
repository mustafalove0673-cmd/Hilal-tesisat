'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, MessageCircle, X } from 'lucide-react';
import { HilalLogo } from './HilalLogo';
import { EASE_LUXURY } from './MotionPrimitives';
import { buildWhatsappHref } from '@/lib/site-data';

const NAV_ITEMS = [
  { id: 'hero', href: '/#hero', label: 'Ana Sayfa' },
  { id: 'hizmetler', href: '/#hizmetler', label: 'Hizmetler' },
  { id: 'projelerimiz', href: '/#projelerimiz', label: 'Projelerimiz' },
  { id: 'kurumsal', href: '/#kurumsal', label: 'Kurumsal' },
  { id: 'sss', href: '/#sss', label: 'SSS' },
  { id: 'iletisim', href: '/#iletisim', label: 'İletişim' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;

    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const onScrollSpy = () => {
      const scrollMid = window.scrollY + 140;
      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    onScrollSpy();
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', onScrollSpy);
  }, [pathname]);

  function handleSectionNav(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    setMobileOpen(false);
    if (pathname === '/') {
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
      }
    }
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#ECE7E4]/94 backdrop-blur-xl border-b border-[#D6CEC8]/75 shadow-[0_10px_30px_-20px_rgba(54,8,13,0.2)]'
          : 'bg-[#ECE7E4]/78 backdrop-blur-md border-b border-white/40'
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8 h-13 sm:h-[70px] flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Logo */}
        <Link
          href="/#hero"
          onClick={(e) => handleSectionNav(e, 'hero')}
          aria-label="Hilal Tesisat Ana Sayfa"
          className="whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119] rounded-md scale-[0.86] origin-left sm:scale-100"
        >
          <HilalLogo variant="dark" />
        </Link>

        {/* Zone 2: Single-Page Smooth Section Navigation */}
        <nav aria-label="Ana Menü" className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === '/' && activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleSectionNav(e, item.id)}
                className={`relative py-2 text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119] rounded ${
                  isActive ? 'text-[#36080D]' : 'text-[#4B4543] hover:text-[#36080D]'
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

        {/* Zone 3: Minimalist Teklif Al Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/#iletisim"
            onClick={(e) => handleSectionNav(e, 'iletisim')}
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
            className="lg:hidden border-t border-[#D8D0CA] bg-[#F7F5F3]/95 backdrop-blur-xl px-3 py-3 shadow-lg space-y-2"
          >
            <nav aria-label="Mobil Menü" className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === '/' && activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleSectionNav(e, item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#4A0D13] text-white'
                        : 'text-[#2C2523] bg-white/75 hover:bg-[#EAE4DF]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <a
              href={buildWhatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#1E5631]/25 bg-white px-3 py-2 text-xs font-semibold text-[#184B2B]"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WhatsApp 7/24 Hızlı İletişim</span>
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

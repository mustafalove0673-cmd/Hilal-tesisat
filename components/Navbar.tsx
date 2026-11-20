'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { HilalLogo } from './HilalLogo';
import { EASE_LUXURY, MagneticAction } from './MotionPrimitives';
import { buildWhatsappHref, SITE_INFO } from '@/lib/site-data';

const NAV_ITEMS = [
  { id: 'hero', href: '/#hero', label: 'Ana Sayfa' },
  { id: 'hizmetler', href: '/#hizmetler', label: 'Hizmetler' },
  { id: 'projeler', href: '/#projeler', label: 'Projeler' },
  { id: 'saha-videolari', href: '/#saha-videolari', label: 'Videolar' },
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
    const onScroll = () => {
      setScrolled(window.scrollY > 18);

      if (pathname !== '/') return;
      const scrollMarker = window.scrollY + 180;
      let current = 'hero';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollMarker) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    setMobileOpen(false);
    if (pathname === '/') {
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        if (window.__hilalLenis) {
          window.__hilalLenis.scrollTo(target, { offset: -74 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setActiveSection(id);
      }
    }
  }

  return (
    <header className="sticky top-0 z-40 px-2.5 sm:px-5 lg:px-8 pt-2 sm:pt-3 pb-1.5 pointer-events-none">
      {/* Floating Awwwards Obsidian-Burgundy Glass Architectural Bar */}
      <div
        className={`pointer-events-auto mx-auto max-w-[1280px] rounded-2xl sm:rounded-full awwwards-nav-shell transition-all duration-300 ${
          scrolled ? 'py-1.5 sm:py-2 px-3 sm:px-5' : 'py-2 sm:py-2.5 px-3.5 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            aria-label="Hilal Tesisat Ana Sayfa"
            className="whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9D1C0] rounded-md scale-[0.82] origin-left sm:scale-[0.94]"
          >
            <HilalLogo variant="light" />
          </Link>

          {/* Zone 2: Single-Page Editorial Navigation with Active Champagne Glide */}
          <nav aria-label="Ana Menü" className="hidden lg:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === '/' && activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-3 py-1.5 text-[13px] font-medium whitespace-nowrap shrink-0 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9D1C0] ${
                    isActive
                      ? 'text-[#660D1C]'
                      : 'text-[#F2E3DB] hover:text-white'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ duration: 0.28, ease: EASE_LUXURY }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FAF4EF] via-[#F2E3D7] to-[#FAF4EF] shadow-sm"
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <MagneticAction strength={7}>
              <Link
                href="/#iletisim"
                onClick={(e) => handleNavClick(e, 'iletisim')}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FAF4EE] to-[#EED9C8] hover:from-white hover:to-[#F4E3D6] px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-[11px] sm:text-[12.5px] font-semibold text-[#660D1C] shadow-md whitespace-nowrap shrink-0 transition-transform duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9D1C0]"
              >
                <span>Teklif Al</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
              </Link>
            </MagneticAction>

            <button
              type="button"
              aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-[#C8A287]/40 text-[#FAF5F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9D1C0]"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer: All Single-Page Sections + Instant Phone & WhatsApp */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_LUXURY }}
            className="pointer-events-auto lg:hidden mx-auto max-w-[1280px] mt-2 rounded-2xl awwwards-nav-shell p-3.5 space-y-3"
          >
            <nav aria-label="Mobil Menü" className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === '/' && activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#FAF4EE] text-[#660D1C] font-semibold'
                        : 'text-[#F5E8E0] bg-white/10 hover:bg-white/18'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/12">
              <a
                href={SITE_INFO.phoneHref}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 border border-[#C8A287]/35 px-3 py-2 text-[11px] font-semibold text-white tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#E9D1C0]" aria-hidden="true" />
                <span>{SITE_INFO.phoneDisplay}</span>
              </a>
              <a
                href={buildWhatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#1C5D36] px-3 py-2 text-[11px] font-semibold text-white"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp Destek</span>
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

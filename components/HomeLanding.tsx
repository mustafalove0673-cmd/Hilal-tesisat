'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowRight,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileCheck2,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Play,
  ShieldCheck,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import {
  buildWhatsappHref,
  FIELD_VIDEOS,
  PROJECTS,
  SERVICES,
  SITE_IMAGES,
  SITE_INFO,
  type ServiceCategory,
  type ServiceItem,
} from '@/lib/site-data';
import { SafeImage } from './SafeImage';
import {
  AnimatedCounter,
  CurtainImageReveal,
  EditorialReveal,
  EASE_LUXURY,
  KineticEditorialMarquee,
  LuxuryInteractiveCard,
  MagneticAction,
  ParallaxLayer,
  SilkRibbonParallax,
  SplitTextReveal,
  SPRING_ARCHITECTURAL,
} from './MotionPrimitives';
import { HilalLogo } from './HilalLogo';
import { FieldReelsShowcase } from './FieldReelsShowcase';
import { AwwwardsTestimonials } from './AwwwardsTestimonials';
import { FaqAccordion } from './FaqAccordion';
import { QuoteForm } from './QuoteForm';
import { LiveLocationMap } from './LiveLocationMap';
import { computeStaggeredRevealDelay } from '@/lib/awwwards-motion';

const SERVICE_FILTERS: { id: ServiceCategory; label: string }[] = [
  { id: 'tumu', label: 'Tümü' },
  { id: 'isitma', label: 'Isıtma' },
  { id: 'dogalgaz', label: 'Doğalgaz' },
  { id: 'su-tesisat', label: 'Su & Sıhhi' },
];

const CORPORATE_PILLARS = [
  {
    icon: FileCheck2,
    title: 'Başkentgaz Yetkili Mühendislik',
    description:
      'ZetaCAD iç tesisat projelendirme, resmi sızdırmazlık onayı ve gaz açım işlemlerinde eksiksiz yetkili süreç.',
  },
  {
    icon: Wrench,
    title: 'TSE Belgeli Orijinal Ekipman',
    description:
      'Bakır kollektör, oksijen bariyerli PEX-a boru ve orijinal yedek parçalarla uzun ömürlü mekanik sistemler.',
  },
  {
    icon: ShieldCheck,
    title: 'Yazılı İşçilik Garantisi',
    description:
      'Her kombi bakımı, petek temizliği ve tesisat uygulaması dijital kayıt altında 1–2 yıl yazılı güvenceyle teslim edilir.',
  },
];

export function HomeLanding() {
  const [serviceFilter, setServiceFilter] = useState<ServiceCategory>('tumu');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showIntroModal, setShowIntroModal] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const servicesInView = useInView(servicesGridRef, { once: true, amount: 0.12 });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothHeroScroll = useSpring(heroScrollProgress, { stiffness: 130, damping: 26 });
  const heroBgY = useTransform(smoothHeroScroll, [0, 1], [0, 82]);
  const heroBgScale = useTransform(smoothHeroScroll, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(smoothHeroScroll, [0, 1], [0, -34]);

  const visibleServices =
    serviceFilter === 'tumu'
      ? SERVICES
      : SERVICES.filter((svc) => svc.category === serviceFilter);

  const activeProject = PROJECTS[activeProjectIdx] ?? PROJECTS[0];

  function prevProject() {
    setActiveProjectIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }

  function nextProject() {
    setActiveProjectIdx((prev) => (prev + 1) % PROJECTS.length);
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      if (window.__hilalLenis) {
        window.__hilalLenis.scrollTo(el, { offset: -74 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  return (
    <div className="relative overflow-hidden bg-[#EFECE9]">
      {/* Subtle Architectural Silk Texture Behind Light Sections */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <SafeImage
          src={SITE_IMAGES.pearlSilkBackdrop}
          alt=""
          className="w-full h-full object-cover opacity-[0.1] saturate-110"
        />
        <SilkRibbonParallax className="absolute inset-0 w-full h-full opacity-75" />
      </div>

      {/* 1. AWWWARDS EDITORIAL ARCHITECTURAL HERO */}
      <section
        id="hero"
        ref={heroRef}
        className="relative -mt-[64px] sm:-mt-[78px] pt-[74px] sm:pt-[96px] overflow-hidden bg-[#EDE7E1]"
      >
        {/* Full-Bleed Architectural Villa + Scroll Parallax + Immediate Ken Burns */}
        <div className="hidden sm:block absolute inset-0 z-0 overflow-hidden">
          <motion.div
            style={prefersReducedMotion ? undefined : { y: heroBgY, scale: heroBgScale }}
            className="w-full h-full will-change-transform"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 1.09 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.45, ease: EASE_LUXURY }}
              className="w-full h-full will-change-transform"
            >
              <SafeImage
                src={SITE_IMAGES.heroVilla}
                alt="Hilal Tesisat Modern Mimari Villa, Hilal Sembolü ve Bordo Kurdele"
                className="w-full h-full object-cover object-right contrast-[1.03] saturate-[1.05]"
              />
            </motion.div>
          </motion.div>
          {/* Seamless Architectural Pearl-to-Twilight Left Mask (Zero Hard Seam) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#EFEAE5] from-[28%] via-[#EFEAE5]/88 via-[39%] to-transparent to-[58%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1A0306]/35 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#EFECE9] via-[#EFECE9]/75 to-transparent"
          />
        </div>

        {/* Refined Compact Editorial Content with Scroll Depth Float */}
        <div className="relative z-10 mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:py-14 lg:py-20 sm:min-h-[600px] lg:min-h-[670px] flex flex-col justify-center">
          <motion.div
            style={prefersReducedMotion ? undefined : { y: heroTextY }}
            className="max-w-full sm:max-w-[500px] will-change-transform"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.02, ease: EASE_LUXURY }}
              className="flex items-center gap-2.5 mb-2.5"
            >
              <motion.span
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.75, delay: 0.08, ease: EASE_LUXURY }}
                className="h-[1px] w-7 bg-[#A81830] origin-left"
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#9A152B]">
                Pursaklar · Ankara — Yetkili Mekanik & Doğalgaz
              </span>
            </motion.div>

            <SplitTextReveal
              as="h1"
              trigger="immediate"
              delay={0.06}
              text="Hayatınızı Güvenle Akıtan Teknoloji"
              className="font-display text-[30px] sm:text-[40px] lg:text-[46px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#1A1211] text-balance"
            />

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, delay: 0.24, ease: EASE_LUXURY }}
              className="mt-3 text-[13px] sm:text-[14.5px] leading-relaxed text-[#362C29] max-w-[430px]"
            >
              <strong className="font-semibold text-[#8E1328]">HİLAL TESİSAT</strong> olarak,
              doğalgaz projesinden yoğuşmalı kombi bakımına, petek temizliğinden su arıtma ve sıhhi
              tesisata kadar 7/24 yanınızdayız.
            </motion.p>

            {/* Focused Magnetic Action Row */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.34, ease: EASE_LUXURY }}
              className="mt-5 flex flex-wrap items-center gap-2.5"
            >
              <MagneticAction strength={9}>
                <button
                  type="button"
                  onClick={() => scrollToSection('iletisim')}
                  className="inline-flex items-center gap-2.5 rounded-full burgundy-cta pl-4 pr-2 py-2 sm:pl-5 sm:pr-2 sm:py-2 text-xs sm:text-[13px] font-medium text-[#FAF7F5] whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Ücretsiz Keşif & Teklif Al</span>
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15">
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </button>
              </MagneticAction>

              <MagneticAction strength={7}>
                <a
                  href={buildWhatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1C5D36]/30 bg-white/95 hover:bg-[#1C5D36] text-[#1C5D36] hover:text-white px-3.5 py-2 text-xs font-semibold shadow-sm whitespace-nowrap transition-colors duration-150"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>WhatsApp Destek</span>
                </a>
              </MagneticAction>

              <MagneticAction strength={6}>
                <button
                  type="button"
                  onClick={() => setShowIntroModal(true)}
                  className="group inline-flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A81830] rounded-full pr-1 py-0.5"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#A81830]/25 shadow-sm text-[#9A152B] group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-3 h-3 fill-[#9A152B] ml-0.5" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-semibold leading-tight text-[#251A19]">
                    Tanıtım Filmi
                  </span>
                </button>
              </MagneticAction>
            </motion.div>

            {/* Mobile Scenic Architectural Frame */}
            <div className="sm:hidden mt-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/80 shadow-[0_18px_40px_-18px_rgba(32,6,10,0.35)] aspect-[16/10] bg-[#1A0D10]">
                <SafeImage
                  src={SITE_IMAGES.heroVilla}
                  alt="Hilal Tesisat Modern Mimari Villa"
                  className="w-full h-full object-cover object-right scale-[1.44] origin-right contrast-[1.04] saturate-[1.06]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/25 rounded-2xl"
                />
              </div>
            </div>

            {/* Compact Architectural Proof Ribbon with Rolling Odometer Counters */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.78, delay: 0.44, ease: EASE_LUXURY }}
              className="mt-4 sm:mt-7 burgundy-vellum-frame rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 grid grid-cols-3 gap-2 sm:gap-4 max-w-[445px]"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#A81830] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-sans text-sm sm:text-lg font-bold tracking-tight leading-none text-[#1D1716] tabular-nums">
                    <AnimatedCounter target={15} suffix="+" />
                  </div>
                  <div className="mt-0.5 text-[9.5px] sm:text-[10.5px] text-[#554A47] leading-tight">
                    Yıllık Tecrübe
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-l border-[#9A152B]/18 pl-2.5 sm:pl-3.5">
                <Users className="w-4 h-4 text-[#A81830] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-sans text-sm sm:text-lg font-bold tracking-tight leading-none text-[#1D1716] tabular-nums">
                    <AnimatedCounter target={1000} suffix="+" />
                  </div>
                  <div className="mt-0.5 text-[9.5px] sm:text-[10.5px] text-[#554A47] leading-tight">
                    Mutlu Müşteri
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-l border-[#9A152B]/18 pl-2.5 sm:pl-3.5">
                <Headphones className="w-4 h-4 text-[#A81830] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-sans text-sm sm:text-lg font-bold tracking-tight leading-none text-[#1D1716] tabular-nums">
                    {SITE_INFO.supportHours}
                  </div>
                  <div className="mt-0.5 text-[9.5px] sm:text-[10.5px] text-[#554A47] leading-tight">
                    Teknik Destek
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Direct Location & Google Maps Quick Strip in Hero */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.52, ease: EASE_LUXURY }}
              data-testid="hero-location-strip"
              className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 max-w-[460px] text-[11px] sm:text-xs text-[#3C2F2C]"
            >
              <button
                type="button"
                onClick={() => scrollToSection('konum-harita')}
                className="inline-flex items-center gap-1.5 font-medium text-[#2A1E1C] hover:text-[#15803D] transition-colors text-left"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ECFDF5] border border-[#86EFAC] text-[#15803D] shrink-0">
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                </span>
                <span>
                  {SITE_INFO.addressLine1}, {SITE_INFO.addressLine2}
                </span>
              </button>
              <a
                href={SITE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#15803D] hover:text-[#166534] underline underline-offset-4 whitespace-nowrap"
              >
                <Navigation className="w-3 h-3" aria-hidden="true" />
                <span>Yol Tarifi Al</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* KINETIC EDITORIAL MARQUEE #1 (SCROLL-VELOCITY REACTIVE) */}
      <KineticEditorialMarquee
        variant="crimson"
        items={[
          'Başkentgaz Yetkili Mühendislik',
          'Yoğuşmalı Kombi Bakımı',
          'İlaçlı Petek Temizliği',
          'Su Arıtma Sistemleri',
          '7/24 Pursaklar & Ankara',
          'Kırmadan Kaçak Tespiti',
        ]}
      />

      {/* 2. HİZMETLERİMİZ (INTERACTIVE SINGLE-PAGE FILTER + 4x2 GRID) */}
      <section id="hizmetler" className="relative z-10 scroll-mt-24 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
            <div className="lg:col-span-4 space-y-4">
              <EditorialReveal>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-semibold tracking-wide text-[#A81830]">
                      01 · Hizmetlerimiz
                    </span>
                    <span className="h-[1px] w-10 bg-[#8C5B4D]/70" aria-hidden="true" />
                  </div>
                  <SplitTextReveal
                    as="h2"
                    text="Profesyonel Tesisat Hizmetleri"
                    className="font-display text-2xl sm:text-[32px] lg:text-[34px] font-semibold leading-[1.12] text-[#1A1312] text-balance"
                  />
                  <p className="text-[13px] sm:text-sm leading-relaxed text-[#463D3A]">
                    Başkentgaz onaylı doğalgaz mühendisliğinden yoğuşmalı kombi bakımına ve su
                    arıtmaya kadar garantili çözümler. Detaylar için bir hizmete tıklayın.
                  </p>
                </div>

                {/* Compact Segmented Filter Controls with Sliding Spring Pill */}
                <div
                  role="group"
                  aria-label="Hizmet kategorileri"
                  className="mt-4 inline-flex flex-wrap items-center gap-1 rounded-xl bg-white/80 p-1 border border-[#4A0D13]/12 shadow-sm"
                >
                  {SERVICE_FILTERS.map((tab) => {
                    const active = serviceFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setServiceFilter(tab.id)}
                        aria-pressed={active}
                        className={`relative px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap transition-colors ${
                          active
                            ? 'text-white'
                            : 'text-[#4B4340] hover:text-[#1A1312]'
                        }`}
                      >
                        {active ? (
                          <motion.span
                            layoutId="home-service-filter-pill"
                            transition={SPRING_ARCHITECTURAL}
                            className="absolute inset-0 rounded-lg burgundy-cta"
                          />
                        ) : null}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Inline Service Center Location Strip */}
                <div
                  data-testid="services-location-strip"
                  className="mt-4 rounded-xl bg-white/85 border border-[#16A34A]/20 px-3.5 py-2.5 shadow-sm flex items-start gap-2.5"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#ECFDF5] border border-[#86EFAC] text-[#15803D] shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 space-y-1">
                    <div className="text-[10.5px] font-semibold text-[#15803D]">
                      Merkez Servis Noktamız · 7/24 Ankara Geneli
                    </div>
                    <div className="text-[11.5px] font-medium text-[#261C1B] leading-snug">
                      {SITE_INFO.fullAddress}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-0.5">
                      <a
                        href={SITE_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#15803D] hover:underline"
                      >
                        <Navigation className="w-3 h-3" aria-hidden="true" />
                        <span>Yol Tarifi</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => scrollToSection('konum-harita')}
                        className="text-[11px] font-semibold text-[#9A152B] hover:underline"
                      >
                        Canlı Haritada Gör →
                      </button>
                    </div>
                  </div>
                </div>
              </EditorialReveal>

              <ParallaxLayer offset={20} className="hidden lg:flex justify-start pt-2">
                <div className="overflow-hidden mix-blend-multiply max-w-[260px] [mask-image:radial-gradient(closest-side,black_52%,transparent_94%)]">
                  <SafeImage
                    src={SITE_IMAGES.waterSplash}
                    alt="Kristal berraklığında su tesisatı akış görseli"
                    className="w-full h-auto object-cover brightness-[1.06] contrast-[1.08] saturate-[1.14]"
                  />
                </div>
              </ParallaxLayer>
            </div>

            {/* Right Interactive Service Cards with Orchestrated Awwwards Fade-Up & Spring Layout */}
            <motion.div
              ref={servicesGridRef}
              layout
              className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5"
            >
              <AnimatePresence mode="popLayout">
                {visibleServices.map((service, index) => (
                  <motion.div
                    key={service.slug}
                    data-testid="service-card"
                    layout
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 36, scale: 0.96, filter: 'blur(4px)' }
                    }
                    animate={
                      prefersReducedMotion || servicesInView
                        ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                        : { opacity: 0, y: 36, scale: 0.96, filter: 'blur(4px)' }
                    }
                    exit={{ opacity: 0, y: -12, scale: 0.95 }}
                    transition={{
                      duration: 0.7,
                      delay: computeStaggeredRevealDelay(index, 4, 0.065, 0.34),
                      ease: EASE_LUXURY,
                    }}
                    className="h-full will-change-transform"
                  >
                    <LuxuryInteractiveCard className="h-full rounded-2xl bg-gradient-to-b from-white/95 to-[#F1ECE8]/92 border border-white ring-1 ring-[#4A0D13]/10 shadow-[0_10px_24px_-16px_rgba(54,8,13,0.16)] hover:ring-[#A81830]/35">
                      <button
                        type="button"
                        data-cursor="DETAY"
                        onClick={() => setSelectedService(service)}
                        className="group w-full h-full text-center p-3 sm:p-3.5 flex flex-col items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A81830] rounded-2xl"
                      >
                        <div className="w-full aspect-[4/3] sm:aspect-square flex items-center justify-center overflow-hidden mb-1.5">
                          <SafeImage
                            src={service.image}
                            alt={service.title}
                            className="w-[86%] h-[86%] object-contain mix-blend-multiply contrast-[1.06] saturate-[1.1] [mask-image:radial-gradient(closest-side,black_58%,transparent_96%)] transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <span className="block text-[11.5px] sm:text-[12.5px] font-semibold leading-tight text-[#231B1A] group-hover:text-[#9E162C] transition-colors">
                            {service.shortTitle}
                          </span>
                          <span className="block text-[10px] text-[#6B5F5B]">
                            {service.responseTime}
                          </span>
                        </div>
                      </button>
                    </LuxuryInteractiveCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PROJELERİMİZ (LUXURY ARCHED GALLERY + OVERLAPPING THUMBNAILS) */}
      <section id="projeler" className="relative z-10 scroll-mt-24 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            <EditorialReveal className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-semibold tracking-wide text-[#A81830]">
                  02 · Projelerimiz
                </span>
                <span className="h-[1px] w-10 bg-[#8C5B4D]/70" aria-hidden="true" />
              </div>
              <SplitTextReveal
                as="h2"
                text="Gerçekleştirdiğimiz Özel Projeler"
                className="font-display text-2xl sm:text-[32px] lg:text-[34px] font-semibold leading-[1.12] text-[#1A1312] text-balance"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: EASE_LUXURY }}
                  className="space-y-2.5"
                >
                  <p className="text-[13px] sm:text-sm leading-relaxed text-[#463D3A]">
                    {activeProject.description}
                  </p>
                  <div className="pt-0.5 text-xs font-medium text-[#9A152B]">
                    {activeProject.metrics.join(' · ')}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <MagneticAction strength={8}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('iletisim')}
                    className="inline-flex items-center gap-1.5 rounded-full burgundy-cta px-4 py-2 text-xs font-medium text-white transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    <span>Benzer Proje Teklifi Al</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </MagneticAction>

                <MagneticAction strength={6}>
                  <a
                    href={buildWhatsappHref(activeProject.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1C5D36]/30 bg-white px-3.5 py-2 text-xs font-semibold text-[#1C5D36] hover:bg-[#1C5D36] hover:text-white transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </MagneticAction>

                <MagneticAction strength={6}>
                  <a
                    href={SITE_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#B81B35]/30 bg-white px-3.5 py-2 text-xs font-semibold text-[#9E162C] hover:bg-[#9E162C] hover:text-white transition-colors whitespace-nowrap"
                  >
                    <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Instagram</span>
                  </a>
                </MagneticAction>
              </div>
            </EditorialReveal>

            <div className="lg:col-span-8 relative">
              <CurtainImageReveal
                className="relative rounded-tl-[64px] rounded-bl-[44px] rounded-tr-[20px] rounded-br-[20px] sm:rounded-tl-[135px] sm:rounded-bl-[96px] sm:rounded-tr-[28px] sm:rounded-br-[28px] shadow-[0_24px_54px_-26px_rgba(38,12,14,0.34)] border border-white/90 bg-[#E7E1DC] aspect-[16/9.6]"
              >
                <div data-cursor="İNCELE" className="relative w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.id}
                      initial={prefersReducedMotion ? false : { opacity: 0.25, scale: 1.07 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.2, scale: 0.98 }}
                      transition={{ duration: 0.55, ease: EASE_LUXURY }}
                      className="absolute inset-0"
                    >
                      <SafeImage
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <a
                    href={SITE_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Projelerimizi Instagram'da incele: ${SITE_INFO.instagramHandle}`}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#4A0915]/78 hover:bg-[#9E162C] border border-[#E9D1C0]/45 px-3 py-1.5 text-[11px] font-medium text-[#FAF5F0] backdrop-blur-md shadow-lg transition-all hover:scale-[1.03]"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#F3D9C7]" aria-hidden="true" />
                    <span>{SITE_INFO.instagramHandle}</span>
                  </a>
                </div>
              </CurtainImageReveal>

              <div className="relative z-10 -mt-7 sm:-mt-12 mx-1 sm:mx-6 flex items-center gap-1.5 sm:gap-2.5">
                <MagneticAction strength={6}>
                  <button
                    type="button"
                    onClick={prevProject}
                    aria-label="Önceki proje"
                    className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7A1023] text-white shadow-md hover:bg-[#A81830] transition-colors shrink-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </MagneticAction>

                <div className="grid grid-cols-4 gap-1.5 sm:gap-3 flex-1">
                  {PROJECTS.map((proj, idx) => {
                    const isSelected = idx === activeProjectIdx;
                    return (
                      <motion.button
                        key={proj.id}
                        type="button"
                        whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                        onClick={() => setActiveProjectIdx(idx)}
                        aria-label={`${proj.title} projesini göster`}
                        aria-pressed={isSelected}
                        className={`relative rounded-lg sm:rounded-xl overflow-hidden aspect-[4/3] border-2 transition-colors duration-200 shadow-md ${
                          isSelected
                            ? 'border-[#A81830] scale-[1.03]'
                            : 'border-white opacity-90 hover:opacity-100'
                        }`}
                      >
                        <SafeImage
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    );
                  })}
                </div>

                <MagneticAction strength={6}>
                  <button
                    type="button"
                    onClick={nextProject}
                    aria-label="Sonraki proje"
                    className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7A1023] text-white shadow-md hover:bg-[#A81830] transition-colors shrink-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </MagneticAction>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-xs text-[#3C3330] font-medium">
                <span>
                  {activeProject.title} ·{' '}
                  <span className="text-[#6B5F5B] font-normal">
                    {activeProject.location} · {activeProject.year}
                  </span>
                </span>
                <span aria-hidden="true" className="text-[#B81B35]/40">
                  |
                </span>
                <a
                  href={SITE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#9E162C] hover:text-[#660D1C] font-semibold underline-offset-4 hover:underline"
                >
                  <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Instagram’da Tüm Projeler</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MID-PAGE HORIZONTAL VERTICAL-VIDEO SHOWCASE INSIDE CUSTOM IPHONE PRO FRAME */}
      <FieldReelsShowcase />

      {/* 5. KURUMSAL & NEDEN HİLAL TESİSAT? (FULL CORPORATE SECTION ON SINGLE PAGE) */}
      <section id="kurumsal" className="relative z-10 scroll-mt-24 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-9 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <ParallaxLayer
                offset={28}
                rotateRange={[-12, 12]}
                className="w-[190px] sm:w-[270px] lg:w-[300px]"
              >
                <div className="mix-blend-multiply [mask-image:radial-gradient(closest-side,black_66%,transparent_98%)]">
                  <SafeImage
                    src={SITE_IMAGES.emblemMetal}
                    alt="Hilal Tesisat 3D Metalik Amblem"
                    className="w-full aspect-square object-contain contrast-[1.06] saturate-[1.12]"
                  />
                </div>
              </ParallaxLayer>
            </div>

            <EditorialReveal className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-semibold tracking-wide text-[#A81830]">
                  03 · Kurumsal Güvence
                </span>
                <span className="h-[1px] w-10 bg-[#8C5B4D]/70" aria-hidden="true" />
              </div>
              <SplitTextReveal
                as="h2"
                text="Neden Hilal Tesisat?"
                className="font-display text-2xl sm:text-[32px] lg:text-[34px] font-semibold leading-[1.12] text-[#1A1312]"
              />
              <p className="text-[13px] sm:text-sm leading-relaxed text-[#463D3A]">
                15 yılı aşkın saha tecrübemiz ve yetkili mühendislik kadromuzla Ankara’nın her
                ilçesinde kalıcı, güvenli ve şeffaf fiyatlı tesisat çözümleri sunuyoruz.
              </p>

              <ul className="space-y-2 pt-1">
                {[
                  'Başkentgaz Onaylı Sertifikalı Kadro',
                  '7/24 Acil Teknik Servis & Hızlı Müdahale',
                  '1–2 Yıl Yazılı İşçilik ve Parça Garantisi',
                  'Keşif Öncesi Şeffaf Fiyatlandırma',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-[#241B19]"
                  >
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#9E162C] text-white shrink-0">
                      <Check className="w-2.5 h-2.5" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div
                data-testid="corporate-location-strip"
                className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[#9E162C]/15 text-[11.5px]"
              >
                <span className="inline-flex items-center gap-1.5 font-medium text-[#2C211F]">
                  <MapPin className="w-3.5 h-3.5 text-[#15803D] shrink-0" aria-hidden="true" />
                  <span>
                    {SITE_INFO.addressLine1}, {SITE_INFO.addressLine2}
                  </span>
                </span>
                <a
                  href={SITE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#15803D] hover:underline whitespace-nowrap"
                >
                  <Navigation className="w-3 h-3" aria-hidden="true" />
                  <span>Haritada Konum</span>
                </a>
              </div>
            </EditorialReveal>

            <EditorialReveal delay={0.08} className="lg:col-span-4">
              <LuxuryInteractiveCard
                tiltMaxDeg={4}
                className="burgundy-vellum-frame rounded-2xl p-5 min-h-[210px] sm:min-h-[255px]"
              >
                <div className="relative h-full min-h-[175px] sm:min-h-[215px] flex flex-col justify-between">
                  <div className="relative z-10 space-y-3.5 max-w-[54%]">
                    <div>
                      <div className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#1D1716] leading-none tabular-nums">
                        <AnimatedCounter target={15} suffix="+" />
                      </div>
                      <div className="text-[11px] text-[#554A47] mt-0.5">Yıllık Mühendislik</div>
                    </div>
                    <div>
                      <div className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#1D1716] leading-none tabular-nums">
                        <AnimatedCounter target={1000} suffix="+" />
                      </div>
                      <div className="text-[11px] text-[#554A47] mt-0.5">Teslim Edilen Proje</div>
                    </div>
                  </div>

                  <div className="absolute right-0 bottom-0 top-0 w-[52%] pointer-events-none flex justify-end">
                    <div className="relative w-full h-full">
                      <SafeImage
                        src={SITE_IMAGES.technicianPortrait}
                        alt="Hilal Tesisat Uzman Tekniker"
                        className="w-full h-full object-cover object-top mix-blend-multiply [mask-image:linear-gradient(to_right,transparent_0%,black_32%,black_100%)]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute top-[30%] left-[56%] -translate-x-1/2 scale-[0.28] sm:scale-[0.34] opacity-80 pointer-events-none"
                      >
                        <HilalLogo variant="light" />
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-4">
                    <span className="font-display italic text-base sm:text-lg text-[#9E162C]">
                      Hilal Tesisat
                    </span>
                  </div>
                </div>
              </LuxuryInteractiveCard>
            </EditorialReveal>
          </div>

          {/* 3 Compact Corporate Engineering Standards with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CORPORATE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <EditorialReveal key={pillar.title} delay={idx * 0.08} y={24}>
                  <LuxuryInteractiveCard
                    tiltMaxDeg={4.5}
                    className="h-full rounded-2xl bg-white/85 border border-[#9E162C]/14 shadow-[0_8px_22px_-16px_rgba(135,18,37,0.18)]"
                  >
                    <div className="h-full p-5 space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#9E162C]/12 text-[#9E162C] shrink-0">
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <h3 className="font-display text-lg font-semibold text-[#1A1312] leading-snug">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#4C4340] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </LuxuryInteractiveCard>
                </EditorialReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. MÜŞTERİLERİMİZİN GÖRÜŞLERİ (AWWWARDS 3D SWIPEABLE INTERACTIVE DECK) */}
      <AwwwardsTestimonials />

      {/* 7. SIKÇA SORULAN SORULAR (SINGLE-PAGE INTERACTIVE FAQ SECTION) */}
      <section id="sss" className="relative z-10 scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 mb-6">
          <EditorialReveal className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-semibold tracking-wide text-[#A81830]">
                05 · Sıkça Sorulan Sorular
              </span>
              <span className="h-[1px] w-10 bg-[#8C5B4D]/70" aria-hidden="true" />
            </div>
            <SplitTextReveal
              as="h2"
              text="Merak Edilen Teknik Detaylar"
              className="font-display text-2xl sm:text-[32px] font-semibold leading-[1.12] text-[#1A1312]"
            />
          </EditorialReveal>
        </div>
        <FaqAccordion />
      </section>

      {/* KINETIC EDITORIAL MARQUEE #2 (REVERSE PEARL ACCENT) */}
      <KineticEditorialMarquee
        variant="pearl"
        reverse
        items={[
          'Saray Cumhuriyet · Pursaklar',
          '0535 078 44 18',
          'Ücretsiz Yerinde Keşif',
          '1–2 Yıl Yazılı Garanti',
          '@hilaltesisatdogalgaz',
          '30–45 Dk Acil Müdahale',
        ]}
      />

      {/* 8. REDESIGNED AWWWARDS HIGH-CONTRAST ROYAL CRIMSON CONTACT & GOOGLE MAPS */}
      <section
        id="iletisim"
        className="relative z-10 scroll-mt-24 py-14 sm:py-20 overflow-hidden bg-[#4A0915] text-[#FAF5F0]"
      >
        {/* Luxury Studio Marble & Brushed Champagne Backdrop with Rich Crimson Scrim */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <SafeImage
            src={SITE_IMAGES.contactConciergeStage}
            alt=""
            className="w-full h-full object-cover opacity-32 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#4E0A17]/90 via-[#6E0E20]/86 to-[#3E0712]/94" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Razor-Sharp High-Contrast Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-white/15">
            <EditorialReveal className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-semibold tracking-wide text-[#F3D9C7]">
                  06 · İletişim & 7/24 Destek Merkezi
                </span>
                <span className="h-[1px] w-10 bg-[#DFBCA3]/70" aria-hidden="true" />
              </div>
              <SplitTextReveal
                as="h2"
                text="Uzman Ekibimizle Her Zaman Yanınızdayız"
                className="font-display text-2xl sm:text-[34px] lg:text-[38px] font-semibold leading-[1.1] text-white text-balance"
              />
              <p className="text-xs sm:text-sm text-[#F0E1D8] leading-relaxed">
                Ücretsiz keşif, doğalgaz projesi veya acil kombi/tesisat desteği için formu
                doldurun ya da tek dokunuşla doğrudan ulaşın.
              </p>
            </EditorialReveal>

            <div className="flex flex-wrap items-center gap-2.5">
              <MagneticAction strength={8}>
                <a
                  href={SITE_INFO.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FAF4EE] hover:bg-white text-[#660D1C] px-4.5 py-2.5 text-xs sm:text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5 tabular-nums whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>{SITE_INFO.phoneDisplay}</span>
                </a>
              </MagneticAction>

              <MagneticAction strength={8}>
                <a
                  href={buildWhatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1C5D36] hover:bg-[#174D2C] text-white border border-white/20 px-4.5 py-2.5 text-xs sm:text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp ile Destek Al</span>
                </a>
              </MagneticAction>

              <MagneticAction strength={7}>
                <a
                  href={SITE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/12 hover:bg-white/20 text-white border border-[#E9D1C0]/40 px-4 py-2.5 text-xs sm:text-sm font-medium backdrop-blur-md transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <Instagram className="w-4 h-4 text-[#F3D9C7]" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              </MagneticAction>
            </div>
          </div>

          {/* 2-Column Balanced Contact Split: Crimson Concierge Card + Crisp Alabaster Quote Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
            <EditorialReveal delay={0.04} className="lg:col-span-5 flex">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden burgundy-frosted-panel flex flex-col justify-between">
                <div>
                  <div className="relative h-40 overflow-hidden">
                    <SafeImage
                      src={SITE_IMAGES.corporateTeam}
                      alt="Hilal Tesisat Saha ve Keşif Ekibi"
                      className="w-full h-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#5C0B1A] via-[#5C0B1A]/50 to-transparent"
                    />
                    <div className="absolute bottom-3.5 left-5 right-5">
                      <span className="text-[10.5px] font-medium text-[#F3D9C7]">
                        Merkez Servis Ofisi · Saray Cumhuriyet
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
                        {SITE_INFO.brandName}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3.5">
                    <a
                      href={SITE_INFO.phoneHref}
                      className="flex items-center gap-3.5 rounded-xl p-2 -m-2 hover:bg-white/8 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full bg-white/10 border border-[#C8A287]/40 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-[#E9D1C0]" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-sm sm:text-base font-semibold text-white tabular-nums">
                          {SITE_INFO.phoneDisplay}
                        </div>
                        <div className="text-[11px] text-[#DFCFC5]">7/24 Acil Telefon Hattı</div>
                      </div>
                    </a>

                    <a
                      href={buildWhatsappHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 rounded-xl p-2 -m-2 hover:bg-white/8 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full bg-[#1C5D36] border border-white/25 flex items-center justify-center shrink-0">
                        <MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-sm sm:text-base font-semibold text-white">
                          WhatsApp ile Destek Al
                        </div>
                        <div className="text-[11px] text-[#DFCFC5]">
                          Fotoğraf veya arıza kodu gönderin, anında fiyat alın
                        </div>
                      </div>
                    </a>

                    <a
                      href={SITE_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 rounded-xl p-2 -m-2 hover:bg-white/8 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C82348] via-[#B81B35] to-[#E39B6D] border border-white/25 flex items-center justify-center shrink-0">
                        <Instagram className="w-4 h-4 text-white" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                          {SITE_INFO.instagramHandle}
                        </div>
                        <div className="text-[11px] text-[#DFCFC5]">
                          Resmi Instagram · Güncel Saha Uygulamaları
                        </div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${SITE_INFO.email}`}
                      className="flex items-center gap-3.5 rounded-xl p-2 -m-2 hover:bg-white/8 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full bg-white/10 border border-[#C8A287]/40 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-[#E9D1C0]" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white break-all">
                          {SITE_INFO.email}
                        </div>
                        <div className="text-[11px] text-[#DFCFC5]">Kurumsal E-posta</div>
                      </div>
                    </a>

                    <a
                      href={SITE_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3.5 rounded-xl p-2 -m-2 hover:bg-white/8 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full bg-white/10 border border-[#C8A287]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Navigation className="w-4 h-4 text-[#E9D1C0]" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {SITE_INFO.addressLine1}
                        </div>
                        <div className="text-[11px] text-[#DFCFC5]">
                          {SITE_INFO.addressLine2} · Yol Tarifi Al →
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-3.5">
                  <div className="pt-3.5 border-t border-white/12 space-y-1.5">
                    <div className="text-[11px] font-semibold text-[#E9D1C0]">
                      Aktif Servis Bölgelerimiz (Ankara)
                    </div>
                    <p className="text-xs text-[#EFE3DB] leading-relaxed">
                      {SITE_INFO.serviceDistricts.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/12 flex flex-wrap gap-4 text-[11px] text-[#EFE3DB]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E9D1C0]" aria-hidden="true" />
                      30–45 Dk Ortalama Varış
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E9D1C0]" aria-hidden="true" />
                      Garantili İşçilik
                    </span>
                  </div>
                </div>
              </div>
            </EditorialReveal>

            <EditorialReveal delay={0.14} className="lg:col-span-7 flex">
              <QuoteForm />
            </EditorialReveal>
          </div>

          {/* Full-Width Real Google Maps Interactive Location Component */}
          <LiveLocationMap />
        </div>
      </section>

      {/* SERVICE QUICK DETAIL MODAL */}
      <AnimatePresence>
        {selectedService ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-service-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: EASE_LUXURY }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-[#F9F6F4] border border-white p-5 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-medium text-[#6E1620]">
                    {selectedService.categoryLabel} · {selectedService.responseTime}
                  </span>
                  <h3
                    id="modal-service-title"
                    className="font-display text-xl sm:text-2xl font-semibold text-[#1A1312] mt-1"
                  >
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Hizmet detayını kapat"
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 rounded-full bg-white border border-[#D8CFC9] flex items-center justify-center text-[#1A1312] hover:bg-[#EAE4DF]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5 rounded-2xl overflow-hidden bg-white aspect-square flex items-center justify-center p-4">
                  <SafeImage
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="sm:col-span-7 space-y-3">
                  <p className="text-xs sm:text-sm text-[#3F3735] leading-relaxed">
                    {selectedService.details}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-[#36080D] font-medium pt-1">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                      {selectedService.warranty}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {selectedService.responseTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E1D9D3]">
                <h4 className="text-xs font-semibold text-[#1D1716] mb-2">Hizmet Kapsamımız:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#4D4644]">
                      <Check
                        className="w-3.5 h-3.5 text-[#4A0D13] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedService(null);
                    scrollToSection('iletisim');
                  }}
                  className="inline-flex items-center gap-2 rounded-full burgundy-cta px-5 py-2.5 text-xs sm:text-sm font-medium text-white"
                >
                  <span>Teklif Al</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href={buildWhatsappHref(selectedService.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1C5D36] hover:bg-[#174D2C] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp ile Destek Al</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* REAL VIDEO INTRO SHOWCASE MODAL */}
      <AnimatePresence>
        {showIntroModal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
            onClick={() => setShowIntroModal(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="intro-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: EASE_LUXURY }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl sm:rounded-3xl bg-[#190306] text-[#F8F5F2] border border-[#C8A287]/35 p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs text-[#E9D1C0]">Hilal Tesisat · Gerçek Saha Tanıtımı</span>
                  <h3
                    id="intro-modal-title"
                    className="font-display text-xl sm:text-2xl font-semibold mt-0.5"
                  >
                    15+ Yıllık Mühendislik ve Saha Gücü
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Tanıtım penceresini kapat"
                  onClick={() => setShowIntroModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 rounded-2xl overflow-hidden bg-black border border-white/15 flex justify-center">
                <video
                  src={FIELD_VIDEOS[0].src}
                  poster={FIELD_VIDEOS[0].poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[54vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowIntroModal(false);
                    scrollToSection('saha-videolari');
                  }}
                  className="text-xs font-semibold text-[#E9D1C0] hover:underline"
                >
                  Tüm Dikey Saha Videolarını İzle →
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowIntroModal(false);
                      scrollToSection('iletisim');
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#FAF4EE] text-[#230508] px-4 py-2 text-xs font-semibold"
                  >
                    <span>Keşif Randevusu Al</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <a
                    href={buildWhatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1C5D36] text-white px-4 py-2 text-xs font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

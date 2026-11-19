'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Search,
  ShieldCheck,
  Star,
  Users,
  X,
} from 'lucide-react';
import {
  buildWhatsappHref,
  FAQ_ITEMS,
  PROJECTS,
  SERVICE_CATEGORY_SHOWCASES,
  SERVICES,
  SITE_IMAGES,
  SITE_INFO,
  TESTIMONIALS,
  type ServiceCategory,
  type ServiceItem,
} from '@/lib/site-data';
import { SafeImage } from './SafeImage';
import {
  ArchitecturalMaskReveal,
  EditorialReveal,
  EASE_LUXURY,
  LuxuryInteractiveCard,
  ParallaxLayer,
  SilkRibbonParallax,
} from './MotionPrimitives';
import { HilalLogo } from './HilalLogo';
import { QuoteForm } from './QuoteForm';

const CATEGORY_TABS: { id: ServiceCategory; label: string }[] = [
  { id: 'tumu', label: 'Tümü' },
  { id: 'isitma', label: 'Isıtma' },
  { id: 'dogalgaz', label: 'Doğalgaz' },
  { id: 'su-tesisat', label: 'Su & Sıhhi' },
];

const ENGINEERING_PILLARS = [
  {
    code: '01',
    title: 'Başkentgaz Yetkili Mühendislik',
    text: 'ZetaCAD proje çizimi, sızdırmazlık testi ve resmi gaz açım süreçleri yetkili makine mühendisleri tarafından yönetilir.',
  },
  {
    code: '02',
    title: 'Kırmadan Akustik & Termal Teşhis',
    text: 'Duvar ve fayans kırmadan termal kamera, akustik dinleme ve endoskopik gider kamerası ile noktasal tespit yapılır.',
  },
  {
    code: '03',
    title: 'Şeffaf Keşif & Ön Fiyatlandırma',
    text: 'İşlem öncesinde malzeme kalitesi, kapsam ve işçilik tutarı yazılı olarak paylaşılır; sürpriz ek maliyet çıkarılmaz.',
  },
  {
    code: '04',
    title: '1–2 Yıl Yazılı İşçilik Garantisi',
    text: 'Tüm montaj ve onarım uygulamaları TSE belgeli orijinal bileşenler ve servis takip formu ile güvence altındadır.',
  },
];

export function HomeLanding() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('tumu');
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [reviewPage, setReviewPage] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [faqQuery, setFaqQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const [selectedQuoteService, setSelectedQuoteService] = useState<string>('kombi-bakimi');

  const activeProject = PROJECTS[activeProjectIdx] ?? PROJECTS[0];

  const filteredServices =
    activeCategory === 'tumu'
      ? showAllServices
        ? SERVICES
        : SERVICES.slice(0, 7)
      : SERVICES.filter((svc) => svc.category === activeCategory);

  const reviewsPerPage = 3;
  const totalReviewPages = Math.ceil(TESTIMONIALS.length / reviewsPerPage);
  const visibleReviews = showAllReviews
    ? TESTIMONIALS
    : TESTIMONIALS.slice(
        reviewPage * reviewsPerPage,
        reviewPage * reviewsPerPage + reviewsPerPage,
      );

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (!faqQuery.trim()) return true;
    const q = faqQuery.toLocaleLowerCase('tr-TR');
    return (
      item.question.toLocaleLowerCase('tr-TR').includes(q) ||
      item.answer.toLocaleLowerCase('tr-TR').includes(q) ||
      item.category.toLocaleLowerCase('tr-TR').includes(q)
    );
  });

  function scrollToSection(id: string) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function requestQuoteForService(slug: string) {
    setSelectedQuoteService(slug);
    setSelectedService(null);
    setTimeout(() => {
      scrollToSection('iletisim');
    }, 120);
  }

  function prevProject() {
    setActiveProjectIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }

  function nextProject() {
    setActiveProjectIdx((prev) => (prev + 1) % PROJECTS.length);
  }

  return (
    <div className="relative overflow-hidden bg-[#EBE7E4]">
      {/* Rich Architectural Silk & Burgundy Ribbon Texture Layer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <SafeImage
          src={SITE_IMAGES.pearlSilkBackdrop}
          alt=""
          className="w-full h-full object-cover opacity-[0.14] saturate-125"
        />
        <SilkRibbonParallax className="absolute inset-0 w-full h-full" />
      </div>

      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="relative scroll-mt-16 sm:scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#F3EEE9] via-[#EFEBE7] to-[#EBE7E4] sm:bg-none"
      >
        {/* Desktop & Tablet Full-Bleed Panoramic Architectural Canvas */}
        <div className="hidden sm:block absolute inset-0 z-0">
          <SafeImage
            src={SITE_IMAGES.heroVilla}
            alt="Hilal Tesisat Modern Mimari Doğalgaz ve Mekanik Tesisat Projesi"
            className="w-full h-full object-cover object-center contrast-[1.03] saturate-[1.06]"
          />
          {/* Minimal edge blend on leftmost 28% only — preserves glowing Crescent, Mansion, Ribbon & HİLAL TESİSAT facade logo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#F3EDE7]/80 via-[#F3EDE7]/28 via-30% to-transparent"
          />
          {/* Deep feathered bottom dissolve so mirror pool blends seamlessly into pearl backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-t from-[#EBE7E4] via-[#EBE7E4]/82 via-35% to-transparent"
          />
        </div>

        {/* Content & Mobile Dedicated Scenic Showcase */}
        <div className="relative z-10 mx-auto max-w-[1280px] w-full px-3.5 sm:px-6 lg:px-8 pt-5 pb-4 sm:py-16 lg:py-24 sm:min-h-[640px] lg:min-h-[750px] flex flex-col justify-center">
          <div className="max-w-full sm:max-w-[545px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_LUXURY }}
              className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4"
            >
              <span className="h-[1px] w-6 sm:w-10 bg-[#8C5B4D]" aria-hidden="true" />
              <span className="text-[11px] sm:text-[13px] font-medium tracking-wide text-[#5E4540]">
                Profesyonel Tesisat Çözümleri
              </span>
            </motion.div>

            <ArchitecturalMaskReveal delay={0.05}>
              <h1 className="font-display text-[32px] sm:text-[50px] lg:text-[62px] font-semibold leading-[1.04] tracking-[-0.015em] text-[#1D1716] text-balance max-w-[340px] sm:max-w-none">
                Hayatınızı Güvenle Akıtan Teknoloji
              </h1>
            </ArchitecturalMaskReveal>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: EASE_LUXURY }}
              className="mt-2 sm:mt-4 text-[12px] sm:text-[15px] leading-relaxed text-[#3F3735] max-w-[330px] sm:max-w-[445px]"
            >
              <strong className="font-semibold text-[#1D1716]">HİLAL TESİSAT</strong> olarak,
              doğalgazdan su tesisatına, ısıtma sistemlerinden bakım-onarıma kadar tüm çözümlerde
              yanınızdayız.
            </motion.p>

            {/* Primary CTA + Minimalist WhatsApp + Intro Video */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: EASE_LUXURY }}
              className="mt-4 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3.5"
            >
              <button
                type="button"
                onClick={() => scrollToSection('projelerimiz')}
                className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full burgundy-cta pl-4 pr-2 py-2 sm:pl-6 sm:pr-2.5 sm:py-2.5 text-[11px] sm:text-sm font-medium text-[#FAF7F5] whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span>Projelerimizi Keşfedin</span>
                <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/15">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                </span>
              </button>

              <a
                href={buildWhatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#1C5D36]/30 bg-white/90 hover:bg-[#1C5D36] text-[#1C5D36] hover:text-white px-3.5 py-2 sm:px-4.5 sm:py-2.5 text-[11px] sm:text-xs font-semibold shadow-sm backdrop-blur-sm whitespace-nowrap transition-colors duration-150"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowIntroModal(true)}
                className="group inline-flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119] rounded-full pr-1.5 py-0.5"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#D8CFC9] shadow-sm text-[#4A0D13] group-hover:scale-105 transition-transform duration-150">
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#4A0D13] ml-0.5" aria-hidden="true" />
                </span>
                <span className="text-[10.5px] sm:text-xs font-semibold leading-tight text-[#2B2321]">
                  Tanıtım Filmi
                  <br />
                  <span className="font-normal text-[#5C5350]">İzle</span>
                </span>
              </button>
            </motion.div>

            {/* Mobile Uncropped Full Panoramic Villa + Moon + HİLAL TESİSAT Showcase */}
            <div className="sm:hidden mt-4 relative">
              <div className="rounded-2xl overflow-hidden border border-white shadow-[0_22px_48px_-18px_rgba(38,12,14,0.32)] aspect-[16/9.2] bg-[#EAE4DF]">
                <SafeImage
                  src={SITE_IMAGES.heroVilla}
                  alt="Hilal Tesisat Modern Mimari Villa ve Marka Cephesi"
                  className="w-full h-full object-cover object-center contrast-[1.03] saturate-[1.06]"
                />
              </div>
            </div>

            {/* Frosted Pearl Stats Dock (anchored below visual on mobile, grounded left on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: EASE_LUXURY }}
              className="relative z-10 -mt-5 mx-2 sm:mx-0 sm:mt-10 lg:mt-14 pearl-glass rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-5 sm:py-4 grid grid-cols-3 gap-2 sm:gap-5 max-w-full sm:max-w-[495px]"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-[#4A0D13]/10 text-[#4A0D13] shrink-0">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="font-sans text-sm sm:text-2xl font-bold tracking-tight leading-none text-[#1D1716] tabular-nums">
                    {SITE_INFO.experienceYears}
                  </div>
                  <div className="mt-0.5 text-[9px] sm:text-[11px] text-[#57504D] leading-tight">
                    Yıllık Tecrübe
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 border-l border-[#D8D0CA] pl-2 sm:pl-4">
                <span className="inline-flex items-center justify-center w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-[#4A0D13]/10 text-[#4A0D13] shrink-0">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="font-sans text-sm sm:text-2xl font-bold tracking-tight leading-none text-[#1D1716] tabular-nums">
                    {SITE_INFO.happyClients}
                  </div>
                  <div className="mt-0.5 text-[9px] sm:text-[11px] text-[#57504D] leading-tight">
                    Mutlu Müşteri
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 border-l border-[#D8D0CA] pl-2 sm:pl-4">
                <span className="inline-flex items-center justify-center w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-[#4A0D13]/10 text-[#4A0D13] shrink-0">
                  <Headphones className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="font-sans text-sm sm:text-2xl font-bold tracking-tight leading-none text-[#1D1716] tabular-nums">
                    {SITE_INFO.supportHours}
                  </div>
                  <div className="mt-0.5 text-[9px] sm:text-[11px] text-[#57504D] leading-tight">
                    Teknik Destek
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. HİZMETLERİMİZ (SINGLE-PAGE FILTERABLE 4x2 CARDS + WATER SPLASH) */}
      <section
        id="hizmetler"
        className="relative scroll-mt-16 sm:scroll-mt-20 z-10 py-10 sm:py-18 lg:py-24 overflow-hidden"
      >
        <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-start">
            {/* Left Intro + Category Filter + Minimalist WP + Water Splash */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <EditorialReveal>
                <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                  <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#7A353B]">
                    Hizmetlerimiz
                  </span>
                  <span className="h-[1px] w-12 sm:w-16 bg-[#B99E96]" aria-hidden="true" />
                </div>
                <h2 className="font-display text-2xl sm:text-[36px] lg:text-[40px] font-semibold leading-[1.12] text-[#1D1716] text-balance">
                  Profesyonel Tesisat Hizmetleri
                </h2>
                <p className="mt-2 sm:mt-4 text-xs sm:text-[15px] leading-relaxed text-[#514946]">
                  {SERVICE_CATEGORY_SHOWCASES[activeCategory].description}
                </p>

                {/* Minimalist Filter Switch */}
                <div className="mt-3.5 flex flex-wrap gap-1.5" role="group" aria-label="Hizmet kategorileri">
                  {CATEGORY_TABS.map((tab) => {
                    const active = activeCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveCategory(tab.id);
                          setShowAllServices(tab.id !== 'tumu');
                        }}
                        className={`rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium transition-colors ${
                          active
                            ? 'bg-[#4A0D13] text-white'
                            : 'bg-white/80 text-[#4D4644] border border-[#D8CFC9] hover:border-[#4A0D13]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Minimalist Quick Contact & WhatsApp Row */}
                <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection('iletisim')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-[#D8CFC9] px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#2A1F1D] shadow-sm hover:border-[#4A0D13] hover:text-[#4A0D13] transition-colors"
                  >
                    <span>Teklif Formu</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </button>

                  <a
                    href={buildWhatsappHref('Tesisat hizmetleri')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1C5D36]/30 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#1C5D36] hover:bg-[#1C5D36] hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>WhatsApp’tan Fiyat Sor</span>
                  </a>
                </div>
              </EditorialReveal>

              <ParallaxLayer offset={14} className="mt-4 lg:mt-5 flex justify-start">
                <div className="overflow-hidden mix-blend-multiply max-w-[180px] sm:max-w-[260px] lg:max-w-[330px] [mask-image:radial-gradient(closest-side,black_52%,transparent_94%)]">
                  <SafeImage
                    src={SITE_IMAGES.waterSplash}
                    alt="Kristal berraklığında su tesisatı akış görseli"
                    className="w-full h-auto object-cover brightness-[1.06] contrast-[1.08] saturate-[1.16]"
                  />
                </div>
              </ParallaxLayer>
            </div>

            {/* Right 4x2 Seamless Pearl Service Cards */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              {filteredServices.map((service, index) => (
                <EditorialReveal key={service.slug} delay={index * 0.03} y={10}>
                  <LuxuryInteractiveCard className="h-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/95 to-[#EFEBE8]/92 border border-white ring-1 ring-[#DFD6CE]/55 shadow-[0_12px_30px_-16px_rgba(54,8,13,0.18)] hover:shadow-[0_22px_40px_-18px_rgba(74,13,19,0.28)]">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="group w-full h-full text-center p-2.5 sm:p-4 flex flex-col items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119] rounded-xl sm:rounded-2xl"
                    >
                      <div className="w-full aspect-[4/3] sm:aspect-square flex items-center justify-center overflow-hidden mb-1.5 sm:mb-2.5">
                        <SafeImage
                          src={service.image}
                          alt={service.title}
                          className="w-[88%] h-[88%] object-contain mix-blend-multiply contrast-[1.08] saturate-[1.12] [mask-image:radial-gradient(closest-side,black_58%,transparent_96%)] transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="text-[11px] sm:text-[13px] font-semibold leading-tight text-[#251E1D] group-hover:text-[#4A0D13] transition-colors">
                        {service.shortTitle}
                      </span>
                    </button>
                  </LuxuryInteractiveCard>
                </EditorialReveal>
              ))}

              {/* 8th Card: Toggle All Services Inline when default 4x2 is compact */}
              {activeCategory === 'tumu' && !showAllServices ? (
                <EditorialReveal delay={0.24} y={10}>
                  <LuxuryInteractiveCard className="h-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/95 to-[#EFEBE8]/92 border border-white ring-1 ring-[#DFD6CE]/55 shadow-[0_12px_30px_-16px_rgba(54,8,13,0.18)] hover:border-[#4A0D13]/35">
                    <button
                      type="button"
                      onClick={() => setShowAllServices(true)}
                      className="group w-full h-full text-center p-2.5 sm:p-4 flex flex-col items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E1119] rounded-xl sm:rounded-2xl"
                    >
                      <div className="w-full aspect-[4/3] sm:aspect-square flex items-center justify-center overflow-hidden mb-1.5 sm:mb-2.5">
                        <SafeImage
                          src={SITE_IMAGES.serviceDrainTurbine}
                          alt="Tüm Tesisat Çözümleri"
                          className="w-[86%] h-[86%] object-contain mix-blend-multiply contrast-[1.08] saturate-[1.12] [mask-image:radial-gradient(closest-side,black_58%,transparent_96%)] transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] sm:text-[13px] font-semibold text-[#4A0D13]">
                        <span>Daha Fazlası</span>
                        <ArrowRight
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </LuxuryInteractiveCard>
                </EditorialReveal>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJELERİMİZ (ORGANIC ARCHED PHOTO + OVERLAPPING 4 THUMBNAILS + INLINE SPEC) */}
      <section
        id="projelerimiz"
        className="relative scroll-mt-16 sm:scroll-mt-20 z-10 py-10 sm:py-18 lg:py-24"
      >
        <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <EditorialReveal className="lg:col-span-4 space-y-2.5 sm:space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#7A353B]">
                  Projelerimiz
                </span>
                <span className="h-[1px] w-12 sm:w-16 bg-[#B99E96]" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl sm:text-[36px] lg:text-[40px] font-semibold leading-[1.12] text-[#1D1716] text-balance">
                Gerçekleştirdiğimiz Özel Projeler
              </h2>
              <p className="text-xs sm:text-[15px] leading-relaxed text-[#514946]">
                Kaliteyi ve güveni bir araya getirdiğimiz projelerimizle yaşam alanlarınıza değer
                katıyoruz.
              </p>

              <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('iletisim')}
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#D8CFC9] px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#2A1F1D] shadow-sm hover:border-[#4A0D13] hover:text-[#4A0D13] transition-colors"
                >
                  <span>Proje Keşfi İste</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                </button>

                <a
                  href={buildWhatsappHref(activeProject.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1C5D36]/30 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#1C5D36] hover:bg-[#1C5D36] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp Bilgi Al</span>
                </a>
              </div>
            </EditorialReveal>

            {/* Right Clean Organic Showcase + Overlapping 4 Thumbnails */}
            <div className="lg:col-span-8 relative">
              <div className="relative rounded-tl-[76px] rounded-bl-[56px] rounded-tr-[24px] rounded-br-[24px] sm:rounded-tl-[175px] sm:rounded-bl-[125px] sm:rounded-tr-[36px] sm:rounded-br-[36px] overflow-hidden shadow-[0_26px_60px_-28px_rgba(38,12,14,0.34)] border-2 border-white/85 bg-[#E7E1DC] aspect-[16/9.5]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0.45, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.45 }}
                    transition={{ duration: 0.35, ease: EASE_LUXURY }}
                    className="absolute inset-0"
                  >
                    <SafeImage
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Overlapping 4-Thumbnail Strip */}
              <div className="relative z-10 -mt-7 sm:-mt-14 mx-1 sm:mx-8 flex items-center gap-1.5 sm:gap-3">
                <button
                  type="button"
                  onClick={prevProject}
                  aria-label="Önceki proje"
                  className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#36080D] text-white shadow-md hover:bg-[#5E1119] transition-colors shrink-0"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <div className="grid grid-cols-4 gap-1.5 sm:gap-3 flex-1">
                  {PROJECTS.map((proj, idx) => {
                    const isSelected = idx === activeProjectIdx;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => setActiveProjectIdx(idx)}
                        aria-label={`${proj.title} projesini göster`}
                        aria-pressed={isSelected}
                        className={`relative rounded-lg sm:rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all duration-200 shadow-lg ${
                          isSelected
                            ? 'border-[#5E1119] scale-[1.03]'
                            : 'border-white opacity-90 hover:opacity-100'
                        }`}
                      >
                        <SafeImage
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Sonraki proje"
                  className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#36080D] text-white shadow-md hover:bg-[#5E1119] transition-colors shrink-0"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Pagination Dots + Project Metadata Summary */}
              <div className="mt-3 flex flex-col items-center gap-1.5 text-center">
                <div className="flex items-center gap-1.5">
                  {PROJECTS.map((proj, idx) => (
                    <button
                      key={proj.id}
                      type="button"
                      aria-label={`${idx + 1}. projeyi seç`}
                      onClick={() => setActiveProjectIdx(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeProjectIdx
                          ? 'w-5 bg-[#4A0D13]'
                          : 'w-1.5 bg-[#C5BBB4] hover:bg-[#8E7D76]'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] sm:text-xs text-[#23191A] font-medium">
                  {activeProject.title} ·{' '}
                  <span className="text-[#554D4A] font-normal">{activeProject.location}</span>
                </p>
                <p className="text-[11px] text-[#57504D] max-w-xl leading-relaxed">
                  {activeProject.description}
                </p>
                <p className="text-[10.5px] sm:text-[11px] text-[#7A353B] font-medium">
                  {activeProject.metrics.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KURUMSAL / NEDEN HİLAL TESİSAT? */}
      <section
        id="kurumsal"
        className="relative scroll-mt-16 sm:scroll-mt-20 z-10 py-10 sm:py-18 lg:py-24 overflow-hidden"
      >
        <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Left: Seamless 3D H Sculpture on Crystal Pedestal */}
            <div className="lg:col-span-4 flex justify-center">
              <ParallaxLayer offset={14} className="w-[210px] sm:w-[300px] lg:w-[340px]">
                <div className="mix-blend-multiply [mask-image:radial-gradient(closest-side,black_66%,transparent_98%)]">
                  <SafeImage
                    src={SITE_IMAGES.emblemMetal}
                    alt="Hilal Tesisat 3D Metalik Amblem"
                    className="w-full aspect-square object-contain contrast-[1.06] saturate-[1.12]"
                  />
                </div>
              </ParallaxLayer>
            </div>

            {/* Center: Checklist & CTA */}
            <EditorialReveal className="lg:col-span-4 space-y-3 sm:space-y-5">
              <h2 className="font-display text-2xl sm:text-[36px] lg:text-[42px] font-semibold leading-[1.1] text-[#1D1716]">
                Neden Hilal Tesisat?
              </h2>
              <p className="text-xs sm:text-[15px] leading-relaxed text-[#514946]">
                Deneyim, kalite ve güvenin adresi olan Hilal Tesisat, her projede en iyisini sunmak
                için çalışıyor.
              </p>

              <ul className="space-y-2 sm:space-y-3 pt-0.5">
                {[
                  'Uzman ve Deneyimli Kadro',
                  '7/24 Teknik Destek',
                  'Garantili Hizmet',
                  'Uygun Fiyat Politikası',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium text-[#2A2220]"
                  >
                    <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#4A0D13] text-white shrink-0">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-1.5 sm:pt-3 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => scrollToSection('iletisim')}
                  className="inline-flex items-center gap-2 rounded-full burgundy-cta px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  <span>Ekibimizle Tanışın</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </button>

                <a
                  href={buildWhatsappHref('Kurumsal teklif ve bilgi')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1C5D36]/30 bg-white/90 px-4 py-2 sm:py-3 text-xs font-semibold text-[#1C5D36] hover:bg-[#1C5D36] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </EditorialReveal>

            {/* Right: Frosted Glass Card with Rear Technician + Uniform Crest + Signature */}
            <EditorialReveal delay={0.08} className="lg:col-span-4">
              <div className="pearl-glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative overflow-hidden min-h-[195px] sm:min-h-[290px] flex flex-col justify-between">
                <div className="relative z-10 space-y-3 sm:space-y-4 max-w-[55%]">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#4A0D13]/10 text-[#4A0D13] shrink-0">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="font-sans text-lg sm:text-2xl font-bold tracking-tight text-[#1D1716] leading-none tabular-nums">
                        15+
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-[#5A5350]">Yıllık Tecrübe</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#4A0D13]/10 text-[#4A0D13] shrink-0">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="font-sans text-lg sm:text-2xl font-bold tracking-tight text-[#1D1716] leading-none tabular-nums">
                        1000+
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-[#5A5350]">Mutlu Müşteri</div>
                    </div>
                  </div>
                </div>

                {/* Rear-view Technician seamlessly blended on right */}
                <div className="absolute right-0 bottom-0 top-1 w-[52%] pointer-events-none flex justify-end">
                  <div className="relative w-full h-full">
                    <SafeImage
                      src={SITE_IMAGES.technicianPortrait}
                      alt="Hilal Tesisat Uzman Tekniker"
                      className="w-full h-full object-cover object-top mix-blend-multiply [mask-image:linear-gradient(to_right,transparent_0%,black_32%,black_100%)]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute top-[30%] left-[56%] -translate-x-1/2 scale-[0.30] sm:scale-[0.38] opacity-80 pointer-events-none"
                    >
                      <HilalLogo variant="light" />
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-5 sm:pt-8">
                  <span className="font-display italic text-base sm:text-xl text-[#4A0D13]/85">
                    Hilal Tesisat
                  </span>
                </div>
              </div>
            </EditorialReveal>
          </div>

          {/* Minimalist Horizontal 4-Pillar Hairline Strip */}
          <div className="mt-10 sm:mt-14 pt-7 sm:pt-9 border-t border-[#D6CEC8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {ENGINEERING_PILLARS.map((pillar) => (
              <div key={pillar.code} className="group space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-bold tracking-widest text-[#7A353B] tabular-nums">
                    {pillar.code}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-[1.5px] w-7 bg-[#C8A287] group-hover:w-12 group-hover:bg-[#5E1119] transition-all duration-300"
                  />
                </div>
                <h3 className="font-display text-lg sm:text-[19px] font-semibold text-[#1D1716] leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#57504D]">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DARK BURGUNDY S-CURVE WAVE CONTACT BAND */}
      <section className="relative z-10 py-14 sm:py-20 lg:py-24 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="contactWaveBg" x1="0" y1="0" x2="1" y2="0.4">
                <stop offset="0%" stopColor="#2A0509" />
                <stop offset="48%" stopColor="#521017" />
                <stop offset="100%" stopColor="#210306" />
              </linearGradient>
            </defs>
            <path
              d="M0,18 C360,92 840,-20 1440,56 L1440,368 C1020,425 460,310 0,388 Z"
              fill="url(#contactWaveBg)"
            />
            <path
              d="M0,32 C380,104 860,-4 1440,68"
              fill="none"
              stroke="#C8A287"
              strokeWidth="1.6"
              opacity="0.55"
            />
            <path
              d="M0,374 C460,298 1020,410 1440,354"
              fill="none"
              stroke="#C8A287"
              strokeWidth="1.4"
              opacity="0.45"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8 text-[#F8F5F2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Left Copy */}
            <EditorialReveal className="lg:col-span-5 space-y-2.5 sm:space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] sm:text-xs font-medium text-[#E5CFC1]">
                  Hemen İletişime Geçin
                </span>
                <span className="h-[1px] w-12 sm:w-14 bg-[#C8A287]/60" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl sm:text-[36px] lg:text-[40px] font-semibold leading-[1.12] text-white text-balance">
                Uzman Ekibimizle Her Zaman Yanınızdayız
              </h2>
              <p className="text-xs sm:text-sm text-[#DFD3CC] leading-relaxed max-w-md">
                Teklif almak, bilgi edinmek ya da destek talebinde bulunmak için bizimle iletişime
                geçin.
              </p>
              <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => scrollToSection('iletisim')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#F8F5F2] text-[#2A060A] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold shadow-lg hover:bg-white transition-transform hover:-translate-y-0.5"
                >
                  <span>Teklif Formuna Git</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </button>

                <a
                  href={buildWhatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1C5D36] hover:bg-[#174D2C] text-white border border-white/20 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </EditorialReveal>

            {/* Center Contact Details */}
            <EditorialReveal delay={0.08} className="lg:col-span-4 space-y-3 sm:space-y-4">
              <a
                href={SITE_INFO.phoneHref}
                className="flex items-center gap-3 sm:gap-4 group rounded-2xl p-1.5 -m-1.5 hover:bg-white/5 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-[#C8A287]/45 text-[#E9D1C0] shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white tabular-nums group-hover:text-[#E9D1C0] transition-colors">
                    {SITE_INFO.phoneDisplay}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#CBB8AE]">7/24 Telefon Hattı</div>
                </div>
              </a>

              <a
                href={buildWhatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 group rounded-2xl p-1.5 -m-1.5 hover:bg-white/5 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1C5D36]/80 border border-white/25 text-white shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white group-hover:text-[#AEE5C2] transition-colors">
                    WhatsApp Destek
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#CBB8AE]">Fotoğraf Gönder & Anında Teklif Al</div>
                </div>
              </a>

              <a
                href={`mailto:${SITE_INFO.email}`}
                className="flex items-center gap-3 sm:gap-4 group rounded-2xl p-1.5 -m-1.5 hover:bg-white/5 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-[#C8A287]/45 text-[#E9D1C0] shrink-0">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white group-hover:text-[#E9D1C0] transition-colors">
                    {SITE_INFO.email}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#CBB8AE]">E-posta Adresimiz</div>
                </div>
              </a>

              <div className="flex items-center gap-3 sm:gap-4 p-1.5 -m-1.5">
                <span className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-[#C8A287]/45 text-[#E9D1C0] shrink-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white">
                    {SITE_INFO.addressLine1}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#CBB8AE]">
                    {SITE_INFO.addressLine2}
                  </div>
                </div>
              </div>
            </EditorialReveal>

            {/* Right 3D Orbital Phone Render */}
            <div className="lg:col-span-3 flex justify-center">
              <ParallaxLayer offset={14} className="w-32 sm:w-52 lg:w-60">
                <div className="rounded-full overflow-hidden border border-[#C8A287]/50 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] ring-4 sm:ring-8 ring-white/10">
                  <SafeImage
                    src={SITE_IMAGES.phoneOrbital}
                    alt="Hilal Tesisat 7/24 Destek Hattı"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </ParallaxLayer>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MÜŞTERİLERİMİZİN GÖRÜŞLERİ */}
      <section className="relative z-10 py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
            {/* Left Intro */}
            <EditorialReveal className="lg:col-span-4 space-y-2.5 sm:space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#7A353B]">
                  Müşteri Yorumları
                </span>
                <span className="h-[1px] w-12 sm:w-16 bg-[#B99E96]" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl sm:text-[36px] lg:text-[40px] font-semibold leading-[1.12] text-[#1D1716] text-balance">
                Müşterilerimizin Görüşleri
              </h2>
              <p className="text-xs sm:text-[15px] leading-relaxed text-[#514946]">
                Bizi tercih eden değerli müşterilerimizin memnuniyeti, en büyük motivasyonumuzdur.
              </p>
              <div className="pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={() => setShowAllReviews((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full burgundy-cta px-4 py-2 sm:px-6 sm:py-3 text-[11px] sm:text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  <span>{showAllReviews ? 'Özet Görünüme Dön' : `Tüm Yorumları Gör (${TESTIMONIALS.length})`}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </button>
              </div>
            </EditorialReveal>

            {/* Right Review Grid / Carousel */}
            <div className="lg:col-span-8">
              {!showAllReviews ? (
                <div className="flex items-center justify-end gap-2 mb-3 sm:mb-4">
                  <button
                    type="button"
                    onClick={() =>
                      setReviewPage((prev) => (prev - 1 + totalReviewPages) % totalReviewPages)
                    }
                    aria-label="Önceki yorumlar"
                    className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/85 border border-[#D8CFC9] text-[#2A1F1D] hover:border-[#4A0D13] hover:text-[#4A0D13] transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewPage((prev) => (prev + 1) % totalReviewPages)}
                    aria-label="Sonraki yorumlar"
                    className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/85 border border-[#D8CFC9] text-[#2A1F1D] hover:border-[#4A0D13] hover:text-[#4A0D13] transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-stretch">
                {visibleReviews.map((review) => (
                  <LuxuryInteractiveCard
                    key={review.id}
                    className="pearl-glass rounded-xl sm:rounded-2xl h-full min-h-[195px] sm:min-h-[220px]"
                  >
                    <article className="h-full p-3.5 sm:p-5 flex flex-col justify-between space-y-3 sm:space-y-4">
                      <div>
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white shadow-sm shrink-0">
                            <SafeImage
                              src={review.avatar}
                              alt={review.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-semibold text-[#1D1716] truncate">
                              {review.name}
                            </h3>
                            <p className="text-[10.5px] sm:text-xs text-[#6B625E] truncate">
                              {review.district} · {review.service}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2.5 sm:mt-4 text-[11.5px] sm:text-[13px] leading-relaxed text-[#423B39]">
                          “{review.quote}”
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E6DFDA]/70">
                        <div
                          className="flex items-center gap-0.5 sm:gap-1"
                          aria-label={`${review.rating} üzerinden 5 yıldız`}
                        >
                          {Array.from({ length: review.rating }).map((_, idx) => (
                            <Star
                              key={idx}
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#7D1A23] text-[#7D1A23]"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-medium text-[#7A6F6A]">
                          Doğrulanmış Hizmet
                        </span>
                      </div>
                    </article>
                  </LuxuryInteractiveCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SIKÇA SORULAN SORULAR (SINGLE-PAGE INTEGRATED ACCORDION) */}
      <section
        id="sss"
        className="relative scroll-mt-16 sm:scroll-mt-20 z-10 py-10 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
            {/* Left Intro & Search */}
            <EditorialReveal className="lg:col-span-4 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#7A353B]">
                  Sıkça Sorulan Sorular
                </span>
                <span className="h-[1px] w-12 sm:w-16 bg-[#B99E96]" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl sm:text-[36px] lg:text-[40px] font-semibold leading-[1.12] text-[#1D1716] text-balance">
                Merak Edilen Teknik Detaylar
              </h2>
              <p className="text-xs sm:text-[15px] leading-relaxed text-[#514946]">
                Kombi bakımı, Başkentgaz proje süreci, garanti süresi ve kırmadan kaçak tespiti
                hakkında sık sorulan sorular.
              </p>

              <div className="relative pt-1">
                <label htmlFor="home-faq-search" className="sr-only">
                  Sorularda ara
                </label>
                <Search
                  className="w-4 h-4 text-[#7A6F6A] absolute left-3.5 top-1/2 -translate-y-1/2 mt-0.5 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="home-faq-search"
                  type="search"
                  value={faqQuery}
                  onChange={(e) => setFaqQuery(e.target.value)}
                  placeholder="Örn: Başkentgaz, kombi, kaçak..."
                  className="w-full rounded-full bg-white/90 border border-[#D4CBC4] pl-10 pr-4 py-2 text-xs sm:text-sm text-[#1B1817] placeholder:text-[#7B7370] focus:outline-none focus:ring-2 focus:ring-[#5E1119]"
                />
              </div>

              <div className="pt-1">
                <a
                  href={buildWhatsappHref('Teknik soru sormak istiyorum')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C5D36] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Cevabını bulamadınız mı? WhatsApp’tan sorun →</span>
                </a>
              </div>
            </EditorialReveal>

            {/* Right Accordion */}
            <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
              {filteredFaqs.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className="pearl-glass rounded-xl sm:rounded-2xl border border-white/85 overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                      className="w-full text-left px-4 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between gap-4 hover:bg-white/40 transition-colors"
                    >
                      <div>
                        <span className="block text-[10px] sm:text-[11px] font-medium text-[#7A353B] mb-0.5">
                          {item.category}
                        </span>
                        <span className="font-display text-base sm:text-xl font-semibold text-[#1D1716]">
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-[#4A0D13] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: EASE_LUXURY }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 sm:px-6 sm:pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-[#4D4644] border-t border-[#E4DCD6]/60 mt-1">
                            {item.answer}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredFaqs.length === 0 ? (
                <div className="pearl-glass rounded-2xl p-6 text-center text-xs sm:text-sm text-[#57504D]">
                  Aramanızla eşleşen soru bulunamadı.{' '}
                  <a
                    href={buildWhatsappHref(faqQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1C5D36] underline"
                  >
                    WhatsApp’tan direkt uzmanımıza sorabilirsiniz.
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 8. İLETİŞİM & ÜCRETSİZ KEŞİF FORMU (SINGLE-PAGE CONVERSION HUB) */}
      <section
        id="iletisim"
        className="relative scroll-mt-16 sm:scroll-mt-20 z-10 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pb-20"
      >
        <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left Dark Burgundy Ankara Dispatch Card */}
            <EditorialReveal className="lg:col-span-5 flex">
              <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#2B0509] via-[#4A0D13] to-[#210306] text-[#F8F5F2] border border-[#C8A287]/35 shadow-[0_24px_60px_-24px_rgba(38,5,9,0.55)] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] sm:text-xs font-medium text-[#E5CFC1]">
                      7/24 Ankara Mobil Ekip
                    </span>
                    <span className="h-[1px] w-12 bg-[#C8A287]/60" aria-hidden="true" />
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
                    Doğrudan Uzmanıyla İletişime Geçin
                  </h2>

                  <p className="text-xs sm:text-sm text-[#DFD3CC] leading-relaxed">
                    Ücretsiz keşif randevusu, acil arıza müdahalesi veya WhatsApp üzerinden fotoğraf
                    göndererek hızlı fiyat bilgisi almak için dilediğiniz kanalı kullanabilirsiniz.
                  </p>

                  <div className="space-y-3 pt-1">
                    <a
                      href={SITE_INFO.phoneHref}
                      className="flex items-center gap-3 rounded-2xl bg-white/8 hover:bg-white/14 border border-white/12 px-4 py-3 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#E9D1C0] shrink-0" aria-hidden="true" />
                      <div>
                        <div className="text-sm font-semibold tabular-nums whitespace-nowrap">
                          {SITE_INFO.phoneDisplay}
                        </div>
                        <div className="text-[11px] text-[#CBB8AE]">7/24 Acil Telefon Hattı</div>
                      </div>
                    </a>

                    <a
                      href={buildWhatsappHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-2xl bg-[#1C5D36] hover:bg-[#174D2C] border border-white/20 px-4 py-3 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-white shrink-0" aria-hidden="true" />
                      <div>
                        <div className="text-sm font-semibold text-white">WhatsApp 7/24 Destek</div>
                        <div className="text-[11px] text-[#D2F0DD]">Konum & arıza görseli paylaşın</div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${SITE_INFO.email}`}
                      className="flex items-center gap-3 rounded-2xl bg-white/8 hover:bg-white/14 border border-white/12 px-4 py-3 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#E9D1C0] shrink-0" aria-hidden="true" />
                      <div>
                        <div className="text-sm font-semibold break-all">{SITE_INFO.email}</div>
                        <div className="text-[11px] text-[#CBB8AE]">Proje & Kurumsal Teklif</div>
                      </div>
                    </a>

                    <div className="flex items-start gap-3 px-2 pt-1 text-xs text-[#DFD3CC]">
                      <MapPin className="w-4 h-4 text-[#E9D1C0] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{SITE_INFO.fullAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Technical Commitment & Coverage Footer matching QuoteForm baseline */}
                <div className="space-y-4 pt-4 border-t border-white/15">
                  <div>
                    <div className="text-[11px] font-semibold text-[#E9D1C0] mb-1.5">
                      Ankara Aktif Hizmet Bölgelerimiz
                    </div>
                    <p className="text-[11px] text-[#DFD3CC] leading-relaxed">
                      {SITE_INFO.serviceDistricts.join(' · ')}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                    <div className="rounded-xl bg-white/6 px-2 py-2.5">
                      <div className="text-xs sm:text-sm font-bold text-white tabular-nums">30–45 dk</div>
                      <div className="text-[10px] text-[#CBB8AE] mt-0.5">Mobil Müdahale</div>
                    </div>
                    <div className="rounded-xl bg-white/6 px-2 py-2.5">
                      <div className="text-xs sm:text-sm font-bold text-white">1–2 Yıl</div>
                      <div className="text-[10px] text-[#CBB8AE] mt-0.5">İşçilik Garantisi</div>
                    </div>
                    <div className="rounded-xl bg-white/6 px-2 py-2.5">
                      <div className="text-xs sm:text-sm font-bold text-white">Başkentgaz</div>
                      <div className="text-[10px] text-[#CBB8AE] mt-0.5">Yetkili Firma</div>
                    </div>
                  </div>
                </div>
              </div>
            </EditorialReveal>

            {/* Right Validated QuoteForm */}
            <div className="lg:col-span-7 flex">
              <QuoteForm key={selectedQuoteService} defaultServiceSlug={selectedQuoteService} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE QUICK DETAIL MODAL */}
      <AnimatePresence>
        {selectedService ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
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
              className="w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-[#F7F5F3] border border-white p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] sm:text-xs font-medium text-[#7A353B]">
                    {selectedService.categoryLabel} · {selectedService.responseTime}
                  </span>
                  <h3
                    id="modal-service-title"
                    className="font-display text-xl sm:text-3xl font-semibold text-[#1D1716] mt-1"
                  >
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Hizmet detayını kapat"
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#D8CFC9] flex items-center justify-center text-[#1D1716] hover:bg-[#EAE4DF]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center">
                <div className="sm:col-span-5 rounded-2xl overflow-hidden bg-white aspect-square flex items-center justify-center p-4">
                  <SafeImage
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="sm:col-span-7 space-y-3">
                  <p className="text-xs sm:text-sm text-[#423B39] leading-relaxed">
                    {selectedService.details}
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs text-[#36080D] font-medium pt-1">
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

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => requestQuoteForService(selectedService.slug)}
                  className="inline-flex items-center gap-2 rounded-full burgundy-cta px-5 py-2.5 text-xs sm:text-sm font-medium text-white"
                >
                  <span>Formdan Teklif Al</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href={buildWhatsappHref(selectedService.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1C5D36] hover:bg-[#174D2C] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp’tan Hemen Yaz</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* INTRO SHOWCASE MODAL */}
      <AnimatePresence>
        {showIntroModal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
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
              className="w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-[#1D0407] text-[#F8F5F2] border border-[#C8A287]/35 p-5 sm:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs text-[#C8A287]">Hilal Tesisat · Kurumsal Tanıtım</span>
                  <h3
                    id="intro-modal-title"
                    className="font-display text-xl sm:text-3xl font-semibold mt-1"
                  >
                    15+ Yıllık Mühendislik ve Saha Gücü
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Tanıtım penceresini kapat"
                  onClick={() => setShowIntroModal(false)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 rounded-2xl overflow-hidden aspect-video relative border border-white/15">
                <SafeImage
                  src={SITE_IMAGES.projectBoilerBathroom}
                  alt="Hilal Tesisat Uygulama Standartları"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-4 sm:p-5">
                  <p className="text-xs sm:text-sm text-[#EFECE9] leading-relaxed">
                    Başkentgaz onaylı doğalgaz iç tesisatı, termal kameralı kaçak tespiti, darbeli
                    petek temizliği ve anahtar teslim mekanik çözümler ile Ankara’nın her
                    noktasındayız.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-[11px] sm:text-xs text-[#D6C5BA]">
                  <span>✓ TSE & Yetkili Servis Standartları</span>
                  <span>✓ 7/24 Acil Müdahale</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowIntroModal(false);
                      setTimeout(() => scrollToSection('iletisim'), 120);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#F8F5F2] text-[#230508] px-4 py-2 text-xs font-semibold"
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

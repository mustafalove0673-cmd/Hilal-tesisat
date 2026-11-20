'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { buildWhatsappHref, FIELD_VIDEOS, SITE_IMAGES, SITE_INFO } from '@/lib/site-data';
import {
  EASE_LUXURY,
  EditorialReveal,
  MagneticAction,
  SplitTextReveal,
  SPRING_ARCHITECTURAL,
} from './MotionPrimitives';
import { SafeImage } from './SafeImage';

export function FieldReelsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const phoneY = useTransform(smoothScroll, [0, 1], [38, -38]);
  const phoneRotateY = useTransform(smoothScroll, [0, 0.5, 1], [-10, 0, 9]);
  const phoneRotateZ = useTransform(smoothScroll, [0, 0.5, 1], [-1.8, 0, 1.4]);

  const activeVideo = FIELD_VIDEOS[activeIndex] ?? FIELD_VIDEOS[0];

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.muted = isMuted;
    const playPromise = el.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [activeIndex, isMuted]);

  function handleSelect(index: number) {
    setProgress(0);
    setActiveIndex(index);
  }

  function handlePrev() {
    setProgress(0);
    setActiveIndex((prev) => (prev - 1 + FIELD_VIDEOS.length) % FIELD_VIDEOS.length);
  }

  function handleNext() {
    setProgress(0);
    setActiveIndex((prev) => (prev + 1) % FIELD_VIDEOS.length);
  }

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      const p = el.play();
      if (p && typeof p.then === 'function') {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(true);
      }
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }

  function toggleMute() {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  }

  function handleTimeUpdate() {
    const el = videoRef.current;
    if (!el || !el.duration || Number.isNaN(el.duration)) return;
    setProgress((el.currentTime / el.duration) * 100);
  }

  return (
    <section
      ref={sectionRef}
      id="saha-videolari"
      aria-labelledby="field-reels-heading"
      className="relative z-10 scroll-mt-20 py-14 sm:py-22 lg:py-28 overflow-hidden"
    >
      {/* Bespoke Deep Velvet Burgundy & Architectural Silk Curved Stage Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4C0916] via-[#7A1023] to-[#3E0712]" />
        <SafeImage
          src={SITE_IMAGES.pearlSilkBackdrop}
          alt=""
          className="w-full h-full object-cover opacity-[0.14] mix-blend-screen saturate-150"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_35%,rgba(232,190,162,0.18),transparent_60%),radial-gradient(ellipse_at_80%_75%,rgba(196,26,52,0.4),transparent_60%)]" />
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-55"
        >
          <path
            d="M-60,120 C340,30 780,220 1500,85"
            fill="none"
            stroke="#C8A287"
            strokeWidth="1.2"
            opacity="0.45"
          />
          <path
            d="M-60,790 C420,880 960,690 1500,810"
            fill="none"
            stroke="#C8A287"
            strokeWidth="1.2"
            opacity="0.38"
          />
        </svg>
        {/* Seamless top & bottom pearl edge curves */}
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#EBE7E4] via-[#EBE7E4]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#EBE7E4] via-[#EBE7E4]/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
        {/* Section Editorial Header inside Compact Translucent Burgundy Frame */}
        <EditorialReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 sm:mb-10">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2.5 text-[11px] font-medium text-[#E9D1C0]">
              <span className="h-[1px] w-7 bg-[#C8A287]" aria-hidden="true" />
              <span>Canlı Saha Uygulamaları · Dikey Video Vitrini</span>
            </div>
            <SplitTextReveal
              id="field-reels-heading"
              as="h2"
              text="Gerçek İşçiliğimizi Sahadan İzleyin"
              className="font-display text-2xl sm:text-[32px] lg:text-[36px] font-semibold leading-[1.1] text-white text-balance"
            />
            <p className="text-xs sm:text-sm leading-relaxed text-[#E7DAD3]">
              Stüdyo kurgusu değil; Pursaklar ve Ankara genelinde gerçekleştirdiğimiz kombi, kaskad
              kazan, su arıtma ve mekanik tesisat uygulamalarımızın dikey saha kayıtları.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-end">
            <MagneticAction strength={7}>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Önceki saha videosu"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-[#C8A287]/40 text-white backdrop-blur-md transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </MagneticAction>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-[#C8A287]/30 text-xs font-semibold text-[#F4E6DC] tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(FIELD_VIDEOS.length).padStart(2, '0')}
            </span>
            <MagneticAction strength={7}>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Sonraki saha videosu"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-[#C8A287]/40 text-white backdrop-blur-md transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </MagneticAction>
          </div>
        </EditorialReveal>

        {/* Main Horizontal Stage: Scroll-Scrubbed 3D Titanium iPhone Frame + Horizontal Vertical-Video Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
          {/* Left / Centerpiece: Realistic Brushed Titanium iPhone Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              data-cursor="İZLE"
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: phoneY,
                      rotateY: phoneRotateY,
                      rotateZ: phoneRotateZ,
                      transformPerspective: 1100,
                    }
              }
              whileHover={{ scale: 1.02 }}
              transition={SPRING_ARCHITECTURAL}
              className="relative w-[278px] sm:w-[318px] select-none will-change-transform"
            >
              {/* Ambient Champagne-Burgundy Halo Behind iPhone */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[64px] bg-[radial-gradient(circle_at_center,rgba(200,162,135,0.28),transparent_68%)] blur-2xl pointer-events-none"
              />

              {/* Hardware Side Buttons */}
              <div
                aria-hidden="true"
                className="absolute -left-[3px] top-24 w-[3px] h-7 rounded-l bg-gradient-to-b from-[#DFC5B0] to-[#7C6558]"
              />
              <div
                aria-hidden="true"
                className="absolute -left-[3px] top-36 w-[3px] h-12 rounded-l bg-gradient-to-b from-[#DFC5B0] to-[#7C6558]"
              />
              <div
                aria-hidden="true"
                className="absolute -left-[3px] top-52 w-[3px] h-12 rounded-l bg-gradient-to-b from-[#DFC5B0] to-[#7C6558]"
              />
              <div
                aria-hidden="true"
                className="absolute -right-[3px] top-36 w-[3px] h-16 rounded-r bg-gradient-to-b from-[#DFC5B0] to-[#7C6558]"
              />

              {/* Titanium Outer Chassis */}
              <div className="relative rounded-[48px] p-[9px] bg-gradient-to-br from-[#D9C0AD] via-[#5E473E] to-[#261614] shadow-[0_32px_75px_-16px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,244,234,0.6)]">
                {/* Inner Black Glass Bezel */}
                <div className="relative rounded-[40px] bg-[#0B0909] p-[6px] overflow-hidden">
                  {/* Dynamic Island */}
                  <div
                    aria-hidden="true"
                    className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 w-24 h-6 rounded-full bg-black border border-white/10 flex items-center justify-end pr-2.5 shadow-inner"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1C2230] ring-1 ring-[#3D4B66]/60" />
                  </div>

                  {/* Screen Viewport (9:16 Vertical Aspect Ratio) */}
                  <div className="relative rounded-[34px] overflow-hidden aspect-[9/16] bg-[#120608]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeVideo.id}
                        initial={{ opacity: 0.35, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.35, scale: 0.99 }}
                        transition={{ duration: 0.32, ease: EASE_LUXURY }}
                        className="absolute inset-0"
                      >
                        <video
                          ref={videoRef}
                          src={activeVideo.src}
                          poster={activeVideo.poster}
                          playsInline
                          loop
                          muted={isMuted}
                          preload="metadata"
                          onTimeUpdate={handleTimeUpdate}
                          onClick={togglePlay}
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Top & Bottom Contrast Scrims Inside Phone Screen */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 via-black/25 to-transparent z-10"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/55 to-transparent z-10"
                    />

                    {/* Subtle Top Brand Label Inside Screen */}
                    <div className="absolute top-11 left-3.5 right-3.5 z-20 flex items-center justify-between text-[10px] font-medium text-white/90">
                      <span className="truncate">{activeVideo.category}</span>
                      <span className="tabular-nums text-[#E9D1C0]">{activeVideo.duration}</span>
                    </div>

                    {/* Center Play Overlay when Paused */}
                    {!isPlaying ? (
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label="Videoyu oynat"
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/25"
                      >
                        <span className="w-14 h-14 rounded-full bg-[#9E162C]/92 border border-[#E9D1C0]/75 text-white flex items-center justify-center shadow-2xl">
                          <Play className="w-6 h-6 fill-white ml-0.5" aria-hidden="true" />
                        </span>
                      </button>
                    ) : null}

                    {/* Bottom Screen Controls & Video Info */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 space-y-2.5">
                      <div className="flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1 text-[10px] text-[#E9D1C0]">
                            <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                            <span className="truncate">{activeVideo.location}</span>
                          </div>
                          <h3 className="font-display text-lg font-semibold leading-tight text-white line-clamp-2 mt-0.5">
                            {activeVideo.title}
                          </h3>
                        </div>

                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={togglePlay}
                            aria-label={isPlaying ? 'Videoyu duraklat' : 'Videoyu oynat'}
                            className="w-8 h-8 rounded-full bg-black/55 hover:bg-[#9E162C] border border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Play className="w-3.5 h-3.5 ml-0.5" aria-hidden="true" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={toggleMute}
                            aria-label={isMuted ? 'Sesi aç' : 'Sesi kapat'}
                            className="w-8 h-8 rounded-full bg-black/55 hover:bg-[#9E162C] border border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                          >
                            {isMuted ? (
                              <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Playback Progress Bar */}
                      <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#C8A287] to-[#F7ECE3] transition-[width] duration-150"
                          style={{ width: `${Math.min(100, Math.max(4, progress))}%` }}
                        />
                      </div>

                      {/* Home Indicator */}
                      <div
                        aria-hidden="true"
                        className="mx-auto w-24 h-1 rounded-full bg-white/45"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Active Video Story Frame + Horizontal Vertical-Video Strip */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Active Reel Detail in High-Contrast Frosted Burgundy Frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo.id}
                initial={{ opacity: 0.4, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.4, y: -6 }}
                transition={{ duration: 0.28, ease: EASE_LUXURY }}
                className="burgundy-frosted-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-3.5"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#E9D1C0]">
                  <span className="font-semibold text-white">{activeVideo.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeVideo.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{activeVideo.duration}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
                  {activeVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#EADFD8] leading-relaxed">
                  {activeVideo.description}
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-2.5">
                  <a
                    href={buildWhatsappHref(activeVideo.serviceQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1C5D36] hover:bg-[#174D2C] border border-white/20 px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Bu Uygulama İçin WhatsApp’tan Destek Al</span>
                  </a>
                  <a
                    href={SITE_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/12 hover:bg-white/20 border border-[#E9D1C0]/45 px-4 py-2.5 text-xs font-medium text-[#FAF3EE] transition-colors whitespace-nowrap"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#F3D9C7]" aria-hidden="true" />
                    <span>{SITE_INFO.instagramHandle}</span>
                  </a>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/18 border border-[#C8A287]/40 px-4 py-2.5 text-xs font-medium text-[#FAF3EE] transition-colors whitespace-nowrap"
                  >
                    {isMuted ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Sesi Aç</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Sesi Kapat</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Horizontal Track of Vertical 9:16 Video Cards */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#DFCBBF]">
                <span>Saha Kayıtları (İzlemek için bir kayıt seçin)</span>
                <span className="tabular-nums">{FIELD_VIDEOS.length} Gerçek Video</span>
              </div>

              <div
                ref={railRef}
                className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar"
              >
                {FIELD_VIDEOS.map((vid, idx) => {
                  const selected = idx === activeIndex;
                  return (
                    <motion.button
                      key={vid.id}
                      type="button"
                      whileHover={{ y: -4 }}
                      transition={SPRING_ARCHITECTURAL}
                      onClick={() => handleSelect(idx)}
                      aria-label={`${vid.title} videosunu oynat`}
                      aria-pressed={selected}
                      className={`group relative snap-start shrink-0 w-[132px] sm:w-[152px] aspect-[9/15] rounded-2xl overflow-hidden text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9D1C0] ${
                        selected
                          ? 'ring-2 ring-[#E9D1C0] shadow-[0_20px_40px_-14px_rgba(200,162,135,0.45)]'
                          : 'ring-1 ring-white/20 opacity-82 hover:opacity-100'
                      }`}
                    >
                      <SafeImage
                        src={vid.poster}
                        alt={vid.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 transition-colors ${
                          selected
                            ? 'bg-gradient-to-t from-[#240408]/95 via-[#240408]/35 to-black/15'
                            : 'bg-gradient-to-t from-black/90 via-black/35 to-black/15'
                        }`}
                      />

                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-semibold text-white/90">
                        <span className="tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="tabular-nums text-[#E9D1C0]">{vid.duration}</span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-transform group-hover:scale-110 ${
                            selected
                              ? 'bg-[#A81830] border-[#E9D1C0] text-white shadow-lg'
                              : 'bg-black/45 border-white/40 text-white/95 backdrop-blur-sm'
                          }`}
                        >
                          {selected && isPlaying ? (
                            <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : (
                            <Play className="w-3.5 h-3.5 ml-0.5 fill-current" aria-hidden="true" />
                          )}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <div className="text-[9.5px] font-medium text-[#E9D1C0] truncate">
                          {vid.category}
                        </div>
                        <div className="text-[11px] font-semibold text-white leading-snug line-clamp-2 mt-0.5">
                          {vid.title}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

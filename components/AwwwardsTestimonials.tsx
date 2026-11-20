'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from 'motion/react';
import { ChevronLeft, ChevronRight, MoveHorizontal, ShieldCheck, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/site-data';
import { computeDeckCardTransform, resolveDeckSwipeAction } from '@/lib/awwwards-motion';
import { SafeImage } from './SafeImage';
import {
  AwwwardsFadeUpCard,
  EASE_LUXURY,
  MagneticAction,
  SplitTextReveal,
  SPRING_ARCHITECTURAL,
} from './MotionPrimitives';

const AUTO_ADVANCE_MS = 6200;

interface ReviewItem {
  id: string;
  name: string;
  district: string;
  service: string;
  rating: number;
  quote: string;
  avatar: string;
}

interface DraggableReviewCardProps {
  item: ReviewItem;
  direction: 1 | -1;
  isPaused: boolean;
  prefersReducedMotion: boolean;
  onDragStart: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function formatLocationLabel(district: string): string {
  return district.trim().toLowerCase() === 'ankara' ? 'Ankara Merkez' : `${district} / Ankara`;
}

const cardVariants = {
  enter: (dir: 1 | -1) => ({
    opacity: 0,
    x: dir > 0 ? 52 : -52,
    scale: 0.96,
    rotateZ: dir > 0 ? 2 : -2,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateZ: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 340,
      damping: 28,
      mass: 0.65,
    },
  },
  exit: (dir: 1 | -1) => ({
    opacity: 0,
    x: dir > 0 ? -96 : 96,
    scale: 0.95,
    rotateZ: dir > 0 ? -4 : 4,
    transition: {
      duration: 0.2,
      ease: EASE_LUXURY,
    },
  }),
};

function DraggableReviewCard({
  item,
  direction,
  isPaused,
  prefersReducedMotion,
  onDragStart,
  onNext,
  onPrev,
}: DraggableReviewCardProps) {
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-160, 0, 160], [-8, 0, 8]);
  const dragOpacity = useTransform(dragX, [-220, -130, 0, 130, 220], [0.55, 0.92, 1, 0.92, 0.55]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const action = resolveDeckSwipeAction(info.offset.x, info.velocity.x);
    if (action === 'next') {
      onNext();
    } else if (action === 'prev') {
      onPrev();
    }
  }

  return (
    <motion.article
      custom={direction}
      variants={prefersReducedMotion ? undefined : cardVariants}
      initial={prefersReducedMotion ? false : 'enter'}
      animate={prefersReducedMotion ? { opacity: 1 } : 'center'}
      exit={prefersReducedMotion ? { opacity: 0 } : 'exit'}
      drag={prefersReducedMotion ? false : 'x'}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.55}
      dragSnapToOrigin
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      style={
        prefersReducedMotion
          ? { zIndex: 30 }
          : { zIndex: 30, x: dragX, rotate: dragRotate, opacity: dragOpacity }
      }
      className="absolute inset-x-0 top-0 h-[192px] sm:h-[234px] rounded-[20px] sm:rounded-[26px] p-4 sm:p-7 flex flex-col justify-between select-none will-change-transform cursor-grab active:cursor-grabbing bg-gradient-to-br from-[#FFFDFB] via-[#FBF6F2] to-[#F2E9E2] text-[#1A1312] border border-white shadow-[0_24px_55px_-20px_rgba(16,2,5,0.72)]"
    >
      {/* Top Header: Reviewer Identity + Crisp Stars */}
      <div className="flex items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#B81B35]/25 shadow-sm shrink-0">
            <SafeImage src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[13.5px] sm:text-[15px] font-semibold text-[#1A1312] truncate">
              {item.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#6B5D58] truncate">
              {item.district} · {item.service}
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-0.5 shrink-0"
          aria-label={`${item.rating} üzerinden 5 yıldız`}
        >
          {Array.from({ length: item.rating }).map((_, idx) => (
            <Star
              key={idx}
              className="w-3.5 h-3.5 fill-[#B81B35] text-[#B81B35]"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Center Editorial Quote */}
      <blockquote className="font-display text-[15.5px] sm:text-[20px] font-semibold leading-[1.32] text-[#1D1514] line-clamp-3">
        “{item.quote}”
      </blockquote>

      {/* Bottom Footer + Live Auto-Play Progress Line */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-[#6B5D58]">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#8E1328]">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            Doğrulanmış Hizmet Kaydı
          </span>
          <span className="text-[10.5px] tabular-nums text-[#7C6E69]">
            {formatLocationLabel(item.district)}
          </span>
        </div>

        {!prefersReducedMotion ? (
          <div className="h-[2px] w-full rounded-full bg-[#8E1328]/12 overflow-hidden">
            <motion.div
              key={`${item.id}-${isPaused ? 'paused' : 'run'}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isPaused ? 0 : 1 }}
              transition={{
                duration: isPaused ? 0.2 : AUTO_ADVANCE_MS / 1000,
                ease: 'linear',
              }}
              className="h-full origin-left bg-gradient-to-r from-[#B81B35] to-[#D99B72]"
            />
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export function AwwwardsTestimonials() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const spotX = useMotionValue(280);
  const spotY = useMotionValue(180);

  const ambientSpotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX}px ${spotY}px, rgba(212, 32, 60, 0.28), rgba(233, 209, 192, 0.12) 42%, transparent 74%)`;

  const total = TESTIMONIALS.length;
  const activeReview = TESTIMONIALS[activeIndex];

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const selectIndex = useCallback(
    (targetIdx: number) => {
      if (targetIdx === activeIndex) return;
      setDirection(targetIdx > activeIndex ? 1 : -1);
      setActiveIndex(targetIdx);
    },
    [activeIndex],
  );

  // Subtle editorial auto-advance that pauses on hover / pointer / reduced motion
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, prefersReducedMotion]);

  function handleStagePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  }

  const formattedCurrent = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');
  const progressRatio = ((activeIndex + 1) / total) * 100;

  const depth1 = computeDeckCardTransform(1);
  const depth2 = computeDeckCardTransform(2);

  return (
    <section id="yorumlar" className="relative z-10 scroll-mt-24 py-6 sm:py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Awwwards Atelier Crimson-Obsidian Interactive Review Stage */}
        <motion.div
          ref={stageRef}
          data-testid="testimonial-stage-card"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 40, scale: 0.98 }
          }
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.78, ease: EASE_LUXURY }}
          onPointerMove={handleStagePointerMove}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-[22px] sm:rounded-[34px] overflow-hidden bg-gradient-to-br from-[#350610] via-[#5C0B1B] to-[#23040A] border border-[#E9D1C0]/25 shadow-[0_28px_70px_-28px_rgba(46,5,13,0.68)] px-4 py-5 sm:px-8 sm:py-9 lg:px-11 lg:py-10 will-change-transform"
        >
          {/* Interactive Pointer-Following Spotlight Layer */}
          <motion.div
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { background: ambientSpotlight }}
            className="pointer-events-none absolute inset-0 z-0"
          />

          {/* Fine Architectural Grid Hairlines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(246, 224, 206, 0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(246, 224, 206, 0.7) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center">
            {/* LEFT EDITORIAL COLUMN: Ultra-Compact on Mobile, Sculptural on Desktop */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-5">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-semibold tracking-wide text-[#F3D9C7]">
                    04 · Müşteri Memnuniyeti
                  </span>
                  <span className="h-[1px] w-9 bg-[#DFBCA3]/65" aria-hidden="true" />
                </div>

                <SplitTextReveal
                  as="h2"
                  text="Müşterilerimizin Görüşleri"
                  className="font-display text-[22px] sm:text-[34px] lg:text-[38px] font-semibold leading-[1.08] text-white text-balance"
                />
              </div>

              {/* Unboxed Editorial Rating Proof */}
              <AwwwardsFadeUpCard delay={0.12} y={24} duration={0.66}>
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="flex items-baseline gap-1 font-sans text-xl sm:text-3xl font-bold text-white tabular-nums leading-none">
                    <span>4.9</span>
                    <span className="text-xs sm:text-sm font-medium text-[#E9D1C0]/80">/ 5.0</span>
                  </div>
                  <div className="h-6 sm:h-7 w-[1px] bg-white/15" aria-hidden="true" />
                  <div>
                    <div className="flex items-center gap-0.5" aria-label="5 üzerinden 4.9 yıldız">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#F3C99E] text-[#F3C99E]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-0.5 sm:mt-1 text-[10.5px] sm:text-[11px] text-[#EBDAD0]">
                      1.000+ Doğrulanmış Ankara Hizmeti
                    </p>
                  </div>
                </div>
              </AwwwardsFadeUpCard>

              {/* Interactive Customer Avatar Dock (One-Tap Jump to Any Review) */}
              <div
                role="tablist"
                aria-label="Müşteri yorumu seçin"
                className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap"
              >
                {TESTIMONIALS.map((review, idx) => {
                  const active = idx === activeIndex;
                  return (
                    <button
                      key={review.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-label={`${review.name} yorumunu görüntüle`}
                      onClick={() => selectIndex(idx)}
                      className="relative rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3D9C7]"
                    >
                      {active ? (
                        <motion.span
                          layoutId="testimonial-avatar-ring"
                          transition={SPRING_ARCHITECTURAL}
                          className="absolute inset-0 rounded-full ring-2 ring-[#F3C99E] bg-[#F3C99E]/20"
                        />
                      ) : null}
                      <div
                        className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border transition-all duration-200 ${
                          active
                            ? 'border-white scale-105 opacity-100'
                            : 'border-white/25 opacity-60 hover:opacity-95'
                        }`}
                      >
                        <SafeImage
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Editorial Index Counter + Progress Track + Magnetic Controls */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 max-w-[210px]">
                  <span className="text-xs font-semibold text-[#F6E4D6] tabular-nums whitespace-nowrap">
                    {formattedCurrent}{' '}
                    <span className="text-white/40 font-normal">/ {formattedTotal}</span>
                  </span>
                  <div className="h-[2px] flex-1 rounded-full bg-white/15 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#F3C99E] to-[#FF6B81]"
                      animate={{ width: `${progressRatio}%` }}
                      transition={{ duration: 0.45, ease: EASE_LUXURY }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <MagneticAction strength={6}>
                    <button
                      type="button"
                      aria-label="Önceki müşteri yorumu"
                      onClick={goPrev}
                      className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#FAF4EE] text-white hover:text-[#660D1C] border border-[#E9D1C0]/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3D9C7]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </MagneticAction>
                  <MagneticAction strength={6}>
                    <button
                      type="button"
                      aria-label="Sonraki müşteri yorumu"
                      onClick={goNext}
                      className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF4EE] hover:bg-white text-[#660D1C] shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3D9C7]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </MagneticAction>
                </div>
              </div>
            </div>

            {/* RIGHT 3D INTERACTIVE SWIPEABLE CARD DECK (Ultra-Compact on Mobile!) */}
            <AwwwardsFadeUpCard
              delay={0.2}
              y={38}
              duration={0.78}
              testId="testimonial-deck-reveal"
              className="lg:col-span-7 flex flex-col items-center"
            >
              <div
                data-cursor="KAYDIR"
                className="relative w-full max-w-[540px] h-[214px] sm:h-[258px] [perspective:1200px]"
              >
                {/* Architectural 3D Depth Backing Plate 2 (Pure Pearl-Vellum, Zero Text Bleed) */}
                <motion.div
                  aria-hidden="true"
                  key={`back-2-${activeIndex}`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : {
                          y: depth2.y + 4,
                          scale: depth2.scale - 0.02,
                          opacity: 0.25,
                          rotateZ: depth2.rotateZ * 0.6,
                        }
                  }
                  animate={{
                    y: depth2.y,
                    scale: depth2.scale,
                    opacity: 0.42,
                    rotateZ: depth2.rotateZ * 0.55,
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  style={{ zIndex: depth2.zIndex }}
                  className="pointer-events-none absolute inset-x-0 top-0 h-[192px] sm:h-[234px] rounded-[20px] sm:rounded-[26px] bg-gradient-to-br from-[#F3E4DB]/75 to-[#D9C0B3]/65 border border-white/35 shadow-[0_14px_34px_-22px_rgba(16,2,5,0.5)]"
                />

                {/* Architectural 3D Depth Backing Plate 1 (Clickable Next-Card Edge) */}
                <motion.button
                  type="button"
                  aria-label="Sonraki müşteri yorumuna geç"
                  tabIndex={-1}
                  key={`back-1-${activeIndex}`}
                  onClick={goNext}
                  initial={
                    prefersReducedMotion
                      ? false
                      : {
                          y: depth1.y + 5,
                          scale: depth1.scale - 0.02,
                          opacity: 0.55,
                          rotateZ: depth1.rotateZ * 0.55,
                        }
                  }
                  animate={{
                    y: depth1.y,
                    scale: depth1.scale,
                    opacity: 0.72,
                    rotateZ: depth1.rotateZ * 0.55,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  style={{ zIndex: depth1.zIndex }}
                  className="absolute inset-x-0 top-0 h-[192px] sm:h-[234px] rounded-[20px] sm:rounded-[26px] cursor-pointer bg-gradient-to-br from-[#F9F1EC]/92 to-[#E8D8CE]/88 border border-white/55 shadow-[0_18px_40px_-22px_rgba(16,2,5,0.58)] focus-visible:outline-none"
                />

                {/* Active Draggable Front Card */}
                <AnimatePresence initial={false} mode="wait" custom={direction}>
                  <DraggableReviewCard
                    key={activeReview.id}
                    item={activeReview}
                    direction={direction}
                    isPaused={isPaused}
                    prefersReducedMotion={prefersReducedMotion}
                    onDragStart={() => setIsPaused(true)}
                    onNext={goNext}
                    onPrev={goPrev}
                  />
                </AnimatePresence>
              </div>

              {/* Subtle Compact Interactive Gesture Hint */}
              <div className="mt-1.5 sm:mt-2.5 flex items-center gap-1.5 text-[11px] text-[#E9D1C0]/80">
                <MoveHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kartı sola veya sağa kaydırın</span>
              </div>
            </AwwwardsFadeUpCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


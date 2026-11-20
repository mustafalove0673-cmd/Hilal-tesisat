'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  MotionConfig,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import {
  computeCardTilt,
  computeMagneticPull,
  computeScrollVelocitySkew,
  formatOdometerValue,
} from '@/lib/awwwards-motion';
import { AwwwardsSmoothScroll } from './AwwwardsSmoothScroll';

export const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_CURTAIN: [number, number, number, number] = [0.76, 0, 0.24, 1];
export const SPRING_ARCHITECTURAL = { stiffness: 320, damping: 30, mass: 0.78 };
export const SPRING_MAGNETIC = { stiffness: 260, damping: 20, mass: 0.45 };

export function MotionShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <AwwwardsSmoothScroll />
      {children}
    </MotionConfig>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left bg-gradient-to-r from-[#D4203C] via-[#F2C7A8] to-[#9E162C] shadow-[0_0_12px_rgba(212,32,60,0.65)] pointer-events-none"
    />
  );
}

interface EditorialRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Awwwards editorial rise-and-sharpen reveal on viewport entrance.
 */
export function EditorialReveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: EditorialRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72, delay, ease: EASE_LUXURY }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface AwwwardsFadeUpCardProps {
  children: React.ReactNode;
  as?: 'div' | 'article';
  id?: string;
  delay?: number;
  y?: number;
  duration?: number;
  trigger?: 'inView' | 'immediate';
  className?: string;
  testId?: string;
}

/**
 * Awwwards-style orchestrated 'fade-up' scroll reveal for cards:
 * rises smoothly on an architectural expo-out curve with subtle scale settle
 * and micro-focus sharpen, firing once on viewport entry and respecting
 * prefers-reduced-motion.
 */
export function AwwwardsFadeUpCard({
  children,
  as = 'div',
  id,
  delay = 0,
  y = 36,
  duration = 0.72,
  trigger = 'inView',
  className = '',
  testId,
}: AwwwardsFadeUpCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = as === 'article' ? motion.article : motion.div;
  const targetState = { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' };

  return (
    <Component
      id={id}
      data-testid={testId}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y, scale: 0.965, filter: 'blur(4px)' }
      }
      animate={trigger === 'immediate' ? targetState : undefined}
      whileInView={trigger === 'inView' ? targetState : undefined}
      viewport={trigger === 'inView' ? { once: true, amount: 0.08 } : undefined}
      transition={{ duration, delay, ease: EASE_LUXURY }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </Component>
  );
}


interface SplitTextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  trigger?: 'inView' | 'immediate';
  id?: string;
}

/**
 * Signature Awwwards word-by-word masked clip reveal with subtle rotational flourish.
 */
export function SplitTextReveal({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  trigger = 'inView',
  id,
}: SplitTextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const shouldAnimate =
    prefersReducedMotion || trigger === 'immediate' || inView;

  const words = text.split(' ');
  const Tag = as;

  return (
    <div ref={ref}>
      <Tag id={id} className={className}>
        {words.map((word, idx) => (
          <React.Fragment key={`${word}-${idx}`}>
            <span className="inline-block overflow-hidden align-top pb-[0.14em] -mb-[0.14em]">
              <motion.span
                className="inline-block will-change-transform origin-bottom-left"
                initial={prefersReducedMotion ? false : { y: '115%', rotateZ: 2.2, opacity: 0 }}
                animate={
                  shouldAnimate
                    ? { y: '0%', rotateZ: 0, opacity: 1 }
                    : { y: '115%', rotateZ: 2.2, opacity: 0 }
                }
                transition={{
                  duration: 0.78,
                  delay: delay + idx * 0.055,
                  ease: EASE_LUXURY,
                }}
              >
                {word}
              </motion.span>
            </span>
            {idx < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </Tag>
    </div>
  );
}

export function ArchitecturalMaskReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden pb-2 -mb-2 ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? false : { y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.82, delay, ease: EASE_LUXURY }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface CurtainImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Architectural shutter clip-path reveal + inner Ken Burns scale settle (1.14 -> 1.0).
 */
export function CurtainImageReveal({
  children,
  className = '',
  delay = 0,
}: CurtainImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? false
          : { clipPath: 'inset(16% 0% 0% 0%)', opacity: 0.35 }
      }
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.92, delay, ease: EASE_CURTAIN }}
      className={`overflow-hidden will-change-transform ${className}`}
    >
      <motion.div
        initial={prefersReducedMotion ? false : { scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 1.18, delay, ease: EASE_LUXURY }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface MagneticActionProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Spring-physics magnetic wrapper that pulls buttons/controls smoothly toward the pointer.
 */
export function MagneticAction({
  children,
  className = '',
  strength = 9,
}: MagneticActionProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_MAGNETIC);
  const springY = useSpring(y, SPRING_MAGNETIC);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pull = computeMagneticPull(
      e.clientX - (rect.left + rect.width / 2),
      e.clientY - (rect.top + rect.height / 2),
      rect.width,
      rect.height,
      strength,
    );
    x.set(pull.x);
    y.set(pull.y);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      className={`inline-flex will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Smooth ease-out-quart rolling number counter synced with viewport entry.
 */
export function AnimatedCounter({
  target,
  suffix = '',
  durationMs = 1250,
  className = '',
}: AnimatedCounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(() => `${target}${suffix}`);

  const shouldStart = inView;

  useEffect(() => {
    if (prefersReducedMotion || !shouldStart) return;

    let rafId = 0;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setDisplay(formatOdometerValue(progress, target, suffix));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [durationMs, prefersReducedMotion, shouldStart, suffix, target]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </span>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  offset?: number;
  rotateRange?: [number, number];
  className?: string;
}

export function ParallaxLayer({
  children,
  offset = 36,
  rotateRange,
  className = '',
}: ParallaxLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    rotateRange ?? [0, 0],
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={prefersReducedMotion ? undefined : { y, rotate }}
        className="will-change-transform h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface KineticEditorialMarqueeProps {
  items: string[];
  variant?: 'crimson' | 'pearl';
  reverse?: boolean;
  className?: string;
}

/**
 * Scroll-velocity-reactive infinite architectural marquee band (Awwwards SOTD signature).
 */
export function KineticEditorialMarquee({
  items,
  variant = 'crimson',
  reverse = false,
  className = '',
}: KineticEditorialMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 45, stiffness: 320 });
  const skewX = useTransform(smoothVelocity, (v) =>
    computeScrollVelocitySkew(reverse ? -v : v, 4.5),
  );

  const track = [...items, ...items];
  const isCrimson = variant === 'crimson';

  return (
    <div
      aria-hidden="true"
      className={`relative z-10 overflow-hidden select-none border-y ${
        isCrimson
          ? 'bg-gradient-to-r from-[#580A19] via-[#8E1328] to-[#580A19] border-[#E9D1C0]/25 text-[#FAF2EC]'
          : 'bg-[#F6F1EC]/90 border-[#9E162C]/14 text-[#6B0E1E]'
      } py-3 sm:py-3.5 ${className}`}
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { skewX }}
        className="flex w-max will-change-transform"
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }
          }
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 28,
          }}
          className="flex shrink-0 items-center gap-7 sm:gap-10 pr-7 sm:pr-10 will-change-transform"
        >
          {track.map((label, idx) => (
            <div key={`${label}-${idx}`} className="inline-flex items-center gap-7 sm:gap-10">
              <span className="font-display text-sm sm:text-base lg:text-lg font-semibold tracking-[0.14em] uppercase whitespace-nowrap">
                {label}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                  isCrimson ? 'bg-[#E9D1C0]' : 'bg-[#B81B35]'
                }`}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Scroll-driven architectural silk SVG lines that physically draw as the visitor scrolls.
 */
export function SilkRibbonParallax({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const yShift = useTransform(smoothProgress, [0, 1], [0, -90]);
  const pathLength = useTransform(smoothProgress, [0, 0.92], [0.16, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={prefersReducedMotion ? undefined : { y: yShift }}
      className={`pointer-events-none will-change-transform ${className}`}
    >
      <svg viewBox="0 0 1440 5200" preserveAspectRatio="none" className="w-full h-full opacity-75">
        <defs>
          <linearGradient id="champagneRibbonGrad" x1="0" y1="0" x2="1" y2="0.2">
            <stop offset="0%" stopColor="#C8A287" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#D6A989" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C21E38" stopOpacity="0.52" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-60,640 C340,520 720,840 1500,670"
          fill="none"
          stroke="url(#champagneRibbonGrad)"
          strokeWidth="2.4"
          style={prefersReducedMotion ? undefined : { pathLength }}
        />
        <motion.path
          d="M-60,662 C360,552 750,860 1500,694"
          fill="none"
          stroke="#B99E96"
          strokeWidth="1.1"
          opacity="0.5"
          style={prefersReducedMotion ? undefined : { pathLength }}
        />
        <motion.path
          d="M-60,1380 C420,1520 960,1240 1500,1420"
          fill="none"
          stroke="url(#champagneRibbonGrad)"
          strokeWidth="2.1"
          style={prefersReducedMotion ? undefined : { pathLength }}
        />
        <motion.path
          d="M-60,2180 C380,2040 1020,2340 1500,2140"
          fill="none"
          stroke="url(#champagneRibbonGrad)"
          strokeWidth="2.1"
          style={prefersReducedMotion ? undefined : { pathLength }}
        />
        <motion.path
          d="M-60,3480 C380,3340 1020,3620 1500,3420"
          fill="none"
          stroke="url(#champagneRibbonGrad)"
          strokeWidth="1.9"
          style={prefersReducedMotion ? undefined : { pathLength }}
        />
      </svg>
    </motion.div>
  );
}

interface LuxuryInteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxDeg?: number;
}

/**
 * 3D perspective tilt + specular champagne-crimson glare card.
 */
export function LuxuryInteractiveCard({
  children,
  className = '',
  tiltMaxDeg = 5.5,
}: LuxuryInteractiveCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(-180);
  const mouseY = useMotionValue(-180);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, { stiffness: 280, damping: 24 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 280, damping: 24 });

  const spotlight = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(212, 32, 60, 0.14), rgba(226, 183, 155, 0.18) 38%, transparent 74%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    mouseX.set(localX);
    mouseY.set(localY);

    if (!prefersReducedMotion && e.pointerType !== 'touch' && rect.width > 0 && rect.height > 0) {
      const normX = (localX / rect.width) * 2 - 1;
      const normY = (localY / rect.height) * 2 - 1;
      const tilt = computeCardTilt(normX, normY, tiltMaxDeg);
      rotateXRaw.set(tilt.rotateX);
      rotateYRaw.set(tilt.rotateY);
    }
  }

  function handlePointerLeave() {
    mouseX.set(-180);
    mouseY.set(-180);
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
              transformStyle: 'preserve-3d',
            }
      }
      whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.012 }}
      transition={SPRING_ARCHITECTURAL}
      className={`relative overflow-hidden will-change-transform ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}

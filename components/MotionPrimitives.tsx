'use client';

import React, { useRef } from 'react';
import {
  motion,
  MotionConfig,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

export const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const SPRING_ARCHITECTURAL = { stiffness: 320, damping: 32, mass: 0.8 };

export function MotionShell({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 origin-left bg-gradient-to-r from-[#5E1119] via-[#C8A287] to-[#38080D] shadow-[0_0_10px_rgba(200,162,135,0.65)] pointer-events-none"
    />
  );
}

interface EditorialRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function EditorialReveal({
  children,
  delay = 0,
  y = 14,
  className = '',
}: EditorialRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.58, delay, ease: EASE_LUXURY }}
      className={className}
    >
      {children}
    </motion.div>
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
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '18%', opacity: 1 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.65, delay, ease: EASE_LUXURY }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  offset = 32,
  className = '',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }} className="will-change-transform h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

export function SilkRibbonParallax({ className = '' }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const yShift = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ y: yShift }}
      className={`pointer-events-none will-change-transform ${className}`}
    >
      <svg viewBox="0 0 1440 5200" preserveAspectRatio="none" className="w-full h-full opacity-70">
        <defs>
          <linearGradient id="champagneRibbonGrad" x1="0" y1="0" x2="1" y2="0.2">
            <stop offset="0%" stopColor="#C8A287" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#C8A287" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#6E1620" stopOpacity="0.32" />
          </linearGradient>
        </defs>
        <path
          d="M-60,640 C340,520 720,840 1500,670"
          fill="none"
          stroke="url(#champagneRibbonGrad)"
          strokeWidth="2.2"
        />
        <path
          d="M-60,662 C360,552 750,860 1500,694"
          fill="none"
          stroke="#B99E96"
          strokeWidth="1"
          opacity="0.45"
        />
        <path
          d="M-60,1380 C420,1520 960,1240 1500,1420"
          fill="none"
          stroke="url(#champagneRibbonGrad)"
          strokeWidth="1.9"
        />
        <path
          d="M-60,2180 C380,2040 1020,2340 1500,2140"
          fill="none"
          stroke="url(#champagneRibbonGrad)"
          strokeWidth="1.9"
        />
        <path
          d="M-60,3480 C380,3340 1020,3620 1500,3420"
          fill="none"
          stroke="url(#champagneRibbonGrad)"
          strokeWidth="1.7"
        />
      </svg>
    </motion.div>
  );
}

interface LuxuryInteractiveCardProps {
  children: React.ReactNode;
  className?: string;
}

export function LuxuryInteractiveCard({ children, className = '' }: LuxuryInteractiveCardProps) {
  const mouseX = useMotionValue(-180);
  const mouseY = useMotionValue(-180);

  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(200, 162, 135, 0.22), transparent 72%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handlePointerLeave() {
    mouseX.set(-180);
    mouseY.set(-180);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={{ y: -4 }}
      transition={SPRING_ARCHITECTURAL}
      className={`relative overflow-hidden ${className}`}
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

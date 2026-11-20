'use client';

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, useMotionValue, useSpring } from 'motion/react';

declare global {
  interface Window {
    __hilalLenis?: Lenis;
  }
}

export function AwwwardsSmoothScroll() {
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'interactive' | 'media'>('default');
  const [cursorLabel, setCursorLabel] = useState('');

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const ringX = useSpring(rawX, { stiffness: 320, damping: 28, mass: 0.45 });
  const ringY = useSpring(rawY, { stiffness: 320, damping: 28, mass: 0.45 });

  // Lenis buttery Awwwards inertia scroll
  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    window.__hilalLenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (window.__hilalLenis === lenis) {
        delete window.__hilalLenis;
      }
      lenis.destroy();
    };
  }, []);

  // Desktop fine-pointer editorial magnetic cursor halo (non-intrusive; native cursor preserved)
  useEffect(() => {
    const finePointer = window.matchMedia?.('(pointer: fine) and (hover: hover)').matches;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const enableId = window.requestAnimationFrame(() => setCursorEnabled(true));

    const handleMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setCursorVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const mediaEl = target.closest<HTMLElement>('[data-cursor]');
      if (mediaEl) {
        setCursorMode('media');
        setCursorLabel(mediaEl.dataset.cursor || 'İNCELE');
        return;
      }

      const interactiveEl = target.closest('a, button, input, select, textarea, [role="button"]');
      if (interactiveEl) {
        setCursorMode('interactive');
        setCursorLabel('');
        return;
      }

      setCursorMode('default');
      setCursorLabel('');
    };

    const handleLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerleave', handleLeave);

    return () => {
      window.cancelAnimationFrame(enableId);
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', handleLeave);
    };
  }, [rawX, rawY]);

  if (!cursorEnabled) return null;

  const isMedia = cursorMode === 'media';
  const isInteractive = cursorMode === 'interactive';
  const size = isMedia ? 68 : isInteractive ? 40 : 22;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: ringX,
        y: ringY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        opacity: cursorVisible ? 1 : 0,
        backgroundColor: isMedia
          ? 'rgba(135, 18, 37, 0.88)'
          : isInteractive
            ? 'rgba(184, 27, 53, 0.14)'
            : 'rgba(184, 27, 53, 0.04)',
        borderColor: isMedia
          ? 'rgba(233, 209, 192, 0.85)'
          : isInteractive
            ? 'rgba(184, 27, 53, 0.72)'
            : 'rgba(168, 24, 48, 0.42)',
      }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed top-0 left-0 z-[95] hidden lg:flex items-center justify-center rounded-full border will-change-transform shadow-[0_8px_24px_-6px_rgba(135,18,37,0.35)]"
    >
      {isMedia && cursorLabel ? (
        <span className="text-[9px] font-semibold tracking-[0.14em] text-[#FFF8F2] select-none">
          {cursorLabel}
        </span>
      ) : (
        <span
          className={`rounded-full transition-all duration-150 ${
            isInteractive ? 'w-1.5 h-1.5 bg-[#B81B35]' : 'w-1 h-1 bg-[#A81830]/75'
          }`}
        />
      )}
    </motion.div>
  );
}

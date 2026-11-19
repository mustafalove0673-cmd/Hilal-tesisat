'use client';

import React, { useRef } from 'react';
import {
  motion,
  MotionConfig,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

export const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 origin-left bg-gradient-to-r from-[#5E1119] via-[#C8A287] to-[#38080D] pointer-events-none"
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
      transition={{ duration: 0.55, delay, ease: EASE_LUXURY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  offset = 36,
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

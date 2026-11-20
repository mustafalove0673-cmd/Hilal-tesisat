import React from 'react';

interface HilalLogoProps {
  variant?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
}

export function HilalLogo({
  variant = 'dark',
  showTagline = false,
  className = '',
}: HilalLogoProps) {
  const titleColor = variant === 'light' ? 'text-[#F8F5F2]' : 'text-[#23191A]';
  const subColor = variant === 'light' ? 'text-[#D6C5BA]' : 'text-[#5A5350]';

  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="hilalBurgundy" x1="6" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D1213B" />
            <stop offset="55%" stopColor="#991429" />
            <stop offset="100%" stopColor="#5C0B19" />
          </linearGradient>
          <linearGradient id="hilalSteel" x1="16" y1="8" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={variant === 'light' ? '#F3EEEA' : '#4A4645'} />
            <stop offset="50%" stopColor={variant === 'light' ? '#C9B3A4' : '#241E1E'} />
            <stop offset="100%" stopColor={variant === 'light' ? '#9B8578' : '#141111'} />
          </linearGradient>
        </defs>
        {/* Outer Crescent */}
        <path
          d="M27.5 6.5C17.2 6.5 9 14.3 9 24C9 33.7 17.2 41.5 27.5 41.5C21.2 39.2 16.8 32.2 16.8 24C16.8 15.8 21.2 8.8 27.5 6.5Z"
          fill="url(#hilalBurgundy)"
        />
        {/* Inner Architectural H Pillars */}
        <path d="M21 12H25.2V36H21V12Z" fill="url(#hilalSteel)" />
        <path d="M31.5 11H36V37H31.5V11Z" fill="url(#hilalSteel)" />
        <path d="M24 22.2H33.5V26.2H24V22.2Z" fill="url(#hilalBurgundy)" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg sm:text-xl font-semibold tracking-[0.04em] whitespace-nowrap ${titleColor}`}
        >
          HİLAL TESİSAT
        </span>
        {showTagline ? (
          <span className={`mt-1 text-xs font-normal tracking-normal ${subColor}`}>
            Güvenli Yaşam, Profesyonel Çözümler.
          </span>
        ) : null}
      </span>
    </span>
  );
}

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_IMAGES } from '@/lib/site-data';
import { buildBreadcrumbJsonLd } from '@/lib/seo';
import { SafeImage } from './SafeImage';

interface SubpageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: { name: string; path: string }[];
  children: React.ReactNode;
}

export function SubpageShell({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: SubpageShellProps) {
  const breadcrumbSchema = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="relative min-h-screen bg-[#EFECE9] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Unified Architectural Pearl & Burgundy Ribbon Backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[440px] z-0 overflow-hidden">
        <SafeImage
          src={SITE_IMAGES.pearlRibbonBg}
          alt=""
          className="w-full h-full object-cover opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#EFECE9]/70 via-[#EFECE9]/60 to-[#EFECE9]"
        />
      </div>

      {/* Header Block */}
      <section className="relative z-10 pt-10 sm:pt-14 pb-8">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="İçerik Haritası" className="flex items-center gap-1.5 text-xs text-[#615855] mb-5">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.path}>
                  {idx > 0 ? <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" /> : null}
                  {isLast ? (
                    <span className="font-semibold text-[#36080D]">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="hover:text-[#36080D] transition-colors">
                      {crumb.name}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-10 bg-[#8C5B4D]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wide text-[#7A353B]">{eyebrow}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.08] text-[#1D1716] text-balance">
              {title}
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4B4441] max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 pb-24">{children}</div>
    </div>
  );
}

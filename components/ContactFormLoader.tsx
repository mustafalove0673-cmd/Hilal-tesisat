'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { QuoteForm } from './QuoteForm';
import { SERVICES } from '@/lib/site-data';

export function ContactFormLoader() {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get('hizmet') || 'kombi-bakimi';
  const validSlug = SERVICES.some((s) => s.slug === requestedSlug)
    ? requestedSlug
    : 'kombi-bakimi';

  return <QuoteForm defaultServiceSlug={validSlug} />;
}

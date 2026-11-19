'use client';

import React, { useState } from 'react';
import { Wrench } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  ...rest
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackTitle || 'Hilal Tesisat Görseli'}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE5E1] via-[#DDD5CF] to-[#CBBFB7] text-[#4A0D13] p-4 ${className}`}
      >
        <Wrench className="w-7 h-7 opacity-70 mb-2" aria-hidden="true" />
        <span className="text-xs font-medium text-center text-[#362C29] line-clamp-2">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}

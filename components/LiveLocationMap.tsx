'use client';

import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Layers, MapPin, Navigation, Phone } from 'lucide-react';
import { SITE_INFO } from '@/lib/site-data';

type ZoomPreset = 'street' | 'district' | 'city';
type MapLayer = 'm' | 'k';

const ZOOM_PRESETS: Record<ZoomPreset, { label: string; zoom: number }> = {
  street: { label: 'Sokak', zoom: 17 },
  district: { label: 'Pursaklar', zoom: 14 },
  city: { label: 'Ankara', zoom: 11 },
};

export function LiveLocationMap() {
  const [zoomKey, setZoomKey] = useState<ZoomPreset>('street');
  const [mapLayer, setMapLayer] = useState<MapLayer>('m');
  const [copied, setCopied] = useState(false);

  const query = encodeURIComponent(SITE_INFO.fullAddress);
  const zoom = ZOOM_PRESETS[zoomKey].zoom;

  // Real Google Maps interactive embed (no personal API key or billing lock-in required)
  const googleEmbedUrl = `https://maps.google.com/maps?q=${query}&t=${mapLayer}&z=${zoom}&ie=UTF8&iwloc=&output=embed&hl=tr`;

  async function handleCopyAddress() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(SITE_INFO.fullAddress);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A2C1D] via-[#134A31] to-[#082217] border border-[#6EE7B7]/35 shadow-[0_26px_60px_-22px_rgba(6,38,24,0.62)]">
      {/* Top Emerald Luxury Control Bar */}
      <div className="px-4 py-3.5 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#86EFAC]/18 text-[#F0FDF4]">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#16A34A]/25 border border-[#86EFAC]/45 text-[#A7F3D0] shrink-0">
            <MapPin className="w-4 h-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-medium text-[#A7F3D0]">
              Google Haritalar · Canlı Merkez Servis Konumu
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white truncate">
              {SITE_INFO.fullAddress}
            </div>
          </div>
        </div>

        {/* Interactive Google Maps Layer & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div
            role="group"
            aria-label="Harita görünüm türü"
            className="inline-flex items-center gap-0.5 rounded-xl bg-[#051B11]/65 p-1 border border-[#86EFAC]/20"
          >
            <button
              type="button"
              onClick={() => setMapLayer('m')}
              aria-pressed={mapLayer === 'm'}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors ${
                mapLayer === 'm'
                  ? 'bg-[#22C55E] text-[#042314] shadow-sm'
                  : 'text-[#C6F6D5] hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" aria-hidden="true" />
              <span>Harita</span>
            </button>
            <button
              type="button"
              onClick={() => setMapLayer('k')}
              aria-pressed={mapLayer === 'k'}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors ${
                mapLayer === 'k'
                  ? 'bg-[#22C55E] text-[#042314] shadow-sm'
                  : 'text-[#C6F6D5] hover:text-white'
              }`}
            >
              Uydu
            </button>
          </div>

          <div
            role="group"
            aria-label="Harita yakınlaştırma seviyesi"
            className="inline-flex items-center gap-0.5 rounded-xl bg-[#051B11]/65 p-1 border border-[#86EFAC]/20"
          >
            {(Object.keys(ZOOM_PRESETS) as ZoomPreset[]).map((key) => {
              const active = zoomKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setZoomKey(key)}
                  aria-pressed={active}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#22C55E] text-[#042314] shadow-sm'
                      : 'text-[#C6F6D5] hover:text-white'
                  }`}
                >
                  {ZOOM_PRESETS[key].label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real Google Maps Live Interactive Viewport with Crisp Emerald Framing */}
      <div className="relative h-[290px] sm:h-[360px] w-full bg-[#0C261A]">
        <iframe
          key={`${mapLayer}-${zoom}`}
          title="Hilal Tesisat Google Haritalar Canlı Konumu - Saray Cumhuriyet, Edebali Sk. 7 B, Pursaklar/Ankara"
          src={googleEmbedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0 saturate-[1.08] contrast-[1.02]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#6EE7B7]/25"
        />
      </div>

      {/* Integrated Non-Overlapping Emerald Bottom Address & Directions Bar */}
      <div className="px-4 py-3.5 sm:px-6 border-t border-[#86EFAC]/20 bg-[#082418]/95 text-[#F0FDF4] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center justify-between sm:justify-start gap-3 min-w-0">
          <div className="min-w-0">
            <div className="text-[10.5px] font-medium text-[#86EFAC]">Hilal Tesisat Merkez</div>
            <div className="text-xs sm:text-[13px] font-semibold text-white leading-snug">
              {SITE_INFO.addressLine1}, {SITE_INFO.addressLine2}
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyAddress}
            aria-label="Adresi kopyala"
            className="inline-flex items-center gap-1 rounded-lg bg-[#16A34A]/20 hover:bg-[#16A34A]/35 border border-[#86EFAC]/30 px-2.5 py-1.5 text-[11px] font-medium text-[#DCFCE7] shrink-0 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#4ADE80]" aria-hidden="true" />
                <span>Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" aria-hidden="true" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <a
            href={SITE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#4ADE80] hover:to-[#22C55E] text-[#042314] px-4 py-2 text-xs font-bold shadow-md transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Google Haritalar’da Yol Tarifi</span>
            <ExternalLink className="w-3 h-3 opacity-80" aria-hidden="true" />
          </a>

          <a
            href={SITE_INFO.phoneHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/20 hover:bg-[#16A34A]/35 border border-[#86EFAC]/35 px-3.5 py-2 text-xs font-semibold text-[#ECFDF5] tabular-nums whitespace-nowrap transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#86EFAC]" aria-hidden="true" />
            <span>{SITE_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Check,
  Copy,
  Crosshair,
  ExternalLink,
  Layers,
  Loader2,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react';
import { SITE_INFO } from '@/lib/site-data';
import {
  buildLiveDirectionsUrl,
  buildMiniMapEmbedUrl,
  formatTurkishDistance,
} from '@/lib/location-routing';
import { useLiveLocation } from './LocationProvider';

type ZoomPreset = 'street' | 'district' | 'city';
type MapLayer = 'm' | 'k';

const ZOOM_PRESETS: Record<ZoomPreset, { label: string; zoom: number }> = {
  street: { label: 'Sokak', zoom: 16 },
  district: { label: 'Pursaklar', zoom: 14 },
  city: { label: 'Ankara', zoom: 11 },
};

export function LiveLocationMap() {
  const [zoomKey, setZoomKey] = useState<ZoomPreset>('street');
  const [mapLayer, setMapLayer] = useState<MapLayer>('m');
  const [copied, setCopied] = useState(false);
  const [showPinOnly, setShowPinOnly] = useState(false);

  const {
    origin: sharedOrigin,
    distanceKm,
    etaMinutes,
    permissionState,
    requestLiveLocation,
  } = useLiveLocation();

  const userOrigin = showPinOnly ? null : sharedOrigin;
  const gpsState =
    permissionState === 'requesting'
      ? 'locating'
      : sharedOrigin && permissionState === 'granted'
        ? 'connected'
        : permissionState === 'denied'
          ? 'denied'
          : 'idle';

  const query = encodeURIComponent(SITE_INFO.fullAddress);
  const zoom = ZOOM_PRESETS[zoomKey].zoom;

  const directionsUrl = sharedOrigin
    ? buildLiveDirectionsUrl(sharedOrigin, SITE_INFO.coordinates, SITE_INFO.fullAddress)
    : SITE_INFO.googleMapsUrl;

  // Real Google Maps interactive embed (no personal API key or billing lock-in required)
  const googleEmbedUrl = userOrigin
    ? buildMiniMapEmbedUrl(userOrigin, SITE_INFO.fullAddress, zoom)
    : `https://maps.google.com/maps?q=${query}&t=${mapLayer}&z=${zoom}&ie=UTF8&iwloc=&output=embed&hl=tr`;

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

  function handleConnectLiveGps() {
    setShowPinOnly(false);
    requestLiveLocation({ userInitiated: true });
  }

  return (
    <div
      id="konum-harita"
      className="relative scroll-mt-24 rounded-2xl sm:rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md border border-[#E5DCD5] shadow-[0_24px_60px_-28px_rgba(38,16,20,0.16)]"
    >
      {/* Clean Light Header Bar with Fresh Green Live-Location Accent */}
      <div className="px-4 py-3.5 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#EFE8E2] bg-white/95">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#ECFDF5] border border-[#BBF7D0] text-[#15803D] shrink-0">
            <MapPin className="w-4 h-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#15803D]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
              <span>
                {gpsState === 'connected' && distanceKm !== null && etaMinutes !== null
                  ? `Canlı GPS Bağlı · ${formatTurkishDistance(distanceKm)} (~${etaMinutes} dk)`
                  : 'Canlı Konum · Google Haritalar'}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#1F1716] truncate">
              {SITE_INFO.fullAddress}
            </div>
          </div>
        </div>

        {/* Clean Segmented Layer & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div
            role="group"
            aria-label="Harita görünüm türü"
            className="inline-flex items-center gap-0.5 rounded-xl bg-[#F4EFEA] p-1 border border-[#E7DDD5]"
          >
            <button
              type="button"
              onClick={() => {
                setShowPinOnly(true);
                setMapLayer('m');
              }}
              aria-pressed={mapLayer === 'm' && !userOrigin}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors ${
                mapLayer === 'm' && !userOrigin
                  ? 'bg-white text-[#15803D] shadow-sm'
                  : 'text-[#6B5D58] hover:text-[#1F1716]'
              }`}
            >
              <Layers className="w-3 h-3" aria-hidden="true" />
              <span>Harita</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setShowPinOnly(true);
                setMapLayer('k');
              }}
              aria-pressed={mapLayer === 'k' && !userOrigin}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors ${
                mapLayer === 'k' && !userOrigin
                  ? 'bg-white text-[#15803D] shadow-sm'
                  : 'text-[#6B5D58] hover:text-[#1F1716]'
              }`}
            >
              Uydu
            </button>
          </div>

          <div
            role="group"
            aria-label="Harita yakınlaştırma seviyesi"
            className="inline-flex items-center gap-0.5 rounded-xl bg-[#F4EFEA] p-1 border border-[#E7DDD5]"
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
                      ? 'bg-white text-[#15803D] shadow-sm'
                      : 'text-[#6B5D58] hover:text-[#1F1716]'
                  }`}
                >
                  {ZOOM_PRESETS[key].label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pure Bright True-Color Google Maps Interactive Viewport */}
      <div className="relative h-[320px] sm:h-[400px] w-full bg-[#EEF4EE]">
        <iframe
          key={googleEmbedUrl}
          title="Hilal Tesisat Google Haritalar Canlı Konumu - Saray Cumhuriyet, Edebali Sk. 7 B, Pursaklar/Ankara"
          src={googleEmbedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />
      </div>

      {/* Clean Light Address & Directions Footer Bar */}
      <div className="px-4 py-3.5 sm:px-6 border-t border-[#EFE8E2] bg-[#FAF7F4] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center justify-between sm:justify-start gap-3 min-w-0">
          <div className="min-w-0">
            <div className="text-[10.5px] font-medium text-[#7A6B65]">Hilal Tesisat Merkez</div>
            <div className="text-xs sm:text-[13px] font-semibold text-[#1F1716] leading-snug">
              {SITE_INFO.addressLine1}, {SITE_INFO.addressLine2}
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyAddress}
            aria-label="Adresi kopyala"
            className="inline-flex items-center gap-1 rounded-lg bg-white hover:bg-[#ECFDF5] border border-[#E4DAD2] hover:border-[#86EFAC] px-2.5 py-1.5 text-[11px] font-medium text-[#3B2E2A] hover:text-[#15803D] shrink-0 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#16A34A]" aria-hidden="true" />
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
          <button
            type="button"
            onClick={handleConnectLiveGps}
            disabled={gpsState === 'locating'}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] hover:bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
          >
            {gpsState === 'locating' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Crosshair className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {gpsState === 'connected' ? 'Konumu Güncelle' : 'Canlı Konumumdan Hesapla'}
            </span>
          </button>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-2 text-xs font-semibold shadow-sm transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {gpsState === 'connected'
                ? 'Konumumdan Yol Tarifi Başlat'
                : 'Google Haritalar’da Yol Tarifi'}
            </span>
            <ExternalLink className="w-3 h-3 opacity-85" aria-hidden="true" />
          </a>

          <a
            href={SITE_INFO.phoneHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-[#FAF4EE] border border-[#E4DAD2] px-3.5 py-2 text-xs font-semibold text-[#7D1225] tabular-nums whitespace-nowrap transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#9E152E]" aria-hidden="true" />
            <span>{SITE_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Crosshair,
  ExternalLink,
  Loader2,
  MapPin,
  Maximize2,
  Minimize2,
  Navigation,
  Route,
} from 'lucide-react';
import { SITE_INFO } from '@/lib/site-data';
import {
  buildLiveDirectionsUrl,
  buildMiniMapEmbedUrl,
  formatTurkishDistance,
} from '@/lib/location-routing';
import { EASE_LUXURY, SPRING_ARCHITECTURAL } from './MotionPrimitives';
import { useLiveLocation } from './LocationProvider';

type WidgetSize = 'minimized' | 'compact' | 'expanded';

function subscribeDesktopViewport(callback: () => void) {
  const mql = window.matchMedia('(min-width: 640px)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getDesktopViewportSnapshot() {
  return window.matchMedia('(min-width: 640px)').matches;
}

function getDesktopViewportServerSnapshot() {
  return false;
}

export function FloatingLiveLocationMap() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeDesktopViewport,
    getDesktopViewportSnapshot,
    getDesktopViewportServerSnapshot,
  );
  const [sizeOverride, setSizeOverride] = useState<WidgetSize | null>(null);
  const {
    origin: userOrigin,
    distanceKm,
    etaMinutes,
    permissionState,
    requestLiveLocation,
  } = useLiveLocation();

  const gpsStatus =
    permissionState === 'requesting'
      ? 'locating'
      : userOrigin && permissionState === 'granted'
        ? 'connected'
        : permissionState === 'denied' ||
            permissionState === 'unavailable' ||
            permissionState === 'timeout'
          ? 'denied'
          : permissionState === 'unsupported'
            ? 'unsupported'
            : 'idle';

  const size: WidgetSize = sizeOverride ?? (isDesktop ? 'compact' : 'minimized');

  const destination = SITE_INFO.coordinates;
  const directionsUrl = buildLiveDirectionsUrl(userOrigin, destination, SITE_INFO.fullAddress);
  const embedUrl = buildMiniMapEmbedUrl(
    userOrigin,
    SITE_INFO.fullAddress,
    size === 'expanded' ? 16 : 15,
  );

  function handleConnectLiveLocation() {
    requestLiveLocation({ userInitiated: true });
  }

  function handleExpandFromMinimized() {
    setSizeOverride(isDesktop ? 'compact' : 'expanded');
  }

  function handleToggleSize() {
    if (size === 'minimized') {
      handleExpandFromMinimized();
      return;
    }
    if (size === 'compact') {
      setSizeOverride('expanded');
      return;
    }
    setSizeOverride(isDesktop ? 'compact' : 'minimized');
  }

  return (
    <aside
      aria-label="Hilal Tesisat Canlı Konum ve Yol Tarifi Mini Harita"
      data-testid="floating-live-map"
      data-size={size}
      data-gps-status={gpsStatus}
      className="fixed bottom-[62px] left-3 sm:bottom-5 sm:left-5 z-40 pointer-events-auto"
    >
      <AnimatePresence mode="wait" initial={false}>
        {size === 'minimized' ? (
          <motion.div
            key="minimized-pill"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 12 }}
            transition={SPRING_ARCHITECTURAL}
            className="group relative flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-xl border border-[#16A34A]/35 pl-2 pr-1.5 py-1.5 shadow-[0_14px_34px_-10px_rgba(22,101,52,0.34)] ring-1 ring-white/80"
          >
            {/* Ambient Shimmer Border Glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[1px] rounded-full bg-gradient-to-r from-[#22C55E]/25 via-[#A81830]/15 to-[#22C55E]/25 opacity-60 blur-[2px] -z-10"
            />

            <button
              type="button"
              onClick={handleExpandFromMinimized}
              aria-label="Canlı haritayı aç ve yol tarifi al"
              className="flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] rounded-full pr-1"
            >
              <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#ECFDF5] border border-[#86EFAC] text-[#15803D] shrink-0">
                {!prefersReducedMotion ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[#22C55E]/35 animate-ping"
                  />
                ) : null}
                <MapPin className="relative w-3.5 h-3.5" aria-hidden="true" />
              </span>

              <span className="leading-tight">
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#1A1312] whitespace-nowrap">
                  <span>Canlı Harita</span>
                  {distanceKm !== null ? (
                    <span className="text-[10px] font-semibold text-[#15803D] tabular-nums">
                      · {formatTurkishDistance(distanceKm)}
                    </span>
                  ) : null}
                </span>
                <span className="block text-[9.5px] font-medium text-[#5D524E] whitespace-nowrap">
                  Pursaklar · Yol Tarifi
                </span>
              </span>
            </button>

            <button
              type="button"
              data-testid="floating-map-toggle"
              onClick={handleExpandFromMinimized}
              aria-label="Canlı haritayı büyüt"
              title="Haritayı Büyüt"
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-sm transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="map-card"
            layout={!prefersReducedMotion}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.34, ease: EASE_LUXURY }}
            className={`relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-[#16A34A]/30 shadow-[0_22px_54px_-16px_rgba(20,52,34,0.34)] ring-1 ring-white/90 transition-[width] duration-300 ${
              size === 'expanded'
                ? 'w-[calc(100vw-24px)] max-w-[348px] sm:w-[348px]'
                : 'w-[258px]'
            }`}
          >
            {/* Subtle Animated Top Accent Line */}
            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="h-[2.5px] w-full bg-gradient-to-r from-[#16A34A] via-[#4ADE80] via-50% to-[#A81830] bg-[length:200%_100%]"
            />

            {/* Header Bar with Live Radar Dot + Special Minimize / Maximize Mini Controls */}
            <div className="px-3 py-2 flex items-center justify-between gap-2 bg-white/95 border-b border-[#EFE8E2]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#ECFDF5] border border-[#86EFAC] text-[#15803D] shrink-0">
                  {!prefersReducedMotion ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-[#22C55E]/35 animate-ping"
                    />
                  ) : null}
                  <MapPin className="relative w-3 h-3" aria-hidden="true" />
                </span>
                <div className="min-w-0 leading-tight">
                  <div className="flex items-center gap-1 text-[10.5px] font-bold text-[#15803D] truncate">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                    <span className="truncate">
                      {gpsStatus === 'connected' ? 'Canlı GPS Bağlı' : 'Canlı Konum · Harita'}
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold text-[#231918] truncate">
                    {SITE_INFO.addressLine1}
                  </div>
                </div>
              </div>

              {/* Dedicated Special Small Resize Buttons (Küçült & Büyüt) */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  data-testid="floating-map-toggle"
                  onClick={handleToggleSize}
                  aria-label={
                    size === 'expanded' ? 'Canlı haritayı küçült' : 'Canlı haritayı büyüt'
                  }
                  title={size === 'expanded' ? 'Küçült' : 'Büyüt'}
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ECFDF5] hover:bg-[#16A34A] text-[#15803D] hover:text-white border border-[#86EFAC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                >
                  {size === 'expanded' ? (
                    <Minimize2 className="w-3 h-3" aria-hidden="true" />
                  ) : (
                    <Maximize2 className="w-3 h-3" aria-hidden="true" />
                  )}
                </button>

                {size === 'compact' ? (
                  <button
                    type="button"
                    data-testid="floating-map-collapse"
                    onClick={() => setSizeOverride('minimized')}
                    aria-label="Mini haritayı simge durumuna küçült"
                    title="Simge Durumuna Küçült"
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F5EFEA] hover:bg-[#9E162C] text-[#5C4E49] hover:text-white border border-[#E5DAD2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E162C]"
                  >
                    <Minimize2 className="w-3 h-3" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    data-testid="floating-map-collapse"
                    onClick={() => setSizeOverride('minimized')}
                    aria-label="Haritayı tamamen küçült"
                    title="Tamamen Küçült"
                    className="hidden sm:inline-flex items-center justify-center px-1.5 h-6 rounded-full bg-[#F5EFEA] hover:bg-[#9E162C] text-[9.5px] font-semibold text-[#5C4E49] hover:text-white border border-[#E5DAD2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E162C]"
                  >
                    Gizle
                  </button>
                )}
              </div>
            </div>

            {/* Live Interactive Google Maps Preview Window */}
            <div
              className={`relative w-full bg-[#EAF4EC] transition-[height] duration-300 ${
                size === 'expanded' ? 'h-[192px]' : 'h-[118px]'
              }`}
            >
              <iframe
                key={embedUrl}
                title="Hilal Tesisat Canlı Mini Harita Önizlemesi"
                src={embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />

              {/* Live Distance & ETA Overlay Badge When GPS Is Connected */}
              {gpsStatus === 'connected' && distanceKm !== null && etaMinutes !== null ? (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 rounded-xl bg-[#113A22]/92 backdrop-blur-md border border-[#86EFAC]/45 px-2.5 py-1.5 text-white shadow-lg"
                >
                  <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold">
                    <Route className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" aria-hidden="true" />
                    <span>Konumunuzdan Rota Hazır</span>
                  </span>
                  <span
                    data-testid="floating-map-distance"
                    className="text-[10.5px] font-bold text-[#BBF7D0] tabular-nums whitespace-nowrap"
                  >
                    {formatTurkishDistance(distanceKm)} · ~{etaMinutes} dk
                  </span>
                </motion.div>
              ) : null}
            </div>

            {/* Footer Controls: Connect Phone Live GPS + Turn-by-Turn Google Maps Navigation */}
            <div className="p-2.5 bg-[#FAF7F4] border-t border-[#EFE8E2] space-y-2">
              {size === 'expanded' ? (
                <div className="flex items-center justify-between gap-2 text-[10.5px] text-[#4E423E]">
                  <span className="truncate font-medium">
                    {SITE_INFO.addressLine1}, {SITE_INFO.addressLine2}
                  </span>
                </div>
              ) : null}

              {size === 'expanded' && (gpsStatus === 'denied' || gpsStatus === 'unsupported') ? (
                <p
                  role="status"
                  className="text-[10px] leading-snug text-[#8C1D28] bg-[#FFF5F5] border border-[#FECACA] rounded-lg px-2 py-1"
                >
                  {gpsStatus === 'denied'
                    ? 'Konum izni verilmedi. Doğrudan Google Haritalar ile yol tarifi alabilirsiniz.'
                    : 'Tarayıcınız canlı konum desteklemiyor. Doğrudan Google Haritalar ile devam edin.'}
                </p>
              ) : null}

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  data-testid="floating-map-gps-btn"
                  onClick={handleConnectLiveLocation}
                  disabled={gpsStatus === 'locating'}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[10.5px] font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] ${
                    gpsStatus === 'connected'
                      ? 'bg-[#ECFDF5] text-[#15803D] border border-[#86EFAC] hover:bg-[#DCFCE7]'
                      : 'bg-white text-[#1A1312] border border-[#D9CFC8] hover:border-[#16A34A] hover:text-[#15803D]'
                  }`}
                >
                  {gpsStatus === 'locating' ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin text-[#16A34A]" aria-hidden="true" />
                      <span>Konum Alınıyor...</span>
                    </>
                  ) : gpsStatus === 'connected' ? (
                    <>
                      <Crosshair className="w-3 h-3 text-[#16A34A]" aria-hidden="true" />
                      <span>Konumu Yenile</span>
                    </>
                  ) : (
                    <>
                      <Crosshair className="w-3 h-3 text-[#16A34A]" aria-hidden="true" />
                      <span>Canlı Konumum</span>
                    </>
                  )}
                </button>

                <a
                  data-testid="floating-map-directions-link"
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white px-2.5 py-1.5 text-[10.5px] font-semibold shadow-sm transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <Navigation className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{gpsStatus === 'connected' ? 'Rotayı Başlat' : 'Yol Tarifi'}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-85 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

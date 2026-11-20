'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  CheckCircle2,
  Crosshair,
  ExternalLink,
  Loader2,
  MapPin,
  Navigation,
  X,
} from 'lucide-react';
import { SITE_INFO } from '@/lib/site-data';
import {
  buildLiveDirectionsUrl,
  calculateHaversineKm,
  estimateDrivingMinutes,
  formatTurkishDistance,
  type GeoPoint,
} from '@/lib/location-routing';
import {
  getLocationBannerCopy,
  resolveGeolocationErrorState,
  shouldShowLocationBanner,
  type LocationPermissionState,
} from '@/lib/location-permission';
import { EASE_LUXURY } from './MotionPrimitives';

const SESSION_DISMISS_KEY = 'hilal_location_banner_dismissed_v1';

interface LiveLocationContextValue {
  origin: GeoPoint | null;
  distanceKm: number | null;
  etaMinutes: number | null;
  permissionState: LocationPermissionState;
  justGranted: boolean;
  bannerVisible: boolean;
  requestLiveLocation: (options?: { userInitiated?: boolean }) => void;
  dismissBanner: () => void;
  clearOrigin: () => void;
}

const LiveLocationContext = createContext<LiveLocationContextValue | null>(null);

export function useLiveLocation(): LiveLocationContextValue {
  const ctx = useContext(LiveLocationContext);
  if (!ctx) {
    throw new Error('useLiveLocation must be used within LocationProvider');
  }
  return ctx;
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [origin, setOrigin] = useState<GeoPoint | null>(null);
  const [permissionState, setPermissionState] = useState<LocationPermissionState>('checking');
  const [dismissed, setDismissed] = useState(false);
  const [entryPrompted, setEntryPrompted] = useState(false);
  const [justGranted, setJustGranted] = useState(false);

  const inFlightRef = useRef(false);
  const bannerWasOpenRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const fallbackBannerTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  const bannerVisible = shouldShowLocationBanner({
    state: permissionState,
    dismissed,
    justGranted,
    entryPrompted,
  });

  useEffect(() => {
    bannerWasOpenRef.current = bannerVisible && !justGranted;
  }, [bannerVisible, justGranted]);

  const scheduleAutoCloseAfterGrant = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    setJustGranted(true);
    closeTimerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return;
      setJustGranted(false);
      closeTimerRef.current = null;
    }, 2200);
  }, []);

  const fetchPosition = useCallback(
    (opts: { notifyIfBannerOpen: boolean; userInitiated: boolean }) => {
      if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
        setPermissionState('unsupported');
        return;
      }
      if (inFlightRef.current) return;
      inFlightRef.current = true;

      const wasOpen = bannerWasOpenRef.current;

      if (opts.userInitiated) {
        setDismissed(false);
        setEntryPrompted(true);
        try {
          window.sessionStorage.removeItem(SESSION_DISMISS_KEY);
        } catch {
          // Ignore storage restrictions
        }
      }

      setPermissionState((prev) => (prev === 'granted' ? 'granted' : 'requesting'));

      // If the native browser permission prompt stays unanswered, reveal the helpful on-screen guide
      if (fallbackBannerTimerRef.current !== null) {
        window.clearTimeout(fallbackBannerTimerRef.current);
      }
      fallbackBannerTimerRef.current = window.setTimeout(() => {
        if (!mountedRef.current) return;
        setEntryPrompted(true);
      }, 650);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          inFlightRef.current = false;
          if (fallbackBannerTimerRef.current !== null) {
            window.clearTimeout(fallbackBannerTimerRef.current);
            fallbackBannerTimerRef.current = null;
          }
          if (!mountedRef.current) return;

          setOrigin({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setPermissionState('granted');
          setDismissed(false);

          if (opts.notifyIfBannerOpen && (wasOpen || bannerWasOpenRef.current)) {
            scheduleAutoCloseAfterGrant();
          }
        },
        (err) => {
          inFlightRef.current = false;
          if (fallbackBannerTimerRef.current !== null) {
            window.clearTimeout(fallbackBannerTimerRef.current);
            fallbackBannerTimerRef.current = null;
          }
          if (!mountedRef.current) return;

          const nextState = resolveGeolocationErrorState(err.code);
          setPermissionState(nextState);
          setEntryPrompted(true);
          if (nextState === 'denied') {
            setOrigin(null);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        },
      );
    },
    [scheduleAutoCloseAfterGrant],
  );

  // Site-entry permission check + automatic native request + live browser permission watcher
  useEffect(() => {
    mountedRef.current = true;

    let permStatus: PermissionStatus | null = null;
    let entryTimer: number | null = null;

    const handlePermissionChange = () => {
      if (!mountedRef.current || !permStatus) return;
      const state = permStatus.state;

      if (state === 'granted') {
        const shouldConfirm = bannerWasOpenRef.current;
        setPermissionState('granted');
        if (shouldConfirm) {
          scheduleAutoCloseAfterGrant();
        }
        fetchPosition({ notifyIfBannerOpen: shouldConfirm, userInitiated: false });
      } else if (state === 'denied') {
        setOrigin(null);
        setJustGranted(false);
        setPermissionState('denied');
        setEntryPrompted(true);
      } else {
        setPermissionState('prompt');
      }
    };

    const recheckOnFocus = async () => {
      if (!mountedRef.current) return;
      if (navigator.permissions?.query) {
        try {
          const fresh = await navigator.permissions.query({ name: 'geolocation' });
          if (!mountedRef.current) return;
          if (fresh.state === 'granted' && bannerWasOpenRef.current) {
            setPermissionState('granted');
            scheduleAutoCloseAfterGrant();
            fetchPosition({ notifyIfBannerOpen: true, userInitiated: false });
          } else if (fresh.state === 'granted') {
            setPermissionState('granted');
            fetchPosition({ notifyIfBannerOpen: false, userInitiated: false });
          } else if (fresh.state === 'denied') {
            setPermissionState('denied');
            setOrigin(null);
          }
        } catch {
          // Ignore browsers rejecting permissions.query
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void recheckOnFocus();
      }
    };

    const init = async () => {
      await Promise.resolve();
      if (!mountedRef.current) return;

      let savedDismissed = false;
      try {
        savedDismissed = window.sessionStorage.getItem(SESSION_DISMISS_KEY) === '1';
        if (savedDismissed) {
          setDismissed(true);
        }
      } catch {
        // Ignore storage restriction
      }

      if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
        setPermissionState('unsupported');
        return;
      }

      if (navigator.permissions?.query) {
        try {
          permStatus = await navigator.permissions.query({ name: 'geolocation' });
          if (!mountedRef.current) return;

          permStatus.addEventListener('change', handlePermissionChange);

          if (permStatus.state === 'granted') {
            setPermissionState('granted');
            fetchPosition({ notifyIfBannerOpen: false, userInitiated: false });
            return;
          }

          if (permStatus.state === 'denied') {
            setPermissionState('denied');
            setEntryPrompted(true);
            return;
          }

          // State is 'prompt': show entry notification & trigger native browser prompt cleanly
          setPermissionState('prompt');
          entryTimer = window.setTimeout(() => {
            if (!mountedRef.current) return;
            setEntryPrompted(true);
            if (!savedDismissed) {
              fetchPosition({ notifyIfBannerOpen: true, userInitiated: false });
            }
          }, 420);
          return;
        } catch {
          // Fall through to direct geolocation request on browsers without Permissions API
        }
      }

      // Fallback (e.g., iOS Safari without Permissions API for geolocation)
      entryTimer = window.setTimeout(() => {
        if (!mountedRef.current) return;
        setEntryPrompted(true);
        if (!savedDismissed) {
          fetchPosition({ notifyIfBannerOpen: true, userInitiated: false });
        }
      }, 420);
    };

    void init();

    window.addEventListener('focus', recheckOnFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mountedRef.current = false;
      if (entryTimer !== null) window.clearTimeout(entryTimer);
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
      if (fallbackBannerTimerRef.current !== null) {
        window.clearTimeout(fallbackBannerTimerRef.current);
      }
      if (permStatus) {
        permStatus.removeEventListener('change', handlePermissionChange);
      }
      window.removeEventListener('focus', recheckOnFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchPosition, scheduleAutoCloseAfterGrant]);

  const requestLiveLocation = useCallback(
    (options?: { userInitiated?: boolean }) => {
      fetchPosition({
        notifyIfBannerOpen: true,
        userInitiated: options?.userInitiated ?? true,
      });
    },
    [fetchPosition],
  );

  const dismissBanner = useCallback(() => {
    setDismissed(true);
    setJustGranted(false);
    try {
      window.sessionStorage.setItem(SESSION_DISMISS_KEY, '1');
    } catch {
      // Ignore storage restriction
    }
  }, []);

  const clearOrigin = useCallback(() => {
    setOrigin(null);
  }, []);

  const distanceKm = useMemo(
    () => (origin ? calculateHaversineKm(origin, SITE_INFO.coordinates) : null),
    [origin],
  );

  const etaMinutes = useMemo(
    () => (distanceKm !== null ? estimateDrivingMinutes(distanceKm) : null),
    [distanceKm],
  );

  const value = useMemo<LiveLocationContextValue>(
    () => ({
      origin,
      distanceKm,
      etaMinutes,
      permissionState,
      justGranted,
      bannerVisible,
      requestLiveLocation,
      dismissBanner,
      clearOrigin,
    }),
    [
      origin,
      distanceKm,
      etaMinutes,
      permissionState,
      justGranted,
      bannerVisible,
      requestLiveLocation,
      dismissBanner,
      clearOrigin,
    ],
  );

  const copy = getLocationBannerCopy(permissionState, justGranted);
  const directionsUrl = buildLiveDirectionsUrl(origin, SITE_INFO.coordinates, SITE_INFO.fullAddress);

  return (
    <LiveLocationContext.Provider value={value}>
      {children}

      {/* On-Screen Location Permission Notification (Auto-Confirms & Auto-Closes When Granted) */}
      <AnimatePresence>
        {bannerVisible ? (
          <motion.aside
            key={justGranted ? 'loc-confirmed' : 'loc-prompt'}
            role={justGranted ? 'status' : 'alert'}
            aria-live="polite"
            aria-label="Konum İzni Bildirimi"
            data-testid="location-permission-banner"
            data-permission-state={permissionState}
            data-banner-phase={justGranted ? 'confirmed' : 'prompt'}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.96 }}
            transition={{ duration: 0.28, ease: EASE_LUXURY }}
            className="fixed top-[68px] sm:top-[80px] left-3 right-3 sm:left-auto sm:right-5 sm:w-[372px] z-50 pointer-events-auto"
          >
            <div
              className={`relative overflow-hidden rounded-2xl backdrop-blur-xl shadow-[0_22px_50px_-14px_rgba(32,8,14,0.32)] border ${
                justGranted
                  ? 'bg-[#F0FDF4]/96 border-[#86EFAC] text-[#14532D]'
                  : 'bg-white/96 border-[#A81830]/25 text-[#1F1716]'
              }`}
            >
              {/* Top Accent Bar (Auto-Close Countdown Bar on Confirmation) */}
              {justGranted ? (
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 2.2, ease: 'linear' }}
                  className="h-[3px] w-full origin-left bg-[#16A34A]"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="h-[3px] w-full bg-gradient-to-r from-[#A81830] via-[#D97706] to-[#16A34A]"
                />
              )}

              <div className="p-3.5 sm:p-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0 mt-0.5 ${
                      justGranted
                        ? 'bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]'
                        : 'bg-[#FFF1F2] text-[#A81830] border border-[#FECDD3]'
                    }`}
                  >
                    {justGranted ? (
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    ) : permissionState === 'requesting' ? (
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <>
                        {!prefersReducedMotion ? (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-[#A81830]/20 animate-ping"
                          />
                        ) : null}
                        <MapPin className="relative w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10.5px] font-bold tracking-wide uppercase ${
                          justGranted ? 'text-[#15803D]' : 'text-[#A81830]'
                        }`}
                      >
                        {copy.badge}
                      </span>

                      <button
                        type="button"
                        onClick={dismissBanner}
                        aria-label="Konum bildirimini kapat"
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[#6E605B] hover:bg-black/5 hover:text-[#1A1312] transition-colors shrink-0"
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <h3 className="mt-0.5 text-[13px] sm:text-[13.5px] font-bold leading-snug text-[#1A1312]">
                      {copy.title}
                    </h3>

                    <p className="mt-1 text-[11.5px] leading-relaxed text-[#4C413E]">
                      {justGranted && distanceKm !== null && etaMinutes !== null
                        ? `Konum izni alındı! Hilal Tesisat’a mesafeniz ${formatTurkishDistance(distanceKm)} (~${etaMinutes} dk). Canlı rota güncellendi.`
                        : copy.description}
                    </p>

                    {!justGranted ? (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          data-testid="location-banner-allow-btn"
                          onClick={() => requestLiveLocation({ userInitiated: true })}
                          disabled={permissionState === 'requesting'}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-70 text-white px-3.5 py-1.5 text-[11.5px] font-semibold shadow-sm transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                        >
                          {permissionState === 'requesting' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                          ) : (
                            <Crosshair className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                          <span>{copy.actionLabel}</span>
                        </button>

                        <a
                          href={directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-[#F5EFEA] hover:bg-[#EAE1DA] text-[#352926] px-3 py-1.5 text-[11px] font-semibold transition-colors whitespace-nowrap"
                        >
                          <Navigation className="w-3 h-3 text-[#15803D]" aria-hidden="true" />
                          <span>Haritada Aç</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" aria-hidden="true" />
                        </a>

                        <button
                          type="button"
                          data-testid="location-banner-dismiss-btn"
                          onClick={dismissBanner}
                          className="text-[11px] font-medium text-[#6B5D58] hover:text-[#1A1312] px-1.5 py-1 transition-colors whitespace-nowrap"
                        >
                          Şimdi Değil
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </LiveLocationContext.Provider>
  );
}

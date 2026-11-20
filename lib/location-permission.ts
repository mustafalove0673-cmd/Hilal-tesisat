export type LocationPermissionState =
  | 'checking'
  | 'prompt'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'timeout'
  | 'unsupported';

export interface LocationBannerCopy {
  badge: string;
  title: string;
  description: string;
  actionLabel: string;
  hint?: string;
}

/**
 * Maps standard W3C GeolocationPositionError codes to explicit UI states.
 * 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT
 */
export function resolveGeolocationErrorState(errorCode: number): LocationPermissionState {
  if (errorCode === 1) return 'denied';
  if (errorCode === 2) return 'unavailable';
  if (errorCode === 3) return 'timeout';
  return 'denied';
}

/**
 * Determines whether the on-screen location permission notification should be visible.
 * Automatically stays visible during the brief `justGranted` confirmation phase so
 * the user clearly sees confirmation before the banner auto-closes.
 */
export function shouldShowLocationBanner(params: {
  state: LocationPermissionState;
  dismissed: boolean;
  justGranted: boolean;
  entryPrompted: boolean;
}): boolean {
  const { state, dismissed, justGranted, entryPrompted } = params;
  if (justGranted) return true;
  if (dismissed) return false;
  if (state === 'granted' || state === 'checking' || state === 'unsupported') {
    return false;
  }
  if (state === 'denied' || state === 'unavailable' || state === 'timeout') {
    return true;
  }
  // For 'prompt' or 'requesting', display once the entry prompt check has started
  return entryPrompted;
}

/**
 * Returns crisp, actionable Turkish notification copy for each permission state.
 */
export function getLocationBannerCopy(
  state: LocationPermissionState,
  justGranted: boolean,
): LocationBannerCopy {
  if (justGranted || state === 'granted') {
    return {
      badge: 'Konum İzni Onaylandı',
      title: 'Canlı Konumunuz Bağlandı',
      description:
        'Hilal Tesisat’a olan mesafeniz ve canlı yol tarifiniz haritaya otomatik yüklendi.',
      actionLabel: 'Tamam',
    };
  }

  if (state === 'denied') {
    return {
      badge: 'Konum İzni Gerekli',
      title: 'Canlı Yol Tarifi İçin Konum İznini Açın',
      description:
        'Konum izni şu an kapalı. Tarayıcı adres çubuğundaki kilit/konum simgesinden izin verin; izin verildiğinde bu bildirim otomatik kapanacaktır.',
      actionLabel: 'Tekrar Dene',
      hint: 'İzin verildiği anda mesafe ve canlı rota anında güncellenir.',
    };
  }

  if (state === 'timeout') {
    return {
      badge: 'GPS Bekleniyor',
      title: 'Konum Sinyali Zaman Aşımına Uğradı',
      description:
        'Cihazınızdan konum bilgisi alınamadı. Telefon GPS’inizin açık olduğundan emin olup tekrar deneyin.',
      actionLabel: 'Konumu Tekrar Al',
    };
  }

  if (state === 'unavailable') {
    return {
      badge: 'Konum Bulunamadı',
      title: 'Cihaz Konumu Şu An Alınamıyor',
      description:
        'Cihazınızın konum servisi kapalı görünüyor. Konumu açıp tekrar deneyebilir veya doğrudan haritada yol tarifi alabilirsiniz.',
      actionLabel: 'Tekrar Dene',
    };
  }

  if (state === 'requesting') {
    return {
      badge: 'Konum İzni Bekleniyor',
      title: 'Tarayıcı Konum İznini Onaylayın',
      description:
        'Açılan tarayıcı penceresinde "İzin Ver" seçeneğine dokunun; onayladığınız anda canlı rota açılıp bu bildirim kapanır.',
      actionLabel: 'İzin İste',
    };
  }

  return {
    badge: 'Canlı Konum & Yol Tarifi',
    title: 'Size En Yakın Rota İçin Konum İzni Verin',
    description:
      'Hilal Tesisat’a (Pursaklar/Ankara) anlık mesafenizi ve tek tıkla canlı yol tarifini göstermek için konum iznine ihtiyacımız var.',
    actionLabel: 'Konum İznini Ver',
  };
}

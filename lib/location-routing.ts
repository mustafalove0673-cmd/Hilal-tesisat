export interface GeoPoint {
  lat: number;
  lng: number;
}

const EARTH_RADIUS_KM = 6371;

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Calculates great-circle distance in kilometers between two latitude/longitude points
 * using the Haversine formula, rounded to 1 decimal place.
 */
export function calculateHaversineKm(origin: GeoPoint, destination: GeoPoint): number {
  if (
    !Number.isFinite(origin.lat) ||
    !Number.isFinite(origin.lng) ||
    !Number.isFinite(destination.lat) ||
    !Number.isFinite(destination.lng)
  ) {
    return 0;
  }

  const dLat = toRadians(destination.lat - origin.lat);
  const dLng = toRadians(destination.lng - origin.lng);
  const lat1 = toRadians(origin.lat);
  const lat2 = toRadians(destination.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const rawKm = EARTH_RADIUS_KM * c;

  return Math.round(rawKm * 10) / 10;
}

/**
 * Estimates urban driving duration in minutes from straight-line Haversine distance.
 * Applies a 1.28x road-winding factor and ~38 km/h average urban Ankara traffic speed.
 */
export function estimateDrivingMinutes(distanceKm: number): number {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    return 3;
  }
  const roadKm = distanceKm * 1.28;
  const minutes = Math.round((roadKm / 38) * 60);
  return Math.max(3, minutes);
}

/**
 * Formats distance in Turkish (e.g., "17,9 km" or "650 m").
 */
export function formatTurkishDistance(distanceKm: number): string {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    return '100 m';
  }
  if (distanceKm < 1) {
    const meters = Math.max(50, Math.round(distanceKm * 1000));
    return `${meters} m`;
  }
  return `${distanceKm.toFixed(1).replace('.', ',')} km`;
}

/**
 * Builds a universal Google Maps turn-by-turn driving directions URL.
 * Works on iOS, Android, and desktop browsers with zero API key required.
 */
export function buildLiveDirectionsUrl(
  origin: GeoPoint | null,
  destination: GeoPoint,
  destinationAddress: string,
): string {
  const destParam = encodeURIComponent(
    destinationAddress.trim() || `${destination.lat},${destination.lng}`,
  );
  if (origin && Number.isFinite(origin.lat) && Number.isFinite(origin.lng)) {
    const originParam = `${origin.lat.toFixed(6)},${origin.lng.toFixed(6)}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${originParam}&destination=${destParam}&travelmode=driving`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${destParam}&travelmode=driving`;
}

/**
 * Builds a zero-API-key Google Maps iframe embed URL.
 * Shows the Hilal Tesisat pin by default, or an active origin->destination route view
 * once the visitor connects their device's live GPS location.
 */
export function buildMiniMapEmbedUrl(
  origin: GeoPoint | null,
  destinationAddress: string,
  zoom = 15,
): string {
  const encodedDest = encodeURIComponent(destinationAddress);
  if (origin && Number.isFinite(origin.lat) && Number.isFinite(origin.lng)) {
    const saddr = `${origin.lat.toFixed(6)},${origin.lng.toFixed(6)}`;
    return `https://maps.google.com/maps?saddr=${saddr}&daddr=${encodedDest}&output=embed&hl=tr`;
  }
  const safeZoom = Math.min(18, Math.max(10, Math.round(zoom)));
  return `https://maps.google.com/maps?q=${encodedDest}&t=m&z=${safeZoom}&ie=UTF8&iwloc=&output=embed&hl=tr`;
}

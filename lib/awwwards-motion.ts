export interface MagneticPullResult {
  x: number;
  y: number;
}

export interface CardTiltResult {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

export interface DeckCardTransform {
  y: number;
  scale: number;
  rotateZ: number;
  opacity: number;
  zIndex: number;
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(min, Math.min(max, value));
}

/**
 * Computes bounded magnetic spring pull offsets from pointer coordinates
 * relative to the element's center.
 */
export function computeMagneticPull(
  deltaX: number,
  deltaY: number,
  width: number,
  height: number,
  maxOffsetPx = 10,
): MagneticPullResult {
  if (width <= 0 || height <= 0 || !Number.isFinite(maxOffsetPx)) {
    return { x: 0, y: 0 };
  }
  const normX = clamp(deltaX / (width / 2), -1, 1);
  const normY = clamp(deltaY / (height / 2), -1, 1);
  return {
    x: Number((normX * maxOffsetPx).toFixed(2)),
    y: Number((normY * maxOffsetPx).toFixed(2)),
  };
}

/**
 * Computes bounded 3D card perspective tilt and specular highlight position
 * from normalized pointer coordinates in [-1, 1].
 */
export function computeCardTilt(
  normX: number,
  normY: number,
  maxDeg = 7,
): CardTiltResult {
  const cx = clamp(normX, -1, 1);
  const cy = clamp(normY, -1, 1);
  const deg = Math.max(0, Number.isFinite(maxDeg) ? maxDeg : 0);

  return {
    rotateX: Number((-cy * deg).toFixed(2)),
    rotateY: Number((cx * deg).toFixed(2)),
    glareX: Number(((cx + 1) * 50).toFixed(1)),
    glareY: Number(((cy + 1) * 50).toFixed(1)),
  };
}

/**
 * Computes subtle editorial marquee skew & speed multiplier from live scroll velocity.
 */
export function computeScrollVelocitySkew(
  velocityPxPerSec: number,
  maxSkewDeg = 5,
): number {
  if (!Number.isFinite(velocityPxPerSec) || !Number.isFinite(maxSkewDeg)) return 0;
  const scaled = (velocityPxPerSec / 1800) * maxSkewDeg;
  return Number(clamp(scaled, -maxSkewDeg, maxSkewDeg).toFixed(2));
}

/**
 * Smooth ease-out-quart odometer value formatter for architectural metrics.
 */
export function formatOdometerValue(
  progress01: number,
  target: number,
  suffix = '',
): string {
  const t = clamp(progress01, 0, 1);
  const eased = 1 - Math.pow(1 - t, 4);
  const current = Math.round(eased * Math.max(0, target));
  return `${current}${suffix}`;
}

/**
 * Computes layered 3D stack transforms for the interactive Awwwards testimonial deck.
 * stackDepth 0 = front active card; 1 = second peeking card; 2 = third background card.
 */
export function computeDeckCardTransform(stackDepth: number): DeckCardTransform {
  if (!Number.isFinite(stackDepth) || stackDepth <= 0) {
    return { y: 0, scale: 1, rotateZ: 0, opacity: 1, zIndex: 30 };
  }
  if (stackDepth === 1) {
    return { y: 14, scale: 0.94, rotateZ: -2.4, opacity: 0.86, zIndex: 20 };
  }
  if (stackDepth === 2) {
    return { y: 27, scale: 0.88, rotateZ: 2.8, opacity: 0.64, zIndex: 10 };
  }
  return { y: 36, scale: 0.82, rotateZ: 0, opacity: 0, zIndex: 0 };
}

/**
 * Resolves a horizontal swipe/drag gesture into next/prev deck navigation.
 */
export function resolveDeckSwipeAction(
  offsetX: number,
  velocityX: number,
  thresholdPx = 65,
  velocityThreshold = 420,
): 'next' | 'prev' | 'stay' {
  if (!Number.isFinite(offsetX) || !Number.isFinite(velocityX)) return 'stay';
  if (offsetX <= -thresholdPx || velocityX <= -velocityThreshold) return 'next';
  if (offsetX >= thresholdPx || velocityX >= velocityThreshold) return 'prev';
  return 'stay';
}

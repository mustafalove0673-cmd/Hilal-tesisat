import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildLiveDirectionsUrl,
  buildMiniMapEmbedUrl,
  calculateHaversineKm,
  estimateDrivingMinutes,
  formatTurkishDistance,
} from './location-routing';

const HILAL_COORDS = { lat: 40.0717, lng: 32.9285 };
const KIZILAY_COORDS = { lat: 39.9208, lng: 32.8541 };
const HILAL_ADDRESS = 'Saray Cumhuriyet, Edebali Sk. 7 B, 06146 Pursaklar/Ankara';

test('calculateHaversineKm returns 0 for identical coordinates', () => {
  assert.equal(calculateHaversineKm(HILAL_COORDS, HILAL_COORDS), 0);
});

test('calculateHaversineKm computes realistic distance from Kizilay Ankara to Pursaklar', () => {
  const km = calculateHaversineKm(KIZILAY_COORDS, HILAL_COORDS);
  assert.ok(km >= 17 && km <= 19, `Expected 17–19 km, got ${km}`);
});

test('calculateHaversineKm guards against non-finite inputs', () => {
  assert.equal(
    calculateHaversineKm({ lat: Number.NaN, lng: 32.8 }, HILAL_COORDS),
    0,
  );
});

test('estimateDrivingMinutes enforces minimum 3 min and scales realistically', () => {
  assert.equal(estimateDrivingMinutes(0), 3);
  assert.equal(estimateDrivingMinutes(0.4), 3);
  const eta = estimateDrivingMinutes(17.9);
  assert.ok(eta >= 25 && eta <= 45, `Expected 25–45 min, got ${eta}`);
});

test('formatTurkishDistance formats meters under 1 km and Turkish comma decimals above 1 km', () => {
  assert.equal(formatTurkishDistance(0.65), '650 m');
  assert.equal(formatTurkishDistance(17.9), '17,9 km');
  assert.equal(formatTurkishDistance(0), '100 m');
});

test('buildLiveDirectionsUrl generates origin+destination route when GPS is connected', () => {
  const url = buildLiveDirectionsUrl(KIZILAY_COORDS, HILAL_COORDS, HILAL_ADDRESS);
  assert.ok(url.startsWith('https://www.google.com/maps/dir/?api=1&'));
  assert.ok(url.includes('origin=39.920800,32.854100'));
  assert.ok(url.includes('travelmode=driving'));
  assert.ok(url.includes(encodeURIComponent(HILAL_ADDRESS)));
});

test('buildLiveDirectionsUrl omits origin when GPS is not connected', () => {
  const url = buildLiveDirectionsUrl(null, HILAL_COORDS, HILAL_ADDRESS);
  assert.ok(!url.includes('origin='));
  assert.ok(url.includes('destination='));
});

test('buildMiniMapEmbedUrl switches between destination pin and saddr->daddr live route', () => {
  const idleEmbed = buildMiniMapEmbedUrl(null, HILAL_ADDRESS, 15);
  assert.ok(idleEmbed.includes('maps.google.com/maps?q='));
  assert.ok(idleEmbed.includes('output=embed&hl=tr'));

  const liveEmbed = buildMiniMapEmbedUrl(KIZILAY_COORDS, HILAL_ADDRESS, 15);
  assert.ok(liveEmbed.includes('saddr=39.920800,32.854100'));
  assert.ok(liveEmbed.includes('daddr='));
  assert.ok(liveEmbed.includes('output=embed&hl=tr'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeCardTilt,
  computeDeckCardTransform,
  computeMagneticPull,
  computeScrollVelocitySkew,
  computeStaggeredRevealDelay,
  formatOdometerValue,
  resolveDeckSwipeAction,
} from './awwwards-motion';

test('computeMagneticPull bounds displacement smoothly within maxOffsetPx', () => {
  const center = computeMagneticPull(0, 0, 200, 60, 10);
  assert.deepEqual(center, { x: 0, y: 0 });

  const edge = computeMagneticPull(100, -30, 200, 60, 10);
  assert.deepEqual(edge, { x: 10, y: -10 });

  const clamped = computeMagneticPull(999, -999, 200, 60, 8);
  assert.deepEqual(clamped, { x: 8, y: -8 });
});

test('computeCardTilt maps normalized coordinates to inverse rotateX, rotateY, and glare', () => {
  const flat = computeCardTilt(0, 0, 7);
  assert.deepEqual(flat, { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const topRight = computeCardTilt(1, -1, 6);
  assert.deepEqual(topRight, { rotateX: 6, rotateY: 6, glareX: 100, glareY: 0 });

  const bounded = computeCardTilt(5, 5, 6);
  assert.equal(bounded.rotateX, -6);
  assert.equal(bounded.rotateY, 6);
});

test('computeScrollVelocitySkew stays bounded and symmetric with scroll velocity', () => {
  assert.equal(computeScrollVelocitySkew(0, 5), 0);
  assert.equal(computeScrollVelocitySkew(1800, 5), 5);
  assert.equal(computeScrollVelocitySkew(-1800, 5), -5);
  assert.equal(computeScrollVelocitySkew(99999, 5), 5);
});

test('formatOdometerValue eases smoothly from 0 to target with suffix', () => {
  assert.equal(formatOdometerValue(0, 1000, '+'), '0+');
  assert.equal(formatOdometerValue(1, 1000, '+'), '1000+');
  const mid = Number(formatOdometerValue(0.5, 1000, '').replace(/\D/g, ''));
  assert.ok(mid > 800 && mid < 1000, `expected ease-out-quart midpoint > 800, got ${mid}`);
});

test('computeDeckCardTransform orders zIndex, scale, y, and opacity cleanly across 3D stack depth', () => {
  const front = computeDeckCardTransform(0);
  const second = computeDeckCardTransform(1);
  const third = computeDeckCardTransform(2);
  const hidden = computeDeckCardTransform(3);

  assert.equal(front.scale, 1);
  assert.equal(front.rotateZ, 0);
  assert.ok(front.zIndex > second.zIndex && second.zIndex > third.zIndex);
  assert.ok(second.scale < front.scale && third.scale < second.scale);
  assert.equal(hidden.opacity, 0);
});

test('resolveDeckSwipeAction detects swipe distance and flick velocity accurately', () => {
  assert.equal(resolveDeckSwipeAction(-90, 0), 'next');
  assert.equal(resolveDeckSwipeAction(90, 0), 'prev');
  assert.equal(resolveDeckSwipeAction(-10, -500), 'next');
  assert.equal(resolveDeckSwipeAction(10, 500), 'prev');
  assert.equal(resolveDeckSwipeAction(20, 40), 'stay');
});

test('computeStaggeredRevealDelay produces bounded diagonal cascade delays', () => {
  assert.equal(computeStaggeredRevealDelay(0, 4, 0.065, 0.34), 0);
  assert.equal(computeStaggeredRevealDelay(-2, 4, 0.065, 0.34), 0);

  const col1 = computeStaggeredRevealDelay(1, 4, 0.065, 0.34);
  const col2 = computeStaggeredRevealDelay(2, 4, 0.065, 0.34);
  const row2Col0 = computeStaggeredRevealDelay(4, 4, 0.065, 0.34);
  assert.ok(col1 > 0 && col2 > col1);
  assert.ok(row2Col0 > 0 && row2Col0 < col1);

  assert.equal(computeStaggeredRevealDelay(23, 4, 0.08, 0.32), 0.32);
});


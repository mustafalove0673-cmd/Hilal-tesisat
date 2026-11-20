import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getLocationBannerCopy,
  resolveGeolocationErrorState,
  shouldShowLocationBanner,
} from './location-permission';

test('resolveGeolocationErrorState maps standard W3C error codes accurately', () => {
  assert.equal(resolveGeolocationErrorState(1), 'denied');
  assert.equal(resolveGeolocationErrorState(2), 'unavailable');
  assert.equal(resolveGeolocationErrorState(3), 'timeout');
  assert.equal(resolveGeolocationErrorState(99), 'denied');
});

test('shouldShowLocationBanner hides during checking or silent granted load', () => {
  assert.equal(
    shouldShowLocationBanner({
      state: 'checking',
      dismissed: false,
      justGranted: false,
      entryPrompted: false,
    }),
    false,
  );
  assert.equal(
    shouldShowLocationBanner({
      state: 'granted',
      dismissed: false,
      justGranted: false,
      entryPrompted: true,
    }),
    false,
  );
});

test('shouldShowLocationBanner shows when permission is denied, timeout, or prompt after entry', () => {
  assert.equal(
    shouldShowLocationBanner({
      state: 'denied',
      dismissed: false,
      justGranted: false,
      entryPrompted: false,
    }),
    true,
  );
  assert.equal(
    shouldShowLocationBanner({
      state: 'prompt',
      dismissed: false,
      justGranted: false,
      entryPrompted: true,
    }),
    true,
  );
  assert.equal(
    shouldShowLocationBanner({
      state: 'timeout',
      dismissed: false,
      justGranted: false,
      entryPrompted: true,
    }),
    true,
  );
});

test('shouldShowLocationBanner stays visible during justGranted confirmation even if previously dismissed', () => {
  assert.equal(
    shouldShowLocationBanner({
      state: 'granted',
      dismissed: true,
      justGranted: true,
      entryPrompted: true,
    }),
    true,
  );
});

test('shouldShowLocationBanner respects explicit user dismissal when not justGranted', () => {
  assert.equal(
    shouldShowLocationBanner({
      state: 'denied',
      dismissed: true,
      justGranted: false,
      entryPrompted: true,
    }),
    false,
  );
});

test('getLocationBannerCopy returns distinct actionable Turkish messages for denied and justGranted', () => {
  const deniedCopy = getLocationBannerCopy('denied', false);
  assert.ok(deniedCopy.title.includes('Konum'));
  assert.ok(deniedCopy.description.includes('otomatik kapanacaktır'));

  const grantedCopy = getLocationBannerCopy('granted', true);
  assert.ok(grantedCopy.badge.includes('Onaylandı'));
  assert.ok(grantedCopy.title.includes('Bağlandı'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeText,
  validateEmail,
  validateTurkishPhone,
  validateQuotePayload,
  validateNewsletterPayload,
  SlidingWindowRateLimiter,
} from './security';
import { buildLocalBusinessJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from './seo';

test('sanitizeText strips HTML tags and control characters', () => {
  assert.equal(sanitizeText('  <script>alert(1)</script>Merhaba\nDünya  '), 'alert(1)Merhaba Dünya');
  assert.equal(sanitizeText('<b>Kombi Bakımı</b>'), 'Kombi Bakımı');
});

test('validateTurkishPhone accepts valid TR formats and rejects invalid ones', () => {
  assert.equal(validateTurkishPhone('+90 555 078 44 18'), true);
  assert.equal(validateTurkishPhone('0555 078 44 18'), true);
  assert.equal(validateTurkishPhone('5550784418'), true);
  assert.equal(validateTurkishPhone('0312 555 12 34'), true);
  assert.equal(validateTurkishPhone('12345'), false);
  assert.equal(validateTurkishPhone('0999 000 00 00'), false);
});

test('validateEmail verifies email syntax safely', () => {
  assert.equal(validateEmail('hilal.servicesss@gmail.com'), true);
  assert.equal(validateEmail('musteri@ankara.com.tr'), true);
  assert.equal(validateEmail('gecersiz-eposta'), false);
  assert.equal(validateEmail('a@b'), false);
});

test('validateQuotePayload enforces KVKK consent, valid phone, and honeypot protection', () => {
  const now = 10_000;

  // Missing KVKK consent
  const missingKvkk = validateQuotePayload(
    {
      fullName: 'Mehmet Yılmaz',
      phone: '05550784418',
      district: 'Pursaklar',
      serviceSlug: 'kombi-bakimi',
      message: 'Kombi bakımı için randevu talep ediyorum.',
      kvkkAccepted: false,
      website: '',
      formStartedAt: 1000,
    },
    now,
  );
  assert.equal(missingKvkk.ok, false);
  assert.ok(missingKvkk.errors.kvkkAccepted);

  // Bot honeypot filled
  const botAttempt = validateQuotePayload(
    {
      fullName: 'Spam Bot',
      phone: '05550784418',
      district: 'Pursaklar',
      serviceSlug: 'kombi-bakimi',
      message: 'Automated message test content',
      kvkkAccepted: true,
      website: 'https://spam.example.com',
      formStartedAt: 1000,
    },
    now,
  );
  assert.equal(botAttempt.ok, false);

  // Instant submission (<1200ms)
  const tooFast = validateQuotePayload(
    {
      fullName: 'Mehmet Yılmaz',
      phone: '05550784418',
      district: 'Pursaklar',
      serviceSlug: 'kombi-bakimi',
      message: 'Kombi bakımı için randevu talep ediyorum.',
      kvkkAccepted: true,
      website: '',
      formStartedAt: 9500,
    },
    now,
  );
  assert.equal(tooFast.ok, false);

  // Valid submission
  const valid = validateQuotePayload(
    {
      fullName: 'Mehmet <b>Yılmaz</b>',
      phone: '+90 555 078 44 18',
      email: 'mehmet@example.com',
      district: 'Pursaklar',
      serviceSlug: 'kombi-bakimi',
      message: 'Kış öncesi kombi bakımı ve petek temizliği yaptırmak istiyorum.',
      kvkkAccepted: true,
      website: '',
      formStartedAt: 2000,
    },
    now,
  );
  assert.equal(valid.ok, true);
  assert.equal(valid.data?.fullName, 'Mehmet Yılmaz');
});

test('validateNewsletterPayload checks valid email and honeypot', () => {
  assert.equal(validateNewsletterPayload({ email: 'test@hilaltesisat.com.tr', website: '' }).ok, true);
  assert.equal(validateNewsletterPayload({ email: 'bad-email', website: '' }).ok, false);
});

test('SlidingWindowRateLimiter blocks requests exceeding limit within window', () => {
  const limiter = new SlidingWindowRateLimiter(3, 60_000);
  assert.equal(limiter.check('1.2.3.4', 1000).allowed, true);
  assert.equal(limiter.check('1.2.3.4', 2000).allowed, true);
  assert.equal(limiter.check('1.2.3.4', 3000).allowed, true);

  const blocked = limiter.check('1.2.3.4', 4000);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSec >= 50);

  // After window expires, requests are allowed again
  assert.equal(limiter.check('1.2.3.4', 65_000).allowed, true);
});

test('SEO JSON-LD generators emit valid structured schema', () => {
  const business = buildLocalBusinessJsonLd('https://hilaltesisat.com.tr');
  assert.equal(business['@context'], 'https://schema.org');
  assert.equal(business.address.addressLocality, 'Pursaklar');
  assert.ok(business.hasOfferCatalog.itemListElement.length >= 8);

  const faqSchema = buildFaqJsonLd();
  assert.equal(faqSchema['@type'], 'FAQPage');
  assert.ok(faqSchema.mainEntity.length >= 5);

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetler', path: '/hizmetler' },
  ]);
  assert.equal(breadcrumb.itemListElement[1].position, 2);
});

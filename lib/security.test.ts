import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeText,
  validateEmail,
  validateTurkishPhone,
  validateQuotePayload,
  validateNewsletterPayload,
  SlidingWindowRateLimiter,
  evaluateRequestDeception,
  buildMtdRedirectTarget,
} from './security';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLocalBusinessJsonLd,
  buildVideoGalleryJsonLd,
  buildWebSiteJsonLd,
} from './seo';
import { buildWhatsappHref, FIELD_VIDEOS, SITE_INFO } from './site-data';

test('sanitizeText strips HTML tags and control characters', () => {
  assert.equal(sanitizeText('  <script>alert(1)</script>Merhaba\nDünya  '), 'alert(1)Merhaba Dünya');
  assert.equal(sanitizeText('<b>Kombi Bakımı</b>'), 'Kombi Bakımı');
});

test('validateTurkishPhone accepts valid TR formats including 0535 078 44 18 and rejects invalid ones', () => {
  assert.equal(validateTurkishPhone('+90 535 078 44 18'), true);
  assert.equal(validateTurkishPhone('0535 078 44 18'), true);
  assert.equal(validateTurkishPhone('5350784418'), true);
  assert.equal(validateTurkishPhone('0312 328 12 34'), true);
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
      phone: '05350784418',
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
      phone: '05350784418',
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
      phone: '05350784418',
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
      phone: '+90 535 078 44 18',
      email: 'mehmet@example.com',
      district: 'Saray Cumhuriyet',
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
  assert.equal(
    validateNewsletterPayload({ email: 'test@hilaltesisat.com.tr', website: '' }).ok,
    true,
  );
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

test('SEO JSON-LD generators emit valid structured schema with updated phone, address, map, and videos', () => {
  const business = buildLocalBusinessJsonLd('https://hilaltesisat.com.tr');
  assert.equal(business['@context'], 'https://schema.org');
  assert.equal(business.telephone, '+905350784418');
  assert.equal(business.address.streetAddress, 'Saray Cumhuriyet, Edebali Sk. 7 B');
  assert.equal(business.address.postalCode, '06146');
  assert.equal(business.address.addressLocality, 'Pursaklar');
  assert.equal(business.hasMap, SITE_INFO.googleMapsUrl);
  assert.ok(business.sameAs.includes(SITE_INFO.instagramCanonicalUrl));
  assert.ok(SITE_INFO.instagramUrl.includes('hilaltesisatdogalgaz'));
  assert.ok(business.hasOfferCatalog.itemListElement.length >= 8);

  const website = buildWebSiteJsonLd('https://hilaltesisat.com.tr');
  assert.equal(website['@type'], 'WebSite');
  assert.equal(website.name, 'Hilal Tesisat');

  const videos = buildVideoGalleryJsonLd('https://hilaltesisat.com.tr');
  assert.equal(videos['@type'], 'ItemList');
  assert.equal(videos.itemListElement.length, FIELD_VIDEOS.length);

  const faqSchema = buildFaqJsonLd();
  assert.equal(faqSchema['@type'], 'FAQPage');
  assert.ok(faqSchema.mainEntity.length >= 5);

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetler', path: '/hizmetler' },
  ]);
  assert.equal(breadcrumb.itemListElement[1].position, 2);

  // WhatsApp helper uses updated 0535 078 44 18 number
  const waHref = buildWhatsappHref();
  assert.ok(waHref.startsWith('https://wa.me/905350784418?text='));
});

test('MTD active deception traps cloners, probes, and SQLi/XSS queries while allowing browsers and SEO crawlers', () => {
  // Normal user browser allowed
  assert.deepEqual(
    evaluateRequestDeception(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/134.0.0.0 Safari/537.36',
      '/',
    ),
    { action: 'allow' },
  );

  // Googlebot allowed on public routes for #1 SEO
  assert.deepEqual(
    evaluateRequestDeception(
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      '/',
    ),
    { action: 'allow' },
  );

  // Site cloner User-Agents misdirected to shifting MTD decoy
  assert.deepEqual(evaluateRequestDeception('HTTrack 3.0x', '/'), {
    action: 'mtd_redirect',
    reason: 'cloner_ua',
  });
  assert.deepEqual(evaluateRequestDeception('python-requests/2.31.0', '/'), {
    action: 'mtd_redirect',
    reason: 'cloner_ua',
  });

  // Malicious recon probe paths trapped even if spoofing browser/crawler UA
  assert.deepEqual(
    evaluateRequestDeception(
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      '/.env',
    ),
    { action: 'mtd_redirect', reason: 'probe_path' },
  );
  assert.deepEqual(evaluateRequestDeception('Mozilla/5.0', '/wp-admin/install.php'), {
    action: 'mtd_redirect',
    reason: 'probe_path',
  });

  // SQLi and XSS query injection probes trapped
  assert.deepEqual(
    evaluateRequestDeception('Mozilla/5.0', '/', '?q=1%20UNION%20SELECT%20password'),
    { action: 'mtd_redirect', reason: 'injection_probe' },
  );
  assert.deepEqual(
    evaluateRequestDeception('Mozilla/5.0', '/', '?search=<script>alert(1)</script>'),
    { action: 'mtd_redirect', reason: 'injection_probe' },
  );

  // Rotating MTD trap URL shifts across time buckets
  const targetA = buildMtdRedirectTarget('/.env', 1000);
  const targetB = buildMtdRedirectTarget('/.env', 15000);
  assert.ok(targetA.startsWith('/api/trap?mtd='));
  assert.notEqual(targetA, targetB);
});

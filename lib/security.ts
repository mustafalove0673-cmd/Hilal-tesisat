export interface QuotePayload {
  fullName: string;
  phone: string;
  email?: string;
  district: string;
  serviceSlug: string;
  message: string;
  kvkkAccepted: boolean;
  website?: string; // Honeypot field (must remain empty)
  formStartedAt?: number; // Timestamp to detect instant bot submissions
}

export interface ValidationResult<T> {
  ok: boolean;
  data?: T;
  errors: Record<string, string>;
}

const CONTROL_CHARS_RE = /[\u0000-\u001F\u007F]/g;
const HTML_TAG_RE = /<[^>]*>?/gm;

export function sanitizeText(input: unknown, maxLength = 500): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(HTML_TAG_RE, '')
    .replace(CONTROL_CHARS_RE, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function validateEmail(email: string): boolean {
  if (!email || email.length > 160) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validateTurkishPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  // Accepts 10 digits (5xxxxxxxxx or 312xxxxxxx), 11 digits (05xxxxxxxxx / 0312xxxxxxx), or 12 digits (905xxxxxxxxx)
  if (digits.length === 10) {
    return /^[2-5]\d{9}$/.test(digits);
  }
  if (digits.length === 11) {
    return /^0[2-5]\d{9}$/.test(digits);
  }
  if (digits.length === 12) {
    return /^90[2-5]\d{9}$/.test(digits);
  }
  return false;
}

export function validateQuotePayload(
  raw: Record<string, unknown>,
  nowMs = Date.now(),
): ValidationResult<QuotePayload> {
  const errors: Record<string, string> = {};

  const honeypot = sanitizeText(raw.website, 100);
  if (honeypot.length > 0) {
    return {
      ok: false,
      errors: { _form: 'Güvenlik doğrulaması başarısız oldu.' },
    };
  }

  if (typeof raw.formStartedAt === 'number' && raw.formStartedAt > 0) {
    const elapsed = nowMs - raw.formStartedAt;
    if (elapsed >= 0 && elapsed < 1200) {
      return {
        ok: false,
        errors: { _form: 'Form çok hızlı gönderildi. Lütfen birkaç saniye bekleyip tekrar deneyin.' },
      };
    }
  }

  const fullName = sanitizeText(raw.fullName, 100);
  if (fullName.length < 2) {
    errors.fullName = 'Lütfen adınızı ve soyadınızı girin (en az 2 karakter).';
  }

  const phone = sanitizeText(raw.phone, 30);
  if (!validateTurkishPhone(phone)) {
    errors.phone = 'Lütfen geçerli bir Türkiye telefon numarası girin (ör. 0555 078 44 18).';
  }

  const email = sanitizeText(raw.email, 160);
  if (email.length > 0 && !validateEmail(email)) {
    errors.email = 'Lütfen geçerli bir e-posta adresi girin.';
  }

  const district = sanitizeText(raw.district, 80);
  if (district.length < 2) {
    errors.district = 'Lütfen hizmet talep ettiğiniz ilçeyi seçin.';
  }

  const serviceSlug = sanitizeText(raw.serviceSlug, 80);
  if (serviceSlug.length < 2) {
    errors.serviceSlug = 'Lütfen bir hizmet kategorisi seçin.';
  }

  const message = sanitizeText(raw.message, 1200);
  if (message.length < 10) {
    errors.message = 'Lütfen talebinizi en az 10 karakter ile kısaca açıklayın.';
  }

  const kvkkAccepted = raw.kvkkAccepted === true;
  if (!kvkkAccepted) {
    errors.kvkkAccepted = 'Devam etmek için 6698 sayılı KVKK Aydınlatma Metni’ni onaylamanız gerekir.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      fullName,
      phone,
      email: email || undefined,
      district,
      serviceSlug,
      message,
      kvkkAccepted: true,
    },
    errors: {},
  };
}

export function validateNewsletterPayload(raw: Record<string, unknown>): ValidationResult<{ email: string }> {
  const honeypot = sanitizeText(raw.website, 100);
  if (honeypot.length > 0) {
    return { ok: false, errors: { email: 'Güvenlik doğrulaması başarısız.' } };
  }

  const email = sanitizeText(raw.email, 160).toLowerCase();
  if (!validateEmail(email)) {
    return {
      ok: false,
      errors: { email: 'Lütfen geçerli bir e-posta adresi girin.' },
    };
  }

  return { ok: true, data: { email }, errors: {} };
}

export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
}

export class SlidingWindowRateLimiter {
  private readonly hits = new Map<string, number[]>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests = 5, windowMs = 60_000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  check(key: string, nowMs = Date.now()): RateLimitDecision {
    const cutoff = nowMs - this.windowMs;
    const prev = (this.hits.get(key) ?? []).filter((ts) => ts > cutoff);

    if (prev.length >= this.maxRequests) {
      const oldest = prev[0] ?? nowMs;
      const retryAfterSec = Math.max(1, Math.ceil((oldest + this.windowMs - nowMs) / 1000));
      this.hits.set(key, prev);
      return {
        allowed: false,
        remaining: 0,
        retryAfterSec,
      };
    }

    const updated = [...prev, nowMs];
    this.hits.set(key, updated);
    return {
      allowed: true,
      remaining: Math.max(0, this.maxRequests - updated.length),
      retryAfterSec: 0,
    };
  }
}

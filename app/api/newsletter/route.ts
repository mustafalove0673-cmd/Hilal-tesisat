import { NextRequest, NextResponse } from 'next/server';
import { SlidingWindowRateLimiter, validateNewsletterPayload } from '@/lib/security';

const newsletterLimiter = new SlidingWindowRateLimiter(6, 60_000);

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return request.headers.get('x-real-ip') || 'local';
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = newsletterLimiter.check(ip);

    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, message: 'Çok fazla deneme yapıldı. Lütfen bekleyin.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSec) } },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const validation = validateNewsletterPayload(body);

    if (!validation.ok || !validation.data) {
      return NextResponse.json(
        {
          ok: false,
          message: validation.errors.email || 'Geçersiz e-posta adresi.',
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Bülten ve periyodik bakım hatırlatma listesine kaydınız alındı.',
        email: validation.data.email,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Kayıt sırasında bir hata oluştu.' },
      { status: 500 },
    );
  }
}

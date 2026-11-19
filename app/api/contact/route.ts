import { NextRequest, NextResponse } from 'next/server';
import { SlidingWindowRateLimiter, validateQuotePayload } from '@/lib/security';

const quoteLimiter = new SlidingWindowRateLimiter(5, 60_000);

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
    const rate = quoteLimiter.check(ip);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Çok fazla talep gönderdiniz. Lütfen kısa bir süre sonra tekrar deneyin.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rate.retryAfterSec),
          },
        },
      );
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { ok: false, message: 'Geçersiz içerik türü.' },
        { status: 415 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const validation = validateQuotePayload(body);

    if (!validation.ok || !validation.data) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Lütfen form alanlarını kontrol edin.',
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    const referenceCode = `HLT-${new Date().getFullYear()}-${String(
      Math.floor(1000 + Math.random() * 9000),
    )}`;

    return NextResponse.json(
      {
        ok: true,
        referenceCode,
        message:
          'Talebiniz güvenli şekilde alındı. Uzman ekibimiz en kısa sürede telefonla dönüş yapacaktır.',
        receivedAt: new Date().toISOString(),
        summary: {
          fullName: validation.data.fullName,
          district: validation.data.district,
          serviceSlug: validation.data.serviceSlug,
        },
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Remaining': String(rate.remaining),
        },
      },
    );
  } catch {
    return NextResponse.json(
      { ok: false, message: 'İstek işlenirken beklenmeyen bir hata oluştu.' },
      { status: 500 },
    );
  }
}

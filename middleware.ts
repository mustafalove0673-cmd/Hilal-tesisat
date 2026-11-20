import { NextRequest, NextResponse } from 'next/server';
import { buildMtdRedirectTarget, evaluateRequestDeception } from '@/lib/security';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const userAgent = request.headers.get('user-agent');
  const decision = evaluateRequestDeception(userAgent, pathname, search);

  if (decision.action === 'mtd_redirect') {
    const targetPath = buildMtdRedirectTarget(`${pathname}${search}:${userAgent ?? 'anon'}`);
    const redirectResponse = NextResponse.redirect(new URL(targetPath, request.url), 307);
    redirectResponse.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    redirectResponse.headers.set('X-Defense-Mode', 'MTD-Active');
    redirectResponse.headers.set('Cache-Control', 'no-store');
    return redirectResponse;
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  );
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|assets/).*)',
  ],
};

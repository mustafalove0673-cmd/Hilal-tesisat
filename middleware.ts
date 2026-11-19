import { NextRequest, NextResponse } from 'next/server';
import { buildMtdRedirectTarget, evaluateRequestDeception } from '@/lib/security';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent');
  const decision = evaluateRequestDeception(userAgent, pathname);

  if (decision.action === 'mtd_redirect') {
    const targetPath = buildMtdRedirectTarget(`${pathname}:${userAgent ?? 'anon'}`);
    const redirectResponse = NextResponse.redirect(new URL(targetPath, request.url), 307);
    redirectResponse.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    redirectResponse.headers.set('X-Defense-Mode', 'MTD-Active');
    redirectResponse.headers.set('Cache-Control', 'no-store');
    return redirectResponse;
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|assets/).*)',
  ],
};

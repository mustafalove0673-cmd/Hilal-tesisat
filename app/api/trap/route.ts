import { NextRequest, NextResponse } from 'next/server';
import { buildMtdRedirectTarget } from '@/lib/security';

export const dynamic = 'force-dynamic';

function buildSyntheticDecoyHtml(token: string, nextDecoy: string): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, nofollow, noarchive" />
  <title>Archive Index Node ${token}</title>
</head>
<body>
  <main data-shard="${token}">
    <h1>Static Mirror Shard ${token}</h1>
    <p>Session node rotated via Moving Target Defense.</p>
    <ul>
      <li><a href="${nextDecoy}&step=1" rel="nofollow">Node Fragment A</a></li>
      <li><a href="${nextDecoy}&step=2" rel="nofollow">Node Fragment B</a></li>
    </ul>
  </main>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  // Controlled tarpit jitter to slow automated site cloners without blocking thread pool long
  await new Promise((resolve) => setTimeout(resolve, 420));

  const seed = request.nextUrl.searchParams.get('mtd') || 'phantom';
  const nextDecoy = buildMtdRedirectTarget(`${seed}:next`, Date.now() + 9_000);
  const token = nextDecoy.replace(/[^a-zA-Z0-9]/g, '').slice(-8);

  return new NextResponse(buildSyntheticDecoyHtml(token, nextDecoy), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'X-Defense-Mode': 'MTD-Tarpit',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

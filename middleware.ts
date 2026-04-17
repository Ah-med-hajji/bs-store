import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'bs-admin-session';

async function verifyTokenEdge(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // Split JWT and decode payload to check expiry manually
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    );
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return false;
    if (payload.role !== 'admin') return false;

    // Verify signature using Web Crypto API (Edge compatible)
    const key = await crypto.subtle.importKey(
      'raw',
      secret,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signature = Uint8Array.from(
      atob(parts[2].replace(/-/g, '+').replace(/_/g, '/')),
      (c) => c.charCodeAt(0)
    );

    const data = new TextEncoder().encode(parts[0] + '.' + parts[1]);
    return crypto.subtle.verify('HMAC', key, signature, data);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that never require auth
  if (pathname === '/admin/login' || pathname === '/api/auth/login') {
    return NextResponse.next();
  }

  // Only protect /admin pages and /api/ routes
  const isAdminPage = pathname.startsWith('/admin');
  const isApiRoute = pathname.startsWith('/api/');

  if (!isAdminPage && !isApiRoute) {
    return NextResponse.next();
  }

  // Verify session
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token || !(await verifyTokenEdge(token))) {
    if (isAdminPage) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (isApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};

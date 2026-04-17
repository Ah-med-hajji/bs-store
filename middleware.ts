import { verifyToken, getSessionToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

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
  const token = getSessionToken(request);

  if (!token || !(await verifyToken(token))) {
    // For admin pages, redirect to login
    if (isAdminPage) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // For API routes, return 401
    if (isApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'bs-admin-session';
const COOKIE_MAX_AGE = 86400; // 24 hours

function getSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function signToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export function getSessionToken(request: NextRequest): string | undefined {
  return request.cookies.get(COOKIE_NAME)?.value;
}

export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = getSessionToken(request);
  if (!token) return false;
  return verifyToken(token);
}

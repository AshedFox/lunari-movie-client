import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE_KEY } from '@lib/auth/constants';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE_KEY);

  return NextResponse.json(token?.value ?? null);
}

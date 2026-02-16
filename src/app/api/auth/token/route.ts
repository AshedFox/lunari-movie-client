import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE_KEY, REFRESH_COOKIE_KEY } from '@shared/lib/auth';
import { resetAuthCookies, setAuthCookies } from '@shared/lib/auth/cookie';
import { jwtDecode } from 'jwt-decode';
import { refresh } from '@features/refresh/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE_KEY)?.value;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp > currentTime + 10) {
        return NextResponse.json(token);
      }
    } catch {}
  }

  const refreshToken = request.cookies.get(REFRESH_COOKIE_KEY)?.value;

  if (!refreshToken) {
    if (token) {
      await resetAuthCookies();
    }
    return NextResponse.json(null);
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } =
      await refresh(refreshToken);

    await setAuthCookies(accessToken, newRefreshToken);
    return NextResponse.json(accessToken);
  } catch {
    await resetAuthCookies();
    return NextResponse.json(null);
  }
}

import { cookies } from 'next/headers';
import { ACCESS_COOKIE_KEY, REFRESH_COOKIE_KEY } from './constants';

import { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  cookiesStore?: ResponseCookies,
) {
  const cookieStore = cookiesStore || (await cookies());
  cookieStore.set(ACCESS_COOKIE_KEY, accessToken, {
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 5 * 60,
  });
  cookieStore.set(REFRESH_COOKIE_KEY, refreshToken, {
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60,
  });
}

export async function resetAuthCookies(cookiesStore?: ResponseCookies) {
  const cookieStore = cookiesStore || (await cookies());
  cookieStore.delete(ACCESS_COOKIE_KEY);
  cookieStore.delete(REFRESH_COOKIE_KEY);
}

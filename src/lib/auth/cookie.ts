import 'server-only';

import { cookies } from 'next/headers';
import {
  ACCESS_COOKIE_KEY,
  REFRESH_COOKIE_KEY,
  USER_COOKIE_KEY,
} from './constants';
import { UserProfileFragment } from '@lib/graphql/generated/graphql';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  user: UserProfileFragment,
  cookiesStore?: ResponseCookies,
) {
  const cookieStore = cookiesStore || (await cookies());
  cookieStore.set(ACCESS_COOKIE_KEY, accessToken, {
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 5 * 60,
  });
  cookieStore.set(REFRESH_COOKIE_KEY, refreshToken, {
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60,
  });
  cookieStore.set(USER_COOKIE_KEY, JSON.stringify(user), {
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 5 * 60,
  });
}

export async function setUserCookie(user: UserProfileFragment) {
  const cookieStore = await cookies();

  cookieStore.set(USER_COOKIE_KEY, JSON.stringify(user), {
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 5 * 60,
  });
}

export async function resetAuthCookies(cookiesStore?: ResponseCookies) {
  const cookieStore = cookiesStore || (await cookies());
  cookieStore.delete(ACCESS_COOKIE_KEY);
  cookieStore.delete(REFRESH_COOKIE_KEY);
  cookieStore.delete(USER_COOKIE_KEY);
}

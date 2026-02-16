'use server';

import { cookies } from 'next/headers';
import { REFRESH_COOKIE_KEY } from '@shared/lib/auth/constants';
import { resetAuthCookies } from '@shared/lib/auth/cookie';
import { logout } from './server';
import { updateTag } from 'next/cache';

export async function logoutAction() {
  const refreshToken = (await cookies()).get(REFRESH_COOKIE_KEY)?.value;

  await resetAuthCookies();
  updateTag('current-user');

  if (refreshToken) {
    await logout(refreshToken);
  }
}

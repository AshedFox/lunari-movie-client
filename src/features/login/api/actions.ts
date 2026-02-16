'use server';

import { redirect } from 'next/navigation';
import { setAuthCookies } from '@shared/lib/auth/cookie';
import { updateTag } from 'next/cache';
import { login } from './server';
import { LoginInput } from '@shared/api/graphql/graphql';

export async function loginAction(input: LoginInput, from?: string) {
  const data = await login(input);

  await setAuthCookies(data.accessToken, data.refreshToken);
  updateTag('current-user');
  redirect(from ?? '/');
}

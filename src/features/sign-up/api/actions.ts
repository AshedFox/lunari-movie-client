'use server';

import { redirect } from 'next/navigation';
import { setAuthCookies } from '@shared/lib/auth/cookie';
import { revalidateTag } from 'next/cache';
import { signUp } from './server';
import { SignUpInput } from '@shared/api/graphql/graphql';

export async function signUpAction(input: SignUpInput, from?: string) {
  const data = await signUp(input);

  await setAuthCookies(data.accessToken, data.refreshToken);
  revalidateTag('current-user');
  redirect(from ?? '/');
}

'use server';

import { revalidateTag } from 'next/cache';
import { resetPassword } from './server';
import { ResetPasswordInput } from '@shared/api/graphql/graphql';

export async function resetPasswordAction(input: ResetPasswordInput) {
  const data = await resetPassword(input);
  revalidateTag('current-user');
  return data;
}

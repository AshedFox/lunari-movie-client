'use server';

import { updateTag } from 'next/cache';
import { resetPassword } from './server';
import { ResetPasswordInput } from '@shared/api/graphql/graphql';

export async function resetPasswordAction(input: ResetPasswordInput) {
  const data = await resetPassword(input);
  updateTag('current-user');
  return data;
}

'use server';

import { revalidateTag } from 'next/cache';
import { confirmEmail, sendEmailConfirmation } from './server';

export async function confirmEmailAction(token: string) {
  await confirmEmail(token);

  revalidateTag('current-user');
}

export async function sendEmailConfirmationAction() {
  await sendEmailConfirmation();
}

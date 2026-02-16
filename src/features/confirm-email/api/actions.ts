'use server';

import { updateTag } from 'next/cache';
import { confirmEmail, sendEmailConfirmation } from './server';

export async function confirmEmailAction(token: string) {
  await confirmEmail(token);

  updateTag('current-user');
}

export async function sendEmailConfirmationAction() {
  await sendEmailConfirmation();
}

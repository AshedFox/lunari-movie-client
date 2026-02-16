'use server';

import { forgotPassword } from './server';

export async function forgotPasswordAction(email: string) {
  return forgotPassword(email);
}

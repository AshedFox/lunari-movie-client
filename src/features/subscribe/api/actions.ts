'use server';

import { redirect } from 'next/navigation';
import { subscribe } from './server';

export async function subscribeAction(priceId: string) {
  const url = await subscribe(priceId);
  redirect(url);
}

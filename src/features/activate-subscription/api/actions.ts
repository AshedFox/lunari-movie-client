'use server';

import { activateSubscription } from './server';
import { revalidateTag } from 'next/cache';

export async function activateSubscriptionAction(sessionId: string) {
  const data = await activateSubscription(sessionId);

  revalidateTag(`subscriptions-active`);

  return data;
}

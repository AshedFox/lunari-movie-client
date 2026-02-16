'use server';

import { activateSubscription } from './server';
import { updateTag } from 'next/cache';

export async function activateSubscriptionAction(sessionId: string) {
  const data = await activateSubscription(sessionId);

  updateTag(`subscriptions-active`);

  return data;
}

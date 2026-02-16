import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { HasActiveSubscriptionDocument } from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';

export const hasActiveSubscription = async () => {
  'use cache: private';
  cacheLife('hours');
  cacheTag('subscriptions-active');

  const { data } = await getClient().query({
    query: HasActiveSubscriptionDocument,
  });

  return data!.hasActiveSubscription;
};

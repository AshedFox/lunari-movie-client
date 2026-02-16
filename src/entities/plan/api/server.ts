import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetActivePlansDocument } from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';

export const getActivePlans = async () => {
  'use cache';
  cacheLife('weeks');
  cacheTag('plans-active');

  const { data } = await getClient().query({
    query: GetActivePlansDocument,
    context: { skipAuth: true },
  });

  return data!.getPlans;
};

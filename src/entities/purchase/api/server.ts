import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { HasPurchaseDocument } from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';

export const hasPurchase = async (id: string): Promise<boolean> => {
  'use cache: private';
  cacheLife('hours');
  cacheTag(`movies-${id}-purchase`);

  const { data } = await getClient().query({
    query: HasPurchaseDocument,
    variables: { movieId: id },
  });

  return data!.hasPurchase;
};

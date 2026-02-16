import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { HasPurchaseDocument } from '@shared/api/graphql/graphql';

export const hasPurchase = async (id: string): Promise<boolean> => {
  const { data } = await getClient().query({
    query: HasPurchaseDocument,
    variables: { movieId: id },
  });

  return data!.hasPurchase;
};

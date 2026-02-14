import { getClient } from '@lib/apollo/rsc-client';
import { HasPurchaseDocument } from '@lib/graphql/generated/graphql';

export const hasPurchase = async (id: string): Promise<boolean> => {
  const { data } = await getClient().query({
    query: HasPurchaseDocument,
    variables: { movieId: id },
  });

  return data!.hasPurchase;
};

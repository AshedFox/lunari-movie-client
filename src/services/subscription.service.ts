import { getClient } from '@lib/apollo/rsc-client';
import { HasActiveSubscriptionDocument } from '@lib/graphql/generated/graphql';

export const hasActiveSubscription = async () => {
  const { data } = await getClient().query({
    query: HasActiveSubscriptionDocument,
  });

  return data!.hasActiveSubscription;
};

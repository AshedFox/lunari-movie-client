import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { HasActiveSubscriptionDocument } from '@shared/api/graphql/graphql';

export const hasActiveSubscription = async () => {
  const { data } = await getClient().query({
    query: HasActiveSubscriptionDocument,
  });

  return data!.hasActiveSubscription;
};

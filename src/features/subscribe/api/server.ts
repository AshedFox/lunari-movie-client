import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  ActivateSubscriptionDocument,
  SubscribeDocument,
} from '@shared/api/graphql/graphql';

export const subscribe = async (priceId: string) => {
  const { data } = await getClient().mutate({
    mutation: SubscribeDocument,
    variables: {
      priceId,
    },
  });

  return data!.subscribe;
};

export const activateSubscription = async (sessionId: string) => {
  const { data } = await getClient().mutate({
    mutation: ActivateSubscriptionDocument,
    variables: { sessionId },
  });

  return data!.activateSubscription;
};

'use server';

import { getClient } from '@lib/apollo/rsc-client';
import { ActivateSubscriptionDocument } from '@lib/graphql/generated/graphql';

export const activateSubscription = async (sessionId: string) => {
  const { data } = await getClient().mutate({
    mutation: ActivateSubscriptionDocument,
    variables: { sessionId },
  });

  return data;
};

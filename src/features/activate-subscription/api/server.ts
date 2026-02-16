import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { ActivateSubscriptionDocument } from '@shared/api/graphql/graphql';

export const activateSubscription = async (sessionId: string) => {
  const { data } = await getClient().mutate({
    mutation: ActivateSubscriptionDocument,
    variables: { sessionId },
  });

  return data!.activateSubscription;
};

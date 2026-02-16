import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { CreateSubscriptionsManageLinkDocument } from '@shared/api/graphql/graphql';

export const createSubscriptionsManageLink = async () => {
  const { data } = await getClient().mutate({
    mutation: CreateSubscriptionsManageLinkDocument,
  });

  return data!.createSubscriptionsManageLink;
};

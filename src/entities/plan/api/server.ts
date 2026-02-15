import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetActivePlansDocument } from '@shared/api/graphql/graphql';

export const getActivePlans = async () => {
  const { data } = await getClient().query({
    query: GetActivePlansDocument,
    context: { skipAuth: true },
  });

  return data!.getPlans;
};

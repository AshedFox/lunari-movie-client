import { getClient } from '@lib/apollo/rsc-client';
import { GetActivePlansDocument } from '@lib/graphql/generated/graphql';

export const getActivePlans = async () => {
  const { data } = await getClient().query({
    query: GetActivePlansDocument,
    context: { skipAuth: true },
  });

  return data!.getPlans;
};

import { getClient } from '@lib/apollo/rsc-client';
import { GetFilterInitStudiosDocument } from '@lib/graphql/generated/graphql';

export const getStudiosByIds = async (ids: string[]) => {
  const { data } = await getClient().query({
    query: GetFilterInitStudiosDocument,
    variables: { in: ids },
    context: { skipAuth: true },
  });

  return data!.getAllStudios;
};

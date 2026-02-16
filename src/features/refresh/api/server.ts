import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { RefreshDocument } from '@shared/api/graphql/graphql';

export const refresh = async (token: string) => {
  const { data } = await getClient().mutate({
    mutation: RefreshDocument,
    variables: {
      token,
    },
  });

  return data!.refresh;
};

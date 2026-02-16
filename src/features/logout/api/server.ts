import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { LogoutDocument } from '@shared/api/graphql/graphql';

export const logout = async (refreshToken: string) => {
  const { data } = await getClient().mutate({
    mutation: LogoutDocument,
    variables: { refreshToken },
    errorPolicy: 'all',
  });

  return data!.logout;
};

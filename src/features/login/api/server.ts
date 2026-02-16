import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { LoginDocument, LoginInput } from '@shared/api/graphql/graphql';

export const login = async (input: LoginInput) => {
  const { data } = await getClient().mutate({
    mutation: LoginDocument,
    variables: {
      input,
    },
  });

  return data!.login;
};

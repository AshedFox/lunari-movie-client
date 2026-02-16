import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { SignUpDocument, SignUpInput } from '@shared/api/graphql/graphql';

export const signUp = async (input: SignUpInput) => {
  const { data } = await getClient().mutate({
    mutation: SignUpDocument,
    variables: {
      input,
    },
  });

  return data!.signUp;
};

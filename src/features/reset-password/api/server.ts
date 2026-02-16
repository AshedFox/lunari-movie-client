import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  ResetPasswordDocument,
  ResetPasswordInput,
} from '@shared/api/graphql/graphql';

export const resetPassword = async (input: ResetPasswordInput) => {
  const { data } = await getClient().mutate({
    mutation: ResetPasswordDocument,
    variables: {
      input,
    },
  });

  return data!.resetPassword;
};

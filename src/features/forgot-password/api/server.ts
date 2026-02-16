import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { ForgotPasswordDocument } from '@shared/api/graphql/graphql';

export const forgotPassword = async (email: string) => {
  const { data } = await getClient().mutate({
    mutation: ForgotPasswordDocument,
    variables: { email },
  });

  return data!.forgotPassword;
};

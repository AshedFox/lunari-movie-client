'use server';

import { graphql } from '@lib/graphql/generated';
import { getClient } from '@lib/apollo/rsc-client';

const ForgotPasswordDocument = graphql(`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`);

export async function forgotPassword(email: string) {
  const { data, error } = await getClient().mutate({
    mutation: ForgotPasswordDocument,
    variables: { email },
    errorPolicy: 'all',
  });

  if (!data || error) {
    return {
      error: error?.message ?? 'Failed to send email with reset code',
    };
  }

  return;
}

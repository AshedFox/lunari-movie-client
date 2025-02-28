'use server';

import { graphql } from '@lib/graphql/generated';
import { getClient } from '@lib/apollo/rsc-client';

const ForgotPasswordDocument = graphql(`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`);

export async function forgotPassword(email: string) {
  const { data, errors } = await getClient().mutate({
    mutation: ForgotPasswordDocument,
    variables: { email },
    errorPolicy: 'all',
  });

  if (!data || errors) {
    return {
      error:
        errors && errors[0].message
          ? errors[0].message
          : 'Failed to send email with reset code',
    };
  }

  return;
}

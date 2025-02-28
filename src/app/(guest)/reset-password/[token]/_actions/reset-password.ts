'use server';

import { graphql } from '@lib/graphql/generated';
import { ResetPasswordInput } from '@lib/graphql/generated/graphql';
import { getClient } from '@lib/apollo/rsc-client';

const ResetPasswordDocument = graphql(`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`);

export async function resetPassword(input: ResetPasswordInput) {
  const { data, errors } = await getClient().mutate({
    mutation: ResetPasswordDocument,
    variables: { input },
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
}

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
  const { data, error } = await getClient().mutate({
    mutation: ResetPasswordDocument,
    variables: { input },
    errorPolicy: 'all',
  });

  if (!data || error) {
    return {
      error: error?.message ?? 'Failed to send email with reset code',
    };
  }
}

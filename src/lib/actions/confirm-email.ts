'use server';

import { graphql } from '@lib/graphql/generated';
import { getClient } from '@lib/apollo/rsc-client';

const ConfirmEmailDocument = graphql(`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token)
  }
`);

export async function confirmEmail(token: string) {
  const { data, error } = await getClient().mutate({
    mutation: ConfirmEmailDocument,
    variables: {
      token,
    },
    errorPolicy: 'all',
  });

  if (!data || error) {
    return {
      error: error?.message ?? 'Failed to confirm confirmation',
    };
  }

  return;
}

'use server';

import { graphql } from '@lib/graphql/generated';
import { getClient } from '@lib/apollo/rsc-client';

const ConfirmEmailDocument = graphql(`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token)
  }
`);

export async function confirmEmail(token: string) {
  const { data, errors } = await getClient().mutate({
    mutation: ConfirmEmailDocument,
    variables: {
      token,
    },
    errorPolicy: 'all',
  });

  if (!data || errors) {
    return {
      error:
        errors && errors[0].message
          ? errors[0].message
          : 'Failed to confirm confirmation',
    };
  }

  return;
}

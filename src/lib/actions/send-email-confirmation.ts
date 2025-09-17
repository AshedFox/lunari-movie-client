'use server';

import { graphql } from '@lib/graphql/generated';
import { getClient } from '@lib/apollo/rsc-client';

const SendEmailConfirmationDocument = graphql(`
  mutation SendEmailConfirmation {
    sendConfirmation
  }
`);

export async function sendEmailConfirmation() {
  const { data, error } = await getClient().mutate({
    mutation: SendEmailConfirmationDocument,
    errorPolicy: 'all',
  });

  if (!data || error) {
    return {
      error: error?.message ?? 'Failed to send email confirmation',
    };
  }

  return;
}

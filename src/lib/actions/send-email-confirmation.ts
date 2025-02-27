'use server';

import { graphql } from '@lib/graphql/generated';
import { getClient } from '@lib/apollo/rsc-client';

const SendEmailConfirmationDocument = graphql(`
  mutation SendEmailConfirmation {
    sendConfirmation
  }
`);

export async function sendEmailConfirmation() {
  const { data, errors } = await getClient().mutate({
    mutation: SendEmailConfirmationDocument,
    errorPolicy: 'all',
  });

  if (!data || errors) {
    return {
      error:
        errors && errors[0].message
          ? errors[0].message
          : 'Failed to send email confirmation',
    };
  }

  return;
}

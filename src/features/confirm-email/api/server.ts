import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  ConfirmEmailDocument,
  SendEmailConfirmationDocument,
} from '@shared/api/graphql/graphql';

export const confirmEmail = async (token: string) => {
  const { data } = await getClient().mutate({
    mutation: ConfirmEmailDocument,
    variables: { token },
  });

  return data!.confirmEmail;
};

export const sendEmailConfirmation = async () => {
  const { data } = await getClient().mutate({
    mutation: SendEmailConfirmationDocument,
  });

  return data!.sendConfirmation;
};

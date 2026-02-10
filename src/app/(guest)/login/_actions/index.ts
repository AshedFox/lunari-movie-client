'use server';

import { LoginInput } from '@lib/graphql/generated/graphql';
import { redirect } from 'next/navigation';
import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';
import { setAuthCookies } from '@lib/auth/cookie';

const LoginDocument = graphql(/* GraphQL */ `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        ...UserProfile
      }
    }
  }
`);

export async function login(input: LoginInput, from?: string) {
  const { data, error } = await getClient().mutate({
    mutation: LoginDocument,
    variables: {
      input,
    },
    errorPolicy: 'all',
  });

  if (!data || error) {
    return { error };
  }

  await setAuthCookies(data.login.accessToken, data.login.refreshToken);

  redirect(from ?? '/');
}

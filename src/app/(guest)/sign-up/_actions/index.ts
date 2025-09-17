'use server';

import { SignUpInput } from '@lib/graphql/generated/graphql';
import { redirect } from 'next/navigation';
import { graphql } from '@lib/graphql/generated';
import { getClient } from '@lib/apollo/rsc-client';
import { setAuthCookies } from '@lib/auth/cookie';

const SignUpDocument = graphql(/* GraphQL */ `
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      accessToken
      refreshToken
      user {
        ...UserProfile
      }
    }
  }
`);

export async function signUp(input: SignUpInput, from?: string) {
  const { data, error } = await getClient().mutate({
    mutation: SignUpDocument,
    variables: {
      input,
    },
    errorPolicy: 'all',
  });

  if (!data || error) {
    return { error };
  }

  await setAuthCookies(
    data.signUp.accessToken,
    data.signUp.refreshToken,
    data.signUp.user,
  );

  redirect(from ?? '/');
}

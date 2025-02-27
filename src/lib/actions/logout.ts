'use server';

import { graphql } from '@lib/graphql/generated';
import { cookies } from 'next/headers';
import { REFRESH_COOKIE_KEY } from '@lib/auth/constants';
import { getClient } from '@lib/apollo/rsc-client';
import { resetAuthCookies } from '@lib/auth/cookie';

const LogoutDocument = graphql(`
  mutation Logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken)
  }
`);

export async function logout() {
  const refreshToken = (await cookies()).get(REFRESH_COOKIE_KEY)?.value;

  if (!refreshToken) {
    return { error: 'Failed to logout' };
  }

  const { data, errors } = await getClient().mutate({
    mutation: LogoutDocument,
    variables: { refreshToken },
    errorPolicy: 'all',
  });

  if (!data || errors) {
    return {
      error:
        errors && errors[0].message ? errors[0].message : 'Failed to logout',
    };
  }

  await resetAuthCookies();
  return;
}

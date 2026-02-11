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
    await resetAuthCookies();
    return;
  }

  const { data, error } = await getClient().mutate({
    mutation: LogoutDocument,
    variables: { refreshToken },
    errorPolicy: 'all',
  });

  if (!data || error) {
    await resetAuthCookies();
    return {
      error: error?.message ?? 'Failed to logout',
    };
  }

  await resetAuthCookies();
  return;
}

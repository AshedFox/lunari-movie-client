import { cookies } from 'next/headers';
import { REFRESH_COOKIE_KEY } from '@lib/auth/constants';
import { resetAuthCookies, setAuthCookies } from '@lib/auth/cookie';
import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';
import { NextResponse } from 'next/server';

const RefreshDocument = graphql(`
  mutation Refresh($token: String!) {
    refresh(refreshToken: $token) {
      accessToken
      refreshToken
      user {
        ...UserProfile
      }
    }
  }
`);

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE_KEY)?.value;

  if (!refreshToken) {
    await resetAuthCookies();
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const { data, error } = await getClient().mutate({
    mutation: RefreshDocument,
    variables: {
      token: refreshToken,
    },
    errorPolicy: 'all',
  });

  if (error || !data) {
    await resetAuthCookies();
    return NextResponse.json(
      { error: error?.message ?? 'Refresh failed' },
      { status: 401 },
    );
  }

  await setAuthCookies(
    data.refresh.accessToken,
    data.refresh.refreshToken,
    data.refresh.user,
  );

  return NextResponse.json(null, { status: 201 });
}

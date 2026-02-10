import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE_KEY, REFRESH_COOKIE_KEY } from '@lib/auth/constants';
import { resetAuthCookies, setAuthCookies } from '@lib/auth/cookie';
import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';

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

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE_KEY)?.value;

  if (token) {
    return NextResponse.json(token);
  }

  const refreshToken = request.cookies.get(REFRESH_COOKIE_KEY)?.value;

  if (!refreshToken) {
    return NextResponse.json(null);
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
    return NextResponse.json(null);
  }

  await setAuthCookies(data.refresh.accessToken, data.refresh.refreshToken);

  return NextResponse.json(data.refresh.accessToken);
}

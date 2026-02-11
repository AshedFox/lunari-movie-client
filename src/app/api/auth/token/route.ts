import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE_KEY, REFRESH_COOKIE_KEY } from '@lib/auth/constants';
import { resetAuthCookies, setAuthCookies } from '@lib/auth/cookie';
import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';
import { jwtDecode } from 'jwt-decode';

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
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp > currentTime + 10) {
        return NextResponse.json(token);
      }
    } catch {}
  }

  const refreshToken = request.cookies.get(REFRESH_COOKIE_KEY)?.value;

  if (!refreshToken) {
    if (token) {
      await resetAuthCookies();
    }
    return NextResponse.json(null);
  }

  const { data, error } = await getClient().mutate({
    mutation: RefreshDocument,
    variables: {
      token: refreshToken,
    },
    errorPolicy: 'all',
  });

  if (error || !data || !data.refresh) {
    await resetAuthCookies();
    return NextResponse.json(null);
  }

  await setAuthCookies(data.refresh.accessToken, data.refresh.refreshToken);

  return NextResponse.json(data.refresh.accessToken);
}

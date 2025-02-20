import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE_KEY, REFRESH_COOKIE_KEY } from '@lib/auth/constants';
import { resetAuthCookies, setAuthCookies } from '@lib/auth/cookie';
import { getClient } from '@lib/apollo/rsc-client';
import { RefreshDocument } from '@lib/graphql/generated/graphql';

const guestRoutes = ['/login', '/sign-up'];
const privateRoutes = ['/users/me'];

async function refresh(req: NextRequest, res: NextResponse): Promise<boolean> {
  const refreshToken = req.cookies.get(REFRESH_COOKIE_KEY)?.value;

  if (!refreshToken) {
    await resetAuthCookies(res.cookies);
    return false;
  }

  const { data, errors } = await getClient().mutate({
    mutation: RefreshDocument,
    variables: {
      token: refreshToken,
    },
    errorPolicy: 'all',
  });

  if (errors || !data) {
    await resetAuthCookies(res.cookies);
    return false;
  }

  await setAuthCookies(
    data.refresh.accessToken,
    data.refresh.refreshToken,
    data.refresh.user,
    res.cookies,
  );

  return true;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const accessToken = req.cookies.get(ACCESS_COOKIE_KEY)?.value;
  const refreshToken = req.cookies.get(REFRESH_COOKIE_KEY)?.value;

  if (privateRoutes.includes(req.nextUrl.pathname)) {
    if (!accessToken) {
      if (refreshToken && (await refresh(req, res))) {
        return res;
      }
      return NextResponse.redirect(new URL('/login', req.url), {
        headers: res.headers,
      });
    }

    return res;
  }

  if (guestRoutes.includes(req.nextUrl.pathname)) {
    if (!accessToken && refreshToken && (await refresh(req, res))) {
      return NextResponse.redirect(new URL('/', req.url), {
        headers: res.headers,
      });
    }

    if (accessToken) {
      return NextResponse.redirect(new URL('/', req.url), {
        headers: res.headers,
      });
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

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

  const { data, error } = await getClient().mutate({
    mutation: RefreshDocument,
    variables: {
      token: refreshToken,
    },
    errorPolicy: 'all',
  });

  if (error || !data) {
    await resetAuthCookies(res.cookies);
    return false;
  }

  await setAuthCookies(
    data.refresh.accessToken,
    data.refresh.refreshToken,
    res.cookies,
  );

  return true;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  let accessToken = req.cookies.get(ACCESS_COOKIE_KEY)?.value;

  if (!accessToken) {
    await refresh(req, res);
    accessToken = res.cookies.get(ACCESS_COOKIE_KEY)?.value;
  }

  if (privateRoutes.includes(req.nextUrl.pathname) && !accessToken) {
    return NextResponse.redirect(
      new URL(`/login?from=${req.nextUrl.pathname}`, req.url),
      {
        headers: res.headers,
      },
    );
  } else if (guestRoutes.includes(req.nextUrl.pathname) && accessToken) {
    return NextResponse.redirect(new URL('/', req.url), {
      headers: res.headers,
    });
  }

  res.headers.set('X-ORIGIN', req.nextUrl.origin);

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

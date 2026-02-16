import { NextRequest, NextResponse } from 'next/server';
import { resetAuthCookies, setAuthCookies } from '@shared/lib/auth/cookie';
import { isGuestRoute, isPrivateRoute } from '@shared/config/routes';
import {
  REFRESH_COOKIE_KEY,
  ACCESS_COOKIE_KEY,
} from '@shared/lib/auth/constants';
import { refresh } from '@features/refresh/server';

async function makeRefresh(
  req: NextRequest,
  res: NextResponse,
): Promise<boolean> {
  const refreshToken = req.cookies.get(REFRESH_COOKIE_KEY)?.value;

  if (!refreshToken) {
    await resetAuthCookies(res.cookies);
    return false;
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } =
      await refresh(refreshToken);

    await setAuthCookies(accessToken, newRefreshToken, res.cookies);
    return true;
  } catch {
    await resetAuthCookies(res.cookies);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  let accessToken = req.cookies.get(ACCESS_COOKIE_KEY)?.value;

  if (!accessToken) {
    await makeRefresh(req, res);
    accessToken = res.cookies.get(ACCESS_COOKIE_KEY)?.value;
  }

  if (isPrivateRoute(req.nextUrl.pathname) && !accessToken) {
    return NextResponse.redirect(
      new URL(`/login?from=${req.nextUrl.pathname}`, req.url),
      {
        headers: res.headers,
      },
    );
  } else if (isGuestRoute(req.nextUrl.pathname) && accessToken) {
    return NextResponse.redirect(new URL('/', req.url), {
      headers: res.headers,
    });
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('X-ORIGIN', req.nextUrl.origin);

  if (accessToken) {
    requestHeaders.set('x-access-token', accessToken);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  res.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, {
      ...cookie,
    });
  });

  return response;
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

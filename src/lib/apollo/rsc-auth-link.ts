import 'server-only';

import { setContext } from '@apollo/client/link/context';
import { cookies, headers } from 'next/headers';
import { ACCESS_COOKIE_KEY, REFRESH_COOKIE_KEY } from '@lib/auth/constants';

export const authLink = setContext(async (_, context) => {
  if (context.skipAuth) {
    return context;
  }

  let token = (await cookies()).get(ACCESS_COOKIE_KEY)?.value;

  if (!token) {
    const refrehsToken = (await cookies()).get(REFRESH_COOKIE_KEY)?.value;

    if (refrehsToken) {
      const origin = (await headers()).get('x-origin');

      if (origin) {
        await fetch(`${origin}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        token = (await cookies()).get(ACCESS_COOKIE_KEY)?.value;
      }
    }
  }

  return {
    ...context,
    headers: {
      ...context.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

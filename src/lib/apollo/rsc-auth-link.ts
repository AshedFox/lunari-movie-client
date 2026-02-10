import 'server-only';

import { setContext } from '@apollo/client/link/context';
import { cookies } from 'next/headers';
import { ACCESS_COOKIE_KEY } from '@lib/auth/constants';

export const authLink = setContext(async (_, context) => {
  if (context.skipAuth) {
    return context;
  }

  const token = (await cookies()).get(ACCESS_COOKIE_KEY)?.value;

  return {
    ...context,
    headers: {
      ...context.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

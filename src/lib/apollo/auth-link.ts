'use client';

import { setContext } from '@apollo/client/link/context';

export const authLink = setContext(async (_, context) => {
  if (context.skipAuth) {
    return context;
  }

  const res = await fetch('/api/auth/token', {
    method: 'GET',
    credentials: 'include',
  });

  const token = await res.json();

  return {
    ...context,
    headers: {
      ...context.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

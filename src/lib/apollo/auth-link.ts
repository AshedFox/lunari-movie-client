'use client';

import { setContext } from '@apollo/client/link/context';

export const authLink = setContext(async (_, { headers }) => {
  const res = await fetch('/api/auth/token', {
    method: 'GET',
    credentials: 'include',
  });

  const token = await res.json();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

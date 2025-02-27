'use client';

import { setContext } from '@apollo/client/link/context';

export const authLink = setContext(async (_, context) => {
  const res = await fetch('/api/auth/token', {
    method: 'GET',
    credentials: 'include',
  });

  let token = await res.json();

  if (!token) {
    await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    const newRes = await fetch('/api/auth/token', {
      method: 'GET',
      credentials: 'include',
    });
    token = await newRes.json();
  }

  return {
    ...context,
    headers: {
      ...context.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

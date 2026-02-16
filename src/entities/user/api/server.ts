import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetUserDocument } from '@shared/api/graphql/graphql';
import { ACCESS_COOKIE_KEY } from '@shared/lib/auth';
import { jwtDecode } from 'jwt-decode';
import { cacheLife, cacheTag } from 'next/cache';
import { headers, cookies } from 'next/headers';

export const getUser = async (id: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(`users-${id}`);

  const { data } = await getClient().query({
    query: GetUserDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getUser;
};

export const getCurrentUser = async () => {
  'use cache: private';
  cacheLife('seconds');
  cacheTag('current-user');

  const accessToken =
    (await headers()).get('x-access-token') ||
    (await cookies()).get(ACCESS_COOKIE_KEY)?.value;

  if (!accessToken) {
    return null;
  }

  let userId: string | undefined;

  try {
    const decoded = jwtDecode<{ id?: string; sub?: string }>(accessToken);
    userId = decoded.id ?? decoded.sub;
  } catch {
    return null;
  }

  if (!userId) {
    return null;
  }

  try {
    const { data } = await getClient().query({
      query: GetUserDocument,
      variables: { id: userId },
    });

    return data!.getUser;
  } catch {
    return null;
  }
};

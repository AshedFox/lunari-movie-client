import 'server-only';

import { cookies } from 'next/headers';
import { ACCESS_COOKIE_KEY } from '@lib/auth/constants';
import {
  GetUserDocument,
  UserProfileFragment,
} from '@lib/graphql/generated/graphql';
import { cache } from 'react';
import { getClient } from '@lib/apollo/rsc-client';
import { jwtDecode } from 'jwt-decode';

export const getUser = cache(async (): Promise<UserProfileFragment | null> => {
  const accessToken = (await cookies()).get(ACCESS_COOKIE_KEY)?.value;

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

  const { data } = await getClient().query({
    query: GetUserDocument,
    variables: {
      id: userId,
    },
    errorPolicy: 'ignore',
  });

  return data?.getUser || null;
});

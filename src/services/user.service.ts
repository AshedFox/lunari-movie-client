import { getClient } from '@lib/apollo/rsc-client';
import { ACCESS_COOKIE_KEY } from '@lib/auth/constants';
import { GetUserDocument } from '@lib/graphql/generated/graphql';
import { jwtDecode } from 'jwt-decode';
import { headers, cookies } from 'next/headers';

export const getUser = async (id: string) => {
  const { data } = await getClient().query({
    query: GetUserDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getUser;
};

export const getCurrentUser = async () => {
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

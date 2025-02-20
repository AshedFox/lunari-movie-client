import 'server-only';

import { cookies } from 'next/headers';
import { USER_COOKIE_KEY } from '@lib/auth/constants';
import { UserProfileFragment } from '@lib/graphql/generated/graphql';

export async function getUser(): Promise<UserProfileFragment | null> {
  const userValue = (await cookies()).get(USER_COOKIE_KEY)?.value;
  return userValue ? JSON.parse(userValue) : null;
}

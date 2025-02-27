'use server';

import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';
import { setUserCookie } from '@lib/auth/cookie';
import { revalidatePath } from 'next/cache';

const UpdateAvatarDocument = graphql(`
  mutation UpdateAvatar($file: Upload!) {
    updateAvatar(file: $file) {
      ...UserProfile
    }
  }
`);

export async function updateAvatar(file: File) {
  const { data, errors } = await getClient().mutate({
    mutation: UpdateAvatarDocument,
    variables: {
      file,
    },
    errorPolicy: 'all',
  });

  if (errors || !data) {
    return { error: 'Failed to upload' };
  }

  await setUserCookie(data.updateAvatar);
  revalidatePath('/users/me', 'layout');
  return { data };
}

'use server';

import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';
import { revalidatePath } from 'next/cache';

const UpdateAvatarDocument = graphql(`
  mutation UpdateAvatar($file: Upload!) {
    updateAvatar(file: $file) {
      ...UserProfile
    }
  }
`);

export async function updateAvatar(file: File) {
  const { data, error } = await getClient().mutate({
    mutation: UpdateAvatarDocument,
    variables: {
      file,
    },
    errorPolicy: 'all',
  });

  if (error || !data) {
    return { error: error?.message ?? 'Failed to upload' };
  }

  revalidatePath('/users/me', 'layout');
  return { data };
}

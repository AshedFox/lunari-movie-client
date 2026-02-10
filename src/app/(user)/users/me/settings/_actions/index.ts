'use server';

import { UpdateUserInput } from '@lib/graphql/generated/graphql';
import { graphql } from '@lib/graphql/generated';
import { getClient } from '@lib/apollo/rsc-client';
import { revalidatePath } from 'next/cache';

const UpdatePasswordDocument = graphql(`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`);

const UpdateMeDocument = graphql(`
  mutation UpdateMe($input: UpdateUserInput!) {
    updateMe(input: $input) {
      ...UserProfile
    }
  }
`);

export async function updatePassword(oldPassword: string, newPassword: string) {
  const { data, error } = await getClient().mutate({
    mutation: UpdatePasswordDocument,
    variables: {
      oldPassword,
      newPassword,
    },
    errorPolicy: 'all',
  });

  if (error || !data) {
    return { error: error?.message ?? 'Something went wrong!' };
  }

  return { data };
}

export async function updateProfile(input: UpdateUserInput) {
  const { data, error } = await getClient().mutate({
    mutation: UpdateMeDocument,
    variables: {
      input,
    },
    errorPolicy: 'all',
  });

  if (error || !data) {
    return { error: error?.message ?? 'Something went wrong!' };
  }

  revalidatePath('/users/me', 'layout');
  return { data };
}

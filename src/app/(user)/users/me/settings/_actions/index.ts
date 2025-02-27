'use server';

import { UpdateUserInput } from '@lib/graphql/generated/graphql';
import { graphql } from '@lib/graphql/generated';
import { getClient } from '@lib/apollo/rsc-client';
import { setUserCookie } from '@lib/auth/cookie';
import { revalidatePath } from 'next/cache';

const UpdatePasswordDocument = graphql(`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      ...UserProfile
    }
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
  const { data, errors } = await getClient().mutate({
    mutation: UpdatePasswordDocument,
    variables: {
      oldPassword,
      newPassword,
    },
    errorPolicy: 'all',
  });

  if (errors || !data) {
    return { errors: errors || [{ message: 'Something went wrong!' }] };
  }

  await setUserCookie(data.updatePassword);
  revalidatePath('/users/me', 'layout');
  return { data };
}

export async function updateProfile(input: UpdateUserInput) {
  const { data, errors } = await getClient().mutate({
    mutation: UpdateMeDocument,
    variables: {
      input,
    },
    errorPolicy: 'all',
  });

  if (errors || !data) {
    console.log(errors);
    return { errors: errors || [{ message: 'Something went wrong!' }] };
  }

  await setUserCookie(data.updateMe);
  revalidatePath('/users/me', 'layout');
  return { data };
}

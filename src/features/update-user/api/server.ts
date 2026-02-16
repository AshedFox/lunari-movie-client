import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  UpdateAvatarDocument,
  UpdateMeDocument,
  UpdatePasswordDocument,
  UpdateUserInput,
} from '@shared/api/graphql/graphql';

export const updatePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  const { data } = await getClient().mutate({
    mutation: UpdatePasswordDocument,
    variables: {
      oldPassword,
      newPassword,
    },
  });

  return data;
};

export const updateProfile = async (input: UpdateUserInput) => {
  const { data } = await getClient().mutate({
    mutation: UpdateMeDocument,
    variables: {
      input,
    },
  });

  return data;
};

export async function updateAvatar(file: File) {
  const { data } = await getClient().mutate({
    mutation: UpdateAvatarDocument,
    variables: {
      file,
    },
  });

  return data;
}

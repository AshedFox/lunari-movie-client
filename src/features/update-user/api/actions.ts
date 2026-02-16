'use server';

import { revalidateTag } from 'next/cache';
import { updateAvatar, updatePassword, updateProfile } from './server';
import { UpdateUserInput } from '@shared/api/graphql/graphql';

export async function updatePasswordAction(
  oldPassword: string,
  newPassword: string,
) {
  const data = await updatePassword(oldPassword, newPassword);
  revalidateTag('current-user');
  return data;
}

export async function updateProfileAction(input: UpdateUserInput) {
  const data = await updateProfile(input);
  revalidateTag('current-user');
  return data;
}

export async function updateAvatarAction(file: File) {
  const data = await updateAvatar(file);
  revalidateTag('current-user');
  return data;
}

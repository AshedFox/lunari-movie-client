'use server';

import { updateTag } from 'next/cache';
import { updateAvatar, updatePassword, updateProfile } from './server';
import { UpdateUserInput } from '@shared/api/graphql/graphql';

export async function updatePasswordAction(
  oldPassword: string,
  newPassword: string,
) {
  const data = await updatePassword(oldPassword, newPassword);
  updateTag('current-user');
  return data;
}

export async function updateProfileAction(input: UpdateUserInput) {
  const data = await updateProfile(input);
  updateTag('current-user');
  return data;
}

export async function updateAvatarAction(file: File) {
  const data = await updateAvatar(file);
  updateTag('current-user');
  return data;
}

'use server';

import {
  CreateCollectionUserInput,
  UpdateCollectionUserInput,
} from '@shared/api/graphql/graphql';
import { createCollectionUser, updateCollectionUser } from './server';
import { revalidateTag } from 'next/cache';

export async function createCollectionUserAction(
  input: CreateCollectionUserInput,
) {
  const data = await createCollectionUser(input);

  revalidateTag(`collections-${data.collectionId}-users-${data.userId}`);

  return data;
}

export async function updateCollectionUserAction(
  userId: string,
  collectionId: number,
  input: UpdateCollectionUserInput,
) {
  const data = await updateCollectionUser(userId, collectionId, input);

  revalidateTag(`collections-${collectionId}-users-${userId}`);

  return data;
}

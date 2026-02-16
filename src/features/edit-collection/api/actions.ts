'use server';

import { UpdateCollectionInput } from '@shared/api/graphql/graphql';
import { revalidateTag } from 'next/cache';
import { updateCollection } from './server';

export async function updateCollectionAction(
  id: number,
  input: UpdateCollectionInput,
) {
  const data = await updateCollection(id, input);

  revalidateTag(`collection-${id}`);

  return data;
}

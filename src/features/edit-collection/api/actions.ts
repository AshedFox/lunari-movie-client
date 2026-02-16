'use server';

import { UpdateCollectionInput } from '@shared/api/graphql/graphql';
import { revalidateTag, updateTag } from 'next/cache';
import { updateCollection } from './server';

export async function updateCollectionAction(
  id: number,
  input: UpdateCollectionInput,
) {
  const data = await updateCollection(id, input);

  revalidateTag('collections', 'max');
  updateTag(`collection-${id}`);

  return data;
}

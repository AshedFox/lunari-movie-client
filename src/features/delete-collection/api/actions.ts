'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { deleteCollection } from './server';

export async function deleteCollectionAction(id: number) {
  const data = await deleteCollection(id);

  revalidateTag('collections', 'max');
  updateTag(`collection-${id}`);

  return data;
}

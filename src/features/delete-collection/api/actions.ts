'use server';

import { revalidateTag } from 'next/cache';
import { deleteCollection } from './server';

export async function deleteCollectionAction(id: number) {
  const data = await deleteCollection(id);

  revalidateTag(`collection-${id}`);

  return data;
}

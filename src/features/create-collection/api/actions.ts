'use server';

import { CreateCollectionInput } from '@shared/api/graphql/graphql';
import { revalidateTag } from 'next/cache';
import { createCollection } from './server';

export async function createCollectionAction(input: CreateCollectionInput) {
  const data = await createCollection(input);

  revalidateTag('collections');

  return data;
}

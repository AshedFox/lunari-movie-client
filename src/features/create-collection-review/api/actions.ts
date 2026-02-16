'use server';

import { CreateCollectionReviewInput } from '@shared/api/graphql/graphql';
import { revalidateTag } from 'next/cache';
import { createCollectionReview } from './server';

export async function createCollectionReviewAction(
  input: CreateCollectionReviewInput,
) {
  const data = await createCollectionReview(input);

  revalidateTag(`collections-${input.collectionId}-reviews`);

  return data;
}

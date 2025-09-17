'use server';

import { getClient } from '@lib/apollo/rsc-client';
import {
  CreateCollectionReviewDocument,
  CreateCollectionReviewInput,
} from '@lib/graphql/generated/graphql';
import { revalidateTag } from 'next/cache';

export async function createMovieReview(input: CreateCollectionReviewInput) {
  const { data, error } = await getClient().mutate({
    mutation: CreateCollectionReviewDocument,
    variables: {
      input,
    },
    errorPolicy: 'all',
  });

  if (!data || error) {
    return { error };
  }

  revalidateTag(`collection-reviews-${input.collectionId}`);
  return { data };
}

'use server';

import { getClient } from '@lib/apollo/rsc-client';
import {
  CreateCollectionReviewDocument,
  CreateCollectionReviewInput,
} from '@lib/graphql/generated/graphql';
import { revalidateTag } from 'next/cache';

export async function createMovieReview(input: CreateCollectionReviewInput) {
  const { data, errors } = await getClient().mutate({
    mutation: CreateCollectionReviewDocument,
    variables: {
      input,
    },
    errorPolicy: 'all',
  });

  if (!data || errors) {
    return { errors };
  }

  revalidateTag(`collection-reviews-${input.collectionId}`);
  return { data };
}

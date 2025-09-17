'use server';

import { getClient } from '@lib/apollo/rsc-client';
import {
  CreateMovieReviewDocument,
  CreateMovieReviewInput,
} from '@lib/graphql/generated/graphql';
import { revalidateTag } from 'next/cache';

export async function createMovieReview(input: CreateMovieReviewInput) {
  const { data, error } = await getClient().mutate({
    mutation: CreateMovieReviewDocument,
    variables: {
      input,
    },
    errorPolicy: 'all',
  });

  if (!data || error) {
    return { error };
  }

  revalidateTag(`movie-reviews-${input.movieId}`);
  return { data };
}

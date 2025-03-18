'use server';

import { getClient } from '@lib/apollo/rsc-client';
import {
  CreateMovieReviewDocument,
  CreateMovieReviewInput,
} from '@lib/graphql/generated/graphql';
import { revalidateTag } from 'next/cache';

export async function createMovieReview(input: CreateMovieReviewInput) {
  const { data, errors } = await getClient().mutate({
    mutation: CreateMovieReviewDocument,
    variables: {
      input,
    },
    errorPolicy: 'all',
  });

  if (!data || errors) {
    return { errors };
  }

  revalidateTag(`movie-reviews-${input.movieId}`);
  return { data };
}

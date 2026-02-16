'use server';

import { revalidateTag } from 'next/cache';
import { createMovieReview } from './server';
import { CreateMovieReviewInput } from '@shared/api/graphql/graphql';

export async function createMovieReviewAction(input: CreateMovieReviewInput) {
  const data = await createMovieReview(input);

  revalidateTag(`movie-${input.movieId}-reviews`, 'max');

  return data;
}

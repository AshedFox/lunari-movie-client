import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  GetMovieReviewsDocument,
  HasMovieReviewDocument,
  MovieReviewSort,
} from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';
import { DEFAULT_LIMIT } from '../config';

export const hasMovieReview = async (movieId: string) => {
  'use cache: private';
  cacheLife('hours');
  cacheTag(`movies-${movieId}-reviews`);

  const { data } = await getClient().query({
    query: HasMovieReviewDocument,
    variables: { movieId },
  });

  return data!.hasMovieReview;
};

export const getMovieReviews = async (
  movieId: string,
  cursor?: string,
  limit: number = DEFAULT_LIMIT,
  sort?: MovieReviewSort,
) => {
  'use cache: private';
  cacheLife('hours');
  cacheTag(`movies-${movieId}-reviews`);

  const { data } = await getClient().query({
    query: GetMovieReviewsDocument,
    variables: { movieId, limit, cursor, sort },
  });

  return data!.getMoviesReviewsRelay;
};

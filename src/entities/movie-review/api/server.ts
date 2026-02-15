import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  GetMovieReviewsDocument,
  HasMovieReviewDocument,
  MovieReviewSort,
} from '@shared/api/graphql/graphql';
import { DEFAULT_LIMIT } from '../config';

export const hasMovieReview = async (movieId: string) => {
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
  const { data } = await getClient().query({
    query: GetMovieReviewsDocument,
    variables: { movieId, limit, cursor, sort },
  });

  return data!.getMoviesReviewsRelay;
};

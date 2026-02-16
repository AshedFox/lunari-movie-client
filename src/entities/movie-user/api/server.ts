import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  GetMovieUserDocument,
  GetUserBookmarksDocument,
} from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';

export const getMovieUser = async (userId: string, movieId: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(`movies-${movieId}-users-${userId}`);

  const { data } = await getClient().query({
    query: GetMovieUserDocument,
    variables: { movieId, userId },
    context: { skipAuth: true },
  });

  return data!.getMovieUser;
};

export const fetchMovieUser = async (userId: string, movieId: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(`movies-${movieId}-users-${userId}`);

  try {
    const { data } = await getClient().query({
      query: GetMovieUserDocument,
      variables: { movieId, userId },
      context: { skipAuth: true },
    });

    return data!.getMovieUser;
  } catch {
    return null;
  }
};

export const getUserBookmarks = async (
  userId: string,
  limit: number,
  offset: number,
) => {
  'use cache';
  cacheLife('hours');
  cacheTag(`users-${userId}-movies`);

  const { data } = await getClient().query({
    query: GetUserBookmarksDocument,
    variables: { userId, limit, offset },
    context: { skipAuth: true },
  });

  return data!.getMoviesUsers;
};

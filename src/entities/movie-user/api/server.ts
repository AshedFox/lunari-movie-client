import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  GetMovieUserDocument,
  GetUserBookmarksDocument,
} from '@shared/api/graphql/graphql';

export const getMovieUser = async (userId: string, movieId: string) => {
  const { data } = await getClient().query({
    query: GetMovieUserDocument,
    variables: { movieId, userId },
    context: { skipAuth: true },
  });

  return data!.getMovieUser;
};

export const fetchMovieUser = async (userId: string, movieId: string) => {
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
  const { data } = await getClient().query({
    query: GetUserBookmarksDocument,
    variables: { userId, limit, offset },
    context: { skipAuth: true },
  });

  return data!.getMoviesUsers;
};

import { getClient } from '@lib/apollo/rsc-client';
import { GetMovieUserDocument } from '@lib/graphql/generated/graphql';

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

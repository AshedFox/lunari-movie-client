import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  CreateMovieUserDocument,
  CreateMovieUserInput,
  UpdateMovieUserDocument,
  UpdateMovieUserInput,
} from '@shared/api/graphql/graphql';

export const createMovieUser = async (input: CreateMovieUserInput) => {
  const { data } = await getClient().mutate({
    mutation: CreateMovieUserDocument,
    variables: { input },
  });

  return data!.createMovieUser;
};

export const updateMovieUser = async (
  userId: string,
  movieId: string,
  input: UpdateMovieUserInput,
) => {
  const { data } = await getClient().mutate({
    mutation: UpdateMovieUserDocument,
    variables: { movieId, userId, input },
  });

  return data!.updateMovieUser;
};

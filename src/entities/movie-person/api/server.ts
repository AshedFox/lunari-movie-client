import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetMoviePersonsDocument } from '@shared/api/graphql/graphql';
import { DEFAULT_PAGE_SIZE } from '../config';

export const getMoviePersons = async (movieId: string, page?: number) => {
  const { data } = await getClient().query({
    query: GetMoviePersonsDocument,
    variables: {
      movieId,
      limit: DEFAULT_PAGE_SIZE,
      offset: page ? (page - 1) * DEFAULT_PAGE_SIZE : 0,
    },
  });

  return data!.getMoviesPersons;
};

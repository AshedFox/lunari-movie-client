import { getClient } from '@lib/apollo/rsc-client';
import {
  GetMoviesDocument,
  GetPopularMoviesDocument,
  MovieFilter,
  MovieSort,
} from '@lib/graphql/generated/graphql';

export const DEFAULT_PAGE_SIZE = 20;

export const getMovies = async (
  filter: MovieFilter,
  page: number,
  sort: MovieSort,
) => {
  const { data } = await getClient().query({
    query: GetMoviesDocument,
    variables: {
      limit: DEFAULT_PAGE_SIZE,
      offset: (page - 1) * DEFAULT_PAGE_SIZE,
      sort,
      filter,
    },
    context: { skipAuth: true },
  });

  return data!.getMoviesOffset;
};

export const getPopularMovies = async (page?: number) => {
  const { data } = await getClient().query({
    query: GetPopularMoviesDocument,
    variables: {
      offset: page ? (page - 1) * DEFAULT_PAGE_SIZE : 0,
      limit: DEFAULT_PAGE_SIZE,
    },
    context: { skipAuth: true },
  });

  return data!.getMoviesOffset;
};

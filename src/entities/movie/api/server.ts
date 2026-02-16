import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  GetMoviesDocument,
  GetPopularMoviesDocument,
  MovieFilter,
  MovieSort,
} from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';
import { DEFAULT_PAGE_SIZE } from '../config';

export const getMovies = async (
  filter?: MovieFilter,
  page?: number,
  sort?: MovieSort,
) => {
  'use cache';
  cacheLife('hours');
  cacheTag('movies');

  const { data } = await getClient().query({
    query: GetMoviesDocument,
    variables: {
      limit: DEFAULT_PAGE_SIZE,
      offset: page ? (page - 1) * DEFAULT_PAGE_SIZE : 0,
      sort,
      filter,
    },
    context: { skipAuth: true },
  });

  return data!.getMoviesOffset;
};

export const getPopularMovies = async (page?: number) => {
  'use cache';
  cacheLife('hours');
  cacheTag('movies-popular');

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

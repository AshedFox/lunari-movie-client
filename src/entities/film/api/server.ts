import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  FilmFilter,
  FilmSort,
  GetFilmDocument,
  GetFilmsDocument,
  GetWatchFilmDocument,
  GetFilmTabsInfoDocument,
} from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';
import { DEFAULT_PAGE_SIZE } from '../config';

export const getFilm = async (id: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(`films-${id}`);
  cacheTag(`movies-${id}`);

  const { data } = await getClient().query({
    query: GetFilmDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getFilm;
};

export const getWatchFilm = async (id: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(`films-${id}`);
  cacheTag(`movies-${id}`);

  const { data } = await getClient().query({
    query: GetWatchFilmDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getFilm;
};

export const getFilms = async (
  filter?: FilmFilter,
  page?: number,
  sort?: FilmSort,
) => {
  'use cache';
  cacheLife('hours');
  cacheTag('films');

  const { data } = await getClient().query({
    query: GetFilmsDocument,
    variables: {
      limit: DEFAULT_PAGE_SIZE,
      offset: page ? (page - 1) * DEFAULT_PAGE_SIZE : 0,
      sort,
      filter,
    },
    context: { skipAuth: true },
  });

  return data!.getFilms;
};

export const getFilmTabsInfo = async (id: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(`films-${id}`);
  cacheTag(`movies-${id}`);

  const { data } = await getClient().query({
    query: GetFilmTabsInfoDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getFilm;
};

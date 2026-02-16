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
import { DEFAULT_PAGE_SIZE } from '../config';

export const getFilm = async (id: string) => {
  const { data } = await getClient().query({
    query: GetFilmDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getFilm;
};

export const getWatchFilm = async (id: string) => {
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
  const { data } = await getClient().query({
    query: GetFilmTabsInfoDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getFilm;
};

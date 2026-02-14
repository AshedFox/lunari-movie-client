import { getClient } from '@lib/apollo/rsc-client';
import {
  FilmFilter,
  FilmSort,
  GetFilmDocument,
  GetFilmsDocument,
  GetWatchFilmDocument,
} from '@lib/graphql/generated/graphql';

export const DEFAULT_PAGE_SIZE = 20;

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

import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { getClient } from '@shared/api/apollo/server';
import { GetAllGenresDocument, GenreSort } from '@shared/api/graphql/graphql';

export const getGenres = async (sort?: GenreSort) => {
  'use cache';
  cacheLife('weeks');
  cacheTag('genres');

  const { data } = await getClient().query({
    query: GetAllGenresDocument,
    variables: { sort },
    context: { skipAuth: true },
  });

  return data!.getAllGenres;
};

import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetAllGenresDocument, GenreSort } from '@shared/api/graphql/graphql';

export const getGenres = async (sort?: GenreSort) => {
  const { data } = await getClient().query({
    query: GetAllGenresDocument,
    variables: { sort },
    context: { skipAuth: true },
  });

  return data!.getAllGenres;
};

import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetCollectionMoviesDocument } from '@shared/api/graphql/graphql';
import { DEFAULT_LIMIT } from '../config';

export const getCollectionMovies = async (
  collectionId: string,
  cursor?: string,
  limit: number = DEFAULT_LIMIT,
) => {
  const { data } = await getClient().query({
    query: GetCollectionMoviesDocument,
    variables: {
      collectionId,
      limit,
      cursor,
    },
    context: { skipAuth: true },
  });

  return data!.getMoviesRelay;
};

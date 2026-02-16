import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetTrailersDocument } from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';

export const getTrailers = async (
  movieId: string,
  limit: number,
  offset: number,
) => {
  'use cache';
  cacheLife('hours');
  cacheTag(`movies-${movieId}-trailers`);

  const { data } = await getClient().query({
    query: GetTrailersDocument,
    variables: {
      movieId,
      limit,
      offset,
    },
  });

  return data!.getTrailers;
};

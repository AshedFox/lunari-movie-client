import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetTrailersDocument } from '@shared/api/graphql/graphql';

export const getTrailers = async (
  movieId: string,
  limit: number,
  offset: number,
) => {
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

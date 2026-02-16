import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { TrackMovieVisitDocument } from '@shared/api/graphql/graphql';

export const trackMovieVisit = async (movieId: string) => {
  const { data } = await getClient().mutate({
    mutation: TrackMovieVisitDocument,
    variables: {
      movieId,
    },
  });

  return data!.trackMovieVisit;
};

import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetWatchEpisodeDocument } from '@shared/api/graphql/graphql';

export const getWatchEpisode = async (id: string, numberInSeries: number) => {
  const { data } = await getClient().query({
    query: GetWatchEpisodeDocument,
    variables: { seriesId: id, numberInSeries },
    context: { skipAuth: true },
  });

  return data!.getEpisodeBySeriesAndNum;
};

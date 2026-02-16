import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { GetWatchEpisodeDocument } from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';

export const getWatchEpisode = async (id: string, numberInSeries: number) => {
  'use cache';
  cacheLife('hours');
  cacheTag(`series-${id}-episodes-${numberInSeries}`);

  const { data } = await getClient().query({
    query: GetWatchEpisodeDocument,
    variables: { seriesId: id, numberInSeries },
    context: { skipAuth: true },
  });

  return data!.getEpisodeBySeriesAndNum;
};

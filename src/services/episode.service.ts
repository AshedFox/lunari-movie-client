import { getClient } from '@lib/apollo/rsc-client';
import { GetWatchEpisodeDocument } from '@lib/graphql/generated/graphql';

export const getWatchEpisode = async (id: string, numberInSeries: number) => {
  const { data } = await getClient().query({
    query: GetWatchEpisodeDocument,
    variables: { seriesId: id, numberInSeries },
    context: { skipAuth: true },
  });

  return data!.getEpisodeBySeriesAndNum;
};

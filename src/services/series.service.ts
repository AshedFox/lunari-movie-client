import { getClient } from '@lib/apollo/rsc-client';
import {
  GetOneSeriesDocument,
  GetSeriesListDocument,
  SeriesFilter,
  SeriesSort,
} from '@lib/graphql/generated/graphql';

export const DEFAULT_PAGE_SIZE = 20;

export const getOneSeries = async (id: string) => {
  const { data } = await getClient().query({
    query: GetOneSeriesDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getOneSeries;
};

export const getSeriesList = async (
  filter?: SeriesFilter,
  page?: number,
  sort?: SeriesSort,
) => {
  const { data } = await getClient().query({
    query: GetSeriesListDocument,
    variables: {
      limit: DEFAULT_PAGE_SIZE,
      offset: page ? (page - 1) * DEFAULT_PAGE_SIZE : 0,
      sort,
      filter,
    },
    context: { skipAuth: true },
  });

  return data!.getManySeries;
};

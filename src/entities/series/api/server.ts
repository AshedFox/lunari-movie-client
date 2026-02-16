import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  GetOneSeriesDocument,
  GetSeriesListDocument,
  GetSeriesTabsInfoDocument,
  SeriesFilter,
  SeriesSort,
} from '@shared/api/graphql/graphql';
import { DEFAULT_PAGE_SIZE } from '../config';

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

export const getSeriesTabsInfo = async (id: string) => {
  const { data } = await getClient().query({
    query: GetSeriesTabsInfoDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getOneSeries;
};

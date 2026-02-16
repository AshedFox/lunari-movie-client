import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  GetAllStudiosDocument,
  GetStudiosDocument,
  StudioFilter,
  StudioSort,
} from '@shared/api/graphql/graphql';
import { DEFAULT_PAGE_SIZE } from '../config';

export const getStudios = async (
  filter?: StudioFilter,
  page?: number,
  sort?: StudioSort,
) => {
  const { data } = await getClient().query({
    query: GetStudiosDocument,
    variables: {
      filter,
      limit: DEFAULT_PAGE_SIZE,
      offset: page ? (page - 1) * DEFAULT_PAGE_SIZE : 0,
      sort,
    },
    context: { skipAuth: true },
  });

  return data!.getStudios;
};

export const getAllStudios = async (
  filter?: StudioFilter,
  sort?: StudioSort,
) => {
  const { data } = await getClient().query({
    query: GetAllStudiosDocument,
    variables: { filter, sort },
    context: { skipAuth: true },
  });

  return data!.getAllStudios;
};

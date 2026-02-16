import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  CollectionFilter,
  CollectionSort,
  GetCollectionDocument,
  GetCollectionsDocument,
  GetCollectionTabsInfoDocument,
} from '@shared/api/graphql/graphql';
import { DEFAULT_PAGE_SIZE } from '../config';

export const getCollection = async (id: number) => {
  const { data } = await getClient().query({
    query: GetCollectionDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getCollection;
};

export const getCollections = async (
  filter?: CollectionFilter,
  page?: number,
  sort?: CollectionSort,
) => {
  const { data } = await getClient().query({
    query: GetCollectionsDocument,
    variables: {
      limit: DEFAULT_PAGE_SIZE,
      offset: page ? (page - 1) * DEFAULT_PAGE_SIZE : 0,
      sort,
      filter,
    },
    context: { skipAuth: true },
  });

  return data!.getCollections;
};

export const getUserCollections = async (
  userId: string,
  filter?: CollectionFilter,
  page?: number,
  sort?: CollectionSort,
) => {
  const { data } = await getClient().query({
    query: GetCollectionsDocument,
    variables: {
      limit: DEFAULT_PAGE_SIZE,
      offset: page ? (page - 1) * DEFAULT_PAGE_SIZE : 0,
      filter: { ...filter, ownerId: { eq: userId } },
      sort,
    },
    context: { skipAuth: true },
  });

  return data!.getCollections;
};

export const getCollectionTabsInfo = async (id: number) => {
  const { data } = await getClient().query({
    query: GetCollectionTabsInfoDocument,
    variables: { id },
    context: { skipAuth: true },
  });

  return data!.getCollection;
};

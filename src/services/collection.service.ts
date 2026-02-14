import { getClient } from '@lib/apollo/rsc-client';
import {
  CollectionFilter,
  CollectionSort,
  GetCollectionDocument,
  GetCollectionsDocument,
} from '@lib/graphql/generated/graphql';

export const DEFAULT_PAGE_SIZE = 20;

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

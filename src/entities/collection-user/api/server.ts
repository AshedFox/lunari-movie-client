import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  CollectionUserFragment,
  GetCollectionUserDocument,
} from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';

export const getCollectionUser = async (
  userId: string,
  collectionId: number,
): Promise<CollectionUserFragment | null> => {
  'use cache';
  cacheLife('hours');
  cacheTag(`collections-${collectionId}-users-${userId}`);

  const { data } = await getClient().query({
    query: GetCollectionUserDocument,
    variables: { collectionId, userId },
    context: { skipAuth: true },
  });

  return data!.getCollectionUser;
};

export const fetchCollectionUser = async (
  userId: string,
  collectionId: number,
): Promise<CollectionUserFragment | null> => {
  'use cache';
  cacheLife('hours');
  cacheTag(`collections-${collectionId}-users-${userId}`);

  try {
    const { data } = await getClient().query({
      query: GetCollectionUserDocument,
      variables: { collectionId, userId },
      context: { skipAuth: true },
    });

    return data!.getCollectionUser;
  } catch {
    return null;
  }
};

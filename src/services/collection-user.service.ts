import { getClient } from '@lib/apollo/rsc-client';
import {
  CollectionUserFragment,
  GetCollectionUserDocument,
} from '@lib/graphql/generated/graphql';

export const getCollectionUser = async (
  userId: string,
  collectionId: number,
): Promise<CollectionUserFragment | null> => {
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

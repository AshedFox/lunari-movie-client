import { getClient } from '@lib/apollo/rsc-client';
import {
  CollectionFragment,
  GetCollectionDocument,
  CollectionUserFragment,
  GetCollectionUserDocument,
} from '@lib/graphql/generated/graphql';

export const getCollection = async (
  id: number,
): Promise<CollectionFragment> => {
  const { data } = await getClient().query({
    query: GetCollectionDocument,
    variables: {
      id,
    },
  });

  return data.getCollection;
};

export const getCollectionUser = async (
  userId: string,
  collectionId: number,
): Promise<CollectionUserFragment | null> => {
  const { data } = await getClient().query({
    query: GetCollectionUserDocument,
    variables: {
      collectionId,
      userId,
    },
    errorPolicy: 'all',
  });

  return data?.getCollectionUser ?? null;
};

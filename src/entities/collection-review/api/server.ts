import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  CollectionReviewSort,
  GetCollectionReviewsDocument,
  HasCollectionReviewDocument,
} from '@shared/api/graphql/graphql';
import { DEFAULT_LIMIT } from '../config';

export const hasCollectionReview = async (collectionId: number) => {
  const { data } = await getClient().query({
    query: HasCollectionReviewDocument,
    variables: { collectionId },
  });

  return data!.hasCollectionReview;
};

export const getCollectionReviews = async (
  collectionId: number,
  cursor?: string,
  limit: number = DEFAULT_LIMIT,
  sort?: CollectionReviewSort,
) => {
  const { data } = await getClient().query({
    query: GetCollectionReviewsDocument,
    variables: { collectionId, limit, cursor, sort },
  });

  return data!.getCollectionsReviewsRelay;
};

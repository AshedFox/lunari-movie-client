import { getClient } from '@lib/apollo/rsc-client';
import { HasCollectionReviewDocument } from '@lib/graphql/generated/graphql';

export const hasCollectionReview = async (collectionId: number) => {
  const { data } = await getClient().query({
    query: HasCollectionReviewDocument,
    variables: { collectionId },
  });

  return data!.hasCollectionReview;
};

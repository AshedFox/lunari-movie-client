import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  CreateCollectionReviewDocument,
  CreateCollectionReviewInput,
} from '@shared/api/graphql/graphql';

export const createCollectionReview = async (
  input: CreateCollectionReviewInput,
) => {
  const { data } = await getClient().mutate({
    mutation: CreateCollectionReviewDocument,
    variables: { input },
  });

  return data!.createCollectionReview;
};

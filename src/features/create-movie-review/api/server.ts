import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  CreateMovieReviewDocument,
  CreateMovieReviewInput,
} from '@shared/api/graphql/graphql';

export const createMovieReview = async (input: CreateMovieReviewInput) => {
  const { data } = await getClient().mutate({
    mutation: CreateMovieReviewDocument,
    variables: { input },
  });

  return data!.createMovieReview;
};

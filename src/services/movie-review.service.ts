import { getClient } from '@lib/apollo/rsc-client';
import { HasMovieReviewDocument } from '@lib/graphql/generated/graphql';

export const hasMovieReview = async (movieId: string) => {
  const { data } = await getClient().query({
    query: HasMovieReviewDocument,
    variables: { movieId },
  });

  return data!.hasMovieReview;
};

'use client';

import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Button } from '@components/ui/button';
import { GetMovieReviewsQuery } from '@lib/graphql/generated/graphql';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { MovieReviewListItem } from './MovieReviewListItem';

type Props = {
  movieId: string;
  userId?: string;
  queryRef: QueryRef<GetMovieReviewsQuery>;
};

const MovieReviewsLoadableList = ({ movieId, userId, queryRef }: Props) => {
  const [isLoadingTransition, startTransition] = useTransition();
  const { data } = useReadQuery(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);

  const reviews = data.getMoviesReviewsRelay.edges.map((edge) => edge.node);
  const hasMore = data.getMoviesReviewsRelay.pageInfo.hasNextPage;

  if (reviews.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No reviews...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {reviews.length > 0 &&
        reviews.map((review) => (
          <MovieReviewListItem
            key={review.id}
            review={review}
            userId={userId}
          />
        ))}
      {hasMore && (
        <Button
          variant="outline"
          onClick={() => {
            startTransition(async () => {
              await fetchMore({
                variables: {
                  limit: 20,
                  movieId,
                  cursor:
                    reviews.length > 0
                      ? reviews[reviews.length - 1].id
                      : undefined,
                },
              });
            });
          }}
        >
          {isLoadingTransition && <Loader2 className="animate-spin" />}
          Load more
        </Button>
      )}
    </div>
  );
};

export { MovieReviewsLoadableList };

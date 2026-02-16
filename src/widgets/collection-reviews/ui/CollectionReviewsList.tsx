'use client';

import {
  QueryRef,
  useQueryRefHandlers,
  useReadQuery,
} from '@apollo/client/react';
import { CollectionReviewListItem } from '@entities/collection-review';
import { GetCollectionReviewsQuery } from '@shared/api/graphql/graphql';
import { Button } from '@shared/ui/button';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';

type Props = {
  collectionId: number;
  userId?: string;
  queryRef: QueryRef<GetCollectionReviewsQuery>;
};

export const CollectionReviewsList = ({
  collectionId,
  userId,
  queryRef,
}: Props) => {
  const [isLoadingTransition, startTransition] = useTransition();
  const { data } = useReadQuery(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);

  const reviews = data.getCollectionsReviewsRelay.edges.map(
    (edge) => edge.node,
  );
  const hasMore = data.getCollectionsReviewsRelay.pageInfo.hasNextPage;

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
          <CollectionReviewListItem
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
                  collectionId,
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

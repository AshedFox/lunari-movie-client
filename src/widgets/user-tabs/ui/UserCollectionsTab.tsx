'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import { CollectionCard } from '@entities/collection';
import { GetCollectionsDocument } from '@shared/api/graphql/graphql';
import { InfiniteScrollLoader } from '@shared/ui/infinite-scroll';
import { useTransition } from 'react';

interface UserCollectionsTabProps {
  userId: string;
}

export function UserCollectionsTab({ userId }: UserCollectionsTabProps) {
  const { data, fetchMore } = useSuspenseQuery(GetCollectionsDocument, {
    variables: { limit: 20, offset: 0, filter: { ownerId: { eq: userId } } },
  });
  const [isPending, startTransition] = useTransition();

  const collections = data?.getCollections.nodes || [];
  const totalCount = data?.getCollections.pageInfo.totalCount || 0;
  const hasNextPage = collections.length < totalCount;

  const handleLoadMore = () => {
    if (isPending || !hasNextPage) {
      return;
    }

    startTransition(() => {
      fetchMore({
        variables: {
          offset: collections.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            getCollections: {
              ...fetchMoreResult.getCollections,
              nodes: [
                ...prev.getCollections.nodes,
                ...fetchMoreResult.getCollections.nodes,
              ],
            },
          };
        },
      });
    });
  };

  if (collections.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No collections yet.
      </div>
    );
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-1 @md:grid-cols-2 gap-4 py-4">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
      <InfiniteScrollLoader
        onLoadMore={handleLoadMore}
        hasNextPage={hasNextPage}
        isLoading={isPending}
      />
    </div>
  );
}

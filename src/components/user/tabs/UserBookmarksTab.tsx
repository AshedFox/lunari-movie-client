'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import { GetUserBookmarksDocument } from '@lib/graphql/generated/graphql';
import { MovieCard } from '@components/movie/card';
import { InfiniteScrollLoader } from '@components/ui/infinite-scroll';
import { useTransition } from 'react';

interface UserBookmarksTabProps {
  userId: string;
}

export function UserBookmarksTab({ userId }: UserBookmarksTabProps) {
  const { data, fetchMore } = useSuspenseQuery(GetUserBookmarksDocument, {
    variables: { userId, limit: 20, offset: 0 },
  });
  const [isPending, startTransition] = useTransition();

  const movies = data?.getMoviesUsers.nodes.map((node) => node.movie) || [];
  const pageInfo = data?.getMoviesUsers.pageInfo;

  const handleLoadMore = () => {
    if (isPending || !pageInfo?.hasNextPage) {
      return;
    }

    startTransition(() => {
      fetchMore({
        variables: {
          offset: movies.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            getMoviesUsers: {
              ...fetchMoreResult.getMoviesUsers,
              nodes: [
                ...prev.getMoviesUsers.nodes,
                ...fetchMoreResult.getMoviesUsers.nodes,
              ],
            },
          };
        },
      });
    });
  };

  if (movies.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No bookmarks yet.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} item={movie} />
        ))}
      </div>
      <InfiniteScrollLoader
        onLoadMore={handleLoadMore}
        hasNextPage={pageInfo?.hasNextPage ?? false}
        isLoading={isPending}
      />
    </>
  );
}

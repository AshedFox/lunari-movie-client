'use client';

import {
  QueryRef,
  useQueryRefHandlers,
  useReadQuery,
} from '@apollo/client/react';
import { MovieListItem } from '@entities/movie';
import { GetCollectionMoviesQuery } from '@shared/api/graphql/graphql';
import { Button } from '@shared/ui/button';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';

type Props = {
  collectionId: number;
  queryRef: QueryRef<GetCollectionMoviesQuery>;
};

export const CollectionMoviesList = ({ collectionId, queryRef }: Props) => {
  const [isLoadingTransition, startTransition] = useTransition();
  const { data } = useReadQuery(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);

  const movies = data.getMoviesRelay.edges.map((edge) => edge.node);
  const hasMore = data.getMoviesRelay.pageInfo.hasNextPage;

  if (movies.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No movies...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
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
                    movies.length > 0
                      ? movies[movies.length - 1].id
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

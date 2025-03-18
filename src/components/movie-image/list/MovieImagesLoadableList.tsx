'use client';

import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { GetMovieImagesQuery } from '@lib/graphql/generated/graphql';
import { useTransition } from 'react';
import { Button } from '@components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

type Props = {
  queryRef: QueryRef<GetMovieImagesQuery>;
  movieId: string;
};

const MovieImagesLoadableList = ({ movieId, queryRef }: Props) => {
  const [isLoadingTransition, startTransition] = useTransition();
  const { data } = useReadQuery(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);

  const movieImages = data.getMoviesImages.nodes;
  const hasMore = data.getMoviesImages.pageInfo.hasNextPage;

  if (movieImages.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No movie images...
      </div>
    );
  }

  return (
    <div className="flex gap-8 items-center">
      {movieImages.map((movieImage) => (
        <div
          key={movieImage.id}
          className="aspect-video overflow-hidden h-48 relative"
        >
          <Image
            className="object-cover w-full h-full"
            src={movieImage.image?.url}
            fill
            alt="movie image"
          />
          {movieImage.type && (
            <div className="absolute top-2 left-2 rounded-lg bg-background/60 text-sm font-semibold px-2 py-1 backdrop-blur-lg">
              {movieImage.type?.name}
            </div>
          )}
        </div>
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
                  offset: movieImages.length,
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

export { MovieImagesLoadableList };

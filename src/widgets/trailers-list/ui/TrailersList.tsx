'use client';

import {
  QueryRef,
  useReadQuery,
  useQueryRefHandlers,
} from '@apollo/client/react';
import { VideoPlayer } from '@shared/ui/video-player';
import { Button } from '@shared/ui/button';
import { Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { GetTrailersQuery, TrailerFragment } from '@shared/api/graphql/graphql';

type Props = {
  queryRef: QueryRef<GetTrailersQuery>;
  movieId: string;
};

export const TrailersList = ({ movieId, queryRef }: Props) => {
  const [isLoadingTransition, startTransition] = useTransition();
  const { data } = useReadQuery(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);

  const trailers = data.getTrailers.nodes;
  const hasMore = data.getTrailers.pageInfo.hasNextPage;

  const [selectedTrailer, setSelectedTrailer] = useState<TrailerFragment>(
    trailers[0],
  );

  if (trailers.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No trailers...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-8 items-center justify-center">
        {selectedTrailer && (
          <VideoPlayer
            className="aspect-video max-h-144 max-w-[min(100%,calc(var(--spacing)*224))]"
            title={selectedTrailer.title ?? undefined}
            videoUrl={selectedTrailer.video.dashManifestMedia?.url}
          />
        )}
      </div>
      <div className="flex items-center gap-3">
        {trailers.map((trailer, i) => (
          <Button
            variant={
              trailer.id === selectedTrailer?.id ? 'secondary' : 'outline'
            }
            disabled={trailer.id === selectedTrailer?.id}
            key={trailer.id}
            onClick={() => setSelectedTrailer(trailer)}
          >
            {trailer.title ?? `Trailer #${i}`}
          </Button>
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
                    offset: trailers.length,
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
    </div>
  );
};

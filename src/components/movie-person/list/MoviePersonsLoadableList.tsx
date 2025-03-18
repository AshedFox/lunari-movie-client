'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { GetMoviePersonsQuery } from '@lib/graphql/generated/graphql';
import { useTransition } from 'react';
import { Button } from '@components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
  queryRef: QueryRef<GetMoviePersonsQuery>;
  movieId: string;
};

const MoviePersonsLoadableList = ({ movieId, queryRef }: Props) => {
  const [isLoadingTransition, startTransition] = useTransition();
  const { data } = useReadQuery(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);

  const moviePersons = data.getMoviesPersons.nodes;
  const hasMore = data.getMoviesPersons.pageInfo.hasNextPage;

  if (moviePersons.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No movie persons...
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      {moviePersons.map((moviePerson) => (
        <div
          key={moviePerson.id}
          className="flex flex-col items-center gap-1.5"
        >
          <Avatar className="aspect-square shrink rounded-full overflow-hidden size-28 text-xl font-bold border">
            <AvatarImage
              className="object-cover w-full h-full"
              src={moviePerson.person.image?.url}
            />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col items-center">
            <h3 className="font-medium">{moviePerson.person.name}</h3>
            {moviePerson.role && (
              <p className="text-xs text-muted-foreground">
                {moviePerson.role}
              </p>
            )}
          </div>
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
                  offset: moviePersons.length,
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

export { MoviePersonsLoadableList };

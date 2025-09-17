'use client';

import { useMutation } from '@apollo/client/react';
import { Button } from '@components/ui/button';
import {
  CreateMovieUserDocument,
  MovieUserFragment,
  UpdateMovieUserDocument,
} from '@lib/graphql/generated/graphql';
import { cn } from '@lib/utils';
import { Eye, Bookmark, Heart } from 'lucide-react';
import { useMemo, useTransition } from 'react';

type Props = {
  movieUser: MovieUserFragment | null;
  movieId: string;
};

const MovieListsButtons = ({ movieUser, movieId }: Props) => {
  const [createMovieUser, { data: createData }] = useMutation(
    CreateMovieUserDocument,
  );
  const [updateMovieUser, { data: updateData }] = useMutation(
    UpdateMovieUserDocument,
  );
  const [isLoadingTransition, startTransition] = useTransition();

  const currentMovieUser = useMemo(
    () =>
      updateData?.updateMovieUser || createData?.createMovieUser || movieUser,
    [createData?.createMovieUser, movieUser, updateData?.updateMovieUser],
  );

  const handleClick = async (
    type: 'isWatched' | 'isBookmarked' | 'isFavorite',
  ) => {
    startTransition(async () => {
      if (!currentMovieUser) {
        await createMovieUser({
          variables: {
            input: {
              movieId,
              [type]: true,
            },
          },
        });
      } else {
        await updateMovieUser({
          variables: {
            input: {
              [type]: !currentMovieUser[type],
            },
            movieId,
            userId: currentMovieUser.userId,
          },
        });
      }
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="outline"
        disabled={isLoadingTransition}
        onClick={async () => await handleClick('isWatched')}
      >
        <Eye
          size={20}
          className={cn({
            'text-green-600': currentMovieUser?.isWatched,
          })}
        />
      </Button>
      <Button
        size="icon"
        variant="outline"
        disabled={isLoadingTransition}
        onClick={async () => await handleClick('isBookmarked')}
      >
        <Bookmark
          size={20}
          className={cn({
            'fill-current text-amber-600': currentMovieUser?.isBookmarked,
          })}
        />
      </Button>
      <Button
        size="icon"
        variant="outline"
        disabled={isLoadingTransition}
        onClick={async () => await handleClick('isFavorite')}
      >
        <Heart
          size={20}
          className={cn({
            'fill-current text-pink-600': currentMovieUser?.isFavorite,
          })}
        />
      </Button>
    </div>
  );
};

export { MovieListsButtons };

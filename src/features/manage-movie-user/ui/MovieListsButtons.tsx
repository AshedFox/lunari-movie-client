'use client';

import { Button } from '@shared/ui/button';
import { cn } from '@shared/lib/utils';
import { Eye, Bookmark, Heart } from 'lucide-react';
import { useState, useTransition } from 'react';
import { MovieUserFragment } from '@shared/api/graphql/graphql';
import { createMovieUserAction, updateMovieUserAction } from '../api/actions';

type Props = {
  movieUser: MovieUserFragment | null;
  movieId: string;
};

export const MovieListsButtons = ({ movieUser, movieId }: Props) => {
  const [isLoadingTransition, startTransition] = useTransition();
  const [currentMovieUser, setCurrentMovieUser] = useState(movieUser);

  const handleClick = async (
    type: 'isWatched' | 'isBookmarked' | 'isFavorite',
  ) => {
    startTransition(async () => {
      if (!currentMovieUser) {
        const data = await createMovieUserAction({
          movieId,
          [type]: true,
        });
        setCurrentMovieUser(data);
      } else {
        const data = await updateMovieUserAction(
          currentMovieUser.userId,
          movieId,
          { [type]: !currentMovieUser[type] },
        );
        setCurrentMovieUser(data);
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

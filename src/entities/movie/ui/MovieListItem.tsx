import {
  FilmListItemFragment,
  SeriesListItemFragment,
} from '@shared/api/graphql/graphql';
import { Film, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getMovieHref } from '../lib';
import { RatingBadge } from '@shared/ui/rating-badge';

import { Badge } from '@shared/ui/badge';
import { MovieReleaseBadge } from './MovieReleaseBadge';

type Props = {
  movie: FilmListItemFragment | SeriesListItemFragment;
};

export const MovieListItem = ({ movie }: Props) => {
  const isSeries = movie.__typename === 'Series';

  const href = getMovieHref(movie.id, movie.__typename);

  const MovieIcon = isSeries ? Tv : Film;

  return (
    <div className="grid rounded-lg border grid-cols-[auto_1fr] auto-rows-fr overflow-hidden @container">
      <div className="relative w-36 @md:w-44">
        {movie.cover ? (
          <Image
            src={movie.cover?.url}
            alt="cover"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <MovieIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 py-3 px-5">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl truncate">
            <Link
              href={href}
              className="hover:text-muted-foreground transition-colors"
            >
              {movie.title}
            </Link>
          </h2>
          <Badge variant="secondary" size="md">
            <MovieIcon />
          </Badge>
        </div>

        <div className="line-clamp-3 text-sm text-muted-foreground">
          {movie.description}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <RatingBadge rating={movie.rating} />
          <MovieReleaseBadge movie={movie} />
        </div>
      </div>
    </div>
  );
};

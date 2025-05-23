import {
  FilmListItemFragment,
  SeriesListItemFragment,
} from '@lib/graphql/generated/graphql';
import { formatDateTime, formatDateTimeRange } from '@lib/utils/format';
import { Clock, Film, Star, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  movie: FilmListItemFragment | SeriesListItemFragment;
};

export const MovieListItem = ({ movie }: Props) => {
  const href =
    movie.__typename === 'Film' ? `/films/${movie.id}` : `/series/${movie.id}`;

  const releaseDate =
    movie.__typename === 'Film'
      ? movie.releaseDate && formatDateTime(movie.releaseDate, 'date', 'long')
      : formatDateTimeRange(
          movie.startReleaseDate,
          movie.endReleaseDate,
          'date',
          'long',
        );

  return (
    <div className="grid rounded-lg border grid-cols-[auto_1fr] auto-rows-fr overflow-hidden">
      {movie.cover && (
        <div className="relative w-36 md:w-44">
          <Image
            src={movie.cover?.url}
            alt="cover"
            fill
            className="object-cover"
          />
        </div>
      )}
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
          {movie.__typename === 'Film' ? (
            <div title="film">
              <Film size={20} />
            </div>
          ) : (
            <div title="series">
              <Tv size={20} />
            </div>
          )}
        </div>

        <div className="line-clamp-3 text-sm text-muted-foreground">
          {movie.description}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1 font-semibold">
            <Star size={12} className="text-yellow-500" fill="currentColor" />
            {movie.rating}
          </span>
          {releaseDate && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock size={12} />
              {releaseDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

'use client';

import { FilmMiniCardFragment } from '@lib/graphql/generated/graphql';
import { cn } from '@lib/utils';
import { formatDateTime } from '@lib/utils/format';
import { Film, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  film: FilmMiniCardFragment;
};

const FilmMiniCard = ({ film }: Props) => {
  const releaseDate = film.releaseDate && formatDateTime(film.releaseDate);

  return (
    <Link href={`/films/${film.id}`}>
      <article className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col group">
        {/* Main info */}
        <div className="relative aspect-video">
          {/* Cover */}
          {film.cover && (
            <Image
              className="object-cover"
              fill
              src={film.cover?.url}
              alt={`Cover ${film.title}`}
            />
          )}
          <div
            className={cn('absolute inset-0', {
              'bg-gradient-to-b via-transparent via-45% to-card group-hover:via-card/50 transition-colors duration-300':
                film.cover,
              'bg-muted/50': !film.cover,
            })}
          />

          {/* Information over the cover */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              {/* Rating */}
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/40 text-primary-foreground backdrop-blur rounded-md font-semibold text-sm">
                <Star
                  className="text-yellow-500"
                  fill="currentColor"
                  size={16}
                />
                {film.rating === 0 ? '-' : film.rating.toFixed(1)}
              </div>

              {/* Age restriction */}
              <div className="text-sm font-semibold bg-red-600/60 text-primary-foreground rounded-md backdrop-blur px-2 py-1">
                {film.ageRestriction}
              </div>
            </div>

            <div>
              {/* Title */}
              <div
                className={cn(
                  'flex justify-between transition-transform group-hover:translate-y-0 duration-300',
                  film.genres.length > 0
                    ? 'translate-y-[150%]'
                    : 'translate-y-[50%]',
                )}
              >
                <h2 className={'text-2xl font-bold w-fit'}>{film.title}</h2>
                <div title="series">
                  <Film size={24} />
                </div>
              </div>
              <div className="transition-transform translate-y-[200%] group-hover:translate-y-0 duration-300">
                {/* Release date */}
                {releaseDate && (
                  <div className="text-muted-foreground text-sm">
                    {releaseDate}
                  </div>
                )}

                {/* Genres */}
                {film.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {film.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-secondary text-xs px-3 py-1 rounded-xl"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export { FilmMiniCard };

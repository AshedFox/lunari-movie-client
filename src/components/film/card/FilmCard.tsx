'use client';

import { FilmListItemFragment } from '@lib/graphql/generated/graphql';
import { ISODateToLocale } from '@lib/utils/format';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  film: FilmListItemFragment;
};

const FilmCard = ({ film }: Props) => {
  const releaseDate = ISODateToLocale(film.releaseDate);

  return (
    <article className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col">
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
        <div className="absolute inset-0 bg-gradient-to-b via-transparent via-45% to-card" />

        {/* Information over the cover */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            {/* Rating */}
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/40 text-primary-foreground backdrop-blur rounded-md font-semibold text-sm">
              <Star className="text-yellow-500" fill="currentColor" size={16} />
              {film.rating === 0 ? '-' : film.rating.toFixed(1)}
            </div>

            {/* Age restriction */}
            <div className="text-sm font-semibold bg-red-600/60 text-primary-foreground rounded-md backdrop-blur px-2 py-1">
              {film.ageRestriction}
            </div>
          </div>

          <div>
            {/* Title */}
            <h2 className="text-2xl font-bold w-fit">
              <Link href={`/films/${film.id}`}>{film.title}</Link>
            </h2>

            {/* Release date */}
            {releaseDate && (
              <div className="text-muted-foreground text-sm">{releaseDate}</div>
            )}
          </div>
        </div>
      </div>

      {/* Other info*/}
      <div className="px-6 py-4 space-y-4 flex-1 flex flex-col">
        {/* Description */}
        <div className="flex-1">
          <p className="text-muted-foreground text-sm line-clamp-4">
            {film.description}
          </p>
        </div>

        {/* Genres */}
        {film.genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
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

        {/* Other */}
        <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          {/* Studios */}
          {film.studios.length > 0 && (
            <div className="space-y-1">
              <p className="text-muted-foreground/65">Studios</p>
              <p>{film.studios.map((studio) => studio.name).join(', ')}</p>
            </div>
          )}

          {/* Countries */}
          {film.countries.length > 0 && (
            <div className="space-y-1">
              <p className="text-muted-foreground/65">Countries</p>
              <p>{film.countries.map((country) => country.name).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export { FilmCard };

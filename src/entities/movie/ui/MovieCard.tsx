import { Badge } from '@shared/ui/badge';
import { ScrollArea, ScrollBar } from '@shared/ui/scroll-area';
import { Film, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FilmListItemFragment,
  SeriesListItemFragment,
} from '@shared/api/graphql/graphql';

import { RatingBadge } from '@shared/ui/rating-badge';
import { getMovieHref, getAgeColor } from '../lib';
import { cn } from '@shared/lib/utils';
import { MovieReleaseBadge } from './MovieReleaseBadge';

type Props = {
  item: FilmListItemFragment | SeriesListItemFragment;
  className?: string;
};

export const MovieCard = ({ item, className }: Props) => {
  const isSeries = item.__typename === 'Series';
  const series = isSeries ? (item as SeriesListItemFragment) : null;

  const href = getMovieHref(item.id, item.__typename);

  const NoImageIcon = isSeries ? Tv : Film;

  return (
    <article
      className={cn(
        'bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col h-full group',
        className,
      )}
    >
      {/* Cover */}
      <Link
        href={href}
        className="relative aspect-[2/3] bg-muted overflow-hidden"
      >
        {item.cover ? (
          <Image
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            src={item.cover.url}
            alt={`Cover ${item.title}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <NoImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-0 left-0 p-4 flex w-full gap-2 z-10 justify-between">
          {/* Rating */}
          {!!item.rating && <RatingBadge rating={item.rating} />}
          {/* Age restriction */}
          {item.ageRestriction && (
            <Badge variant={getAgeColor(item.ageRestriction)}>
              {item.ageRestriction}
            </Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="px-5 py-4 flex-1 flex flex-col gap-3">
        {/* Header */}
        <div className="space-y-1">
          {/* Title */}
          <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
            <Link href={href}>{item.title}</Link>
          </h2>

          {/* Release date */}
          <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
            <MovieReleaseBadge movie={item} />

            {/* Series-specific counts */}
            {series && (
              <div>
                {(!!series.seasonsCount || !!series.episodesCount) && (
                  <span>•</span>
                )}
                {!!series.seasonsCount && <span>{series.seasonsCount} s</span>}
                {!!series.episodesCount && (
                  <span>{series.episodesCount} ep</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Genres */}
        {item.genres.length > 0 && (
          <ScrollArea>
            <div className="flex gap-1">
              {item.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {/* Other Info */}
        {(item.studios.length > 0 || item.countries.length > 0) && (
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground pt-2 border-t">
            {/* Studios */}
            {item.studios.length > 0 && (
              <div className="space-y-1">
                <p className="text-muted-foreground/65">Studios</p>
                <ScrollArea>
                  <div className="flex gap-1">
                    {item.studios.map((studio) => (
                      <Badge key={studio.id} variant="outline">
                        {studio.name}
                      </Badge>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}

            {/* Countries */}
            {item.countries.length > 0 && (
              <div className="space-y-1">
                <p className="text-muted-foreground/65">Countries</p>
                <ScrollArea>
                  <div className="flex gap-1">
                    {item.countries.map((country) => (
                      <Badge key={country.id} variant="outline">
                        {country.name}
                      </Badge>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

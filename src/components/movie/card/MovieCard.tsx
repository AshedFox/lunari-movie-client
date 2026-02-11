import { Badge } from '@components/ui/badge';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import {
  FilmListItemFragment,
  SeriesListItemFragment,
} from '@lib/graphql/generated/graphql';
import { formatDateTime, formatDateTimeRange } from '@lib/utils/format';
import { Film, Star, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  item: FilmListItemFragment | SeriesListItemFragment;
};

const MovieCard = ({ item }: Props) => {
  const isSeries = item.__typename === 'Series';
  const href = `/${isSeries ? 'series' : 'films'}/${item.id}`;

  const series = isSeries ? (item as SeriesListItemFragment) : null;
  const film = !isSeries ? (item as FilmListItemFragment) : null;

  const releaseText = isSeries
    ? series?.startReleaseDate &&
      formatDateTimeRange(series.startReleaseDate, series.endReleaseDate)
    : film?.releaseDate && formatDateTime(film.releaseDate);

  const NoImageIcon = isSeries ? Tv : Film;

  return (
    <article className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col h-full group">
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
          {!!item.rating && (
            <Badge className="bg-yellow-500/90 hover:bg-yellow-500">
              <Star fill="currentColor" />
              {item.rating.toFixed(1)}
            </Badge>
          )}
          {/* Age restriction */}
          <Badge className="ml-auto bg-red-600/90 hover:bg-red-600">
            {item.ageRestriction}
          </Badge>
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
            {releaseText && <span>{releaseText}</span>}

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

export { MovieCard };

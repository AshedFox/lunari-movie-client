import { Badge } from '@components/ui/badge';
import {
  FilmMiniCardFragment,
  SeriesMiniCardFragment,
} from '@lib/graphql/generated/graphql';
import { formatDateTime, formatDateTimeRange } from '@lib/utils/format';
import { Film, Star, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@lib/utils';

type Props = {
  item: FilmMiniCardFragment | SeriesMiniCardFragment;
  className?: string;
};

const MovieMiniCard = ({ item, className }: Props) => {
  const isSeries = item.__typename === 'Series';
  const href = `/${isSeries ? 'series' : 'films'}/${item.id}`;

  const series = isSeries ? (item as SeriesMiniCardFragment) : null;
  const film = !isSeries ? (item as FilmMiniCardFragment) : null;

  const releaseText = isSeries
    ? series?.startReleaseDate &&
      formatDateTimeRange(series.startReleaseDate, series.endReleaseDate)
    : film?.releaseDate && formatDateTime(film.releaseDate);

  const NoImageIcon = isSeries ? Tv : Film;

  return (
    <div
      className={cn(
        'bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col group h-full',
        className,
      )}
    >
      {/* Cover */}
      <Link
        href={href}
        className="relative aspect-[2/3] overflow-hidden bg-muted"
      >
        {item.cover ? (
          <Image
            src={item.cover.url}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
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
      <div className="px-4 py-3 space-y-2 flex-1 flex flex-col">
        {/* Title */}
        <h3
          className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1"
          title={item.title}
        >
          <Link href={href}>{item.title}</Link>
        </h3>

        {/* Release date */}
        {releaseText && (
          <div className="text-muted-foreground text-xs">{releaseText}</div>
        )}

        {/* Genres */}
        {item.genres.length > 0 && (
          <div className="flex gap-1">
            {item.genres.slice(0, 1).map((genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { MovieMiniCard };

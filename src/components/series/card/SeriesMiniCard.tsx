import { Badge } from '@components/ui/badge';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { SeriesMiniCardFragment } from '@lib/graphql/generated/graphql';
import { formatDateTimeRange } from '@lib/utils/format';
import { Star, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  series: SeriesMiniCardFragment;
};

const SeriesMiniCard = ({ series }: Props) => {
  const releasePeriod = formatDateTimeRange(
    series.startReleaseDate,
    series.endReleaseDate,
  );

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {series.cover ? (
          <Image
            src={series.cover.url}
            alt={series.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Tv className="h-10 w-10 text-muted-foreground" />
          </div>
        )}

        {/* Badges on top of image */}
        <div className="absolute top-0 p-2 w-full flex justify-between">
          {/* Rating */}
          {!!series.rating && (
            <Badge className="bg-yellow-500/40">
              <Star className="text-yellow-500" fill="currentColor" size={16} />
              {series.rating.toFixed(1)}
            </Badge>
          )}

          {/* Age restriction */}
          <Badge className="ml-auto bg-red-600/60">
            {series.ageRestriction}
          </Badge>
        </div>
      </div>

      <div className="px-6 py-4 space-y-4 flex-1 flex flex-col">
        <h3
          className="font-medium group-hover:text-primary transition-colors line-clamp-1"
          title={series.title}
        >
          <Link href={`/series/${series.id}`}>{series.title}</Link>
        </h3>

        {releasePeriod && (
          <div className="text-muted-foreground text-sm">{releasePeriod}</div>
        )}

        {series.genres.length > 0 && (
          <ScrollArea>
            <div className="flex gap-1">
              {series.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export { SeriesMiniCard };

import { SeriesMiniCardFragment } from '@lib/graphql/generated/graphql';
import { cn } from '@lib/utils';
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
    <Link href={`/series/${series.id}`}>
      <article className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col group">
        {/* Main info */}
        <div className="relative aspect-video">
          {/* Cover */}
          {series.cover && (
            <Image
              className="object-cover"
              fill
              src={series.cover?.url}
              alt={`Cover ${series.title}`}
            />
          )}
          <div
            className={cn('absolute inset-0', {
              'bg-gradient-to-b via-transparent via-45% to-card group-hover:via-card/50 transition-colors duration-300':
                series.cover,
              'bg-muted/50': !series.cover,
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
                {series.rating === 0 ? '-' : series.rating.toFixed(1)}
              </div>

              {/* Age restriction */}
              <div className="text-sm font-semibold bg-red-600/60 text-primary-foreground rounded-md backdrop-blur px-2 py-1">
                {series.ageRestriction}
              </div>
            </div>

            <div>
              {/* Title */}
              <div
                className={cn(
                  'flex justify-between transition-transform group-hover:translate-y-0 duration-300',
                  series.genres.length > 0
                    ? 'translate-y-[150%]'
                    : 'translate-y-[50%]',
                )}
              >
                <h2 className={'text-2xl font-bold w-fit'}>{series.title}</h2>
                <div title="series">
                  <Tv size={24} />
                </div>
              </div>

              <div className="transition-transform translate-y-[200%] group-hover:translate-y-0 duration-300">
                {/* Release date */}
                {releasePeriod && (
                  <div className="text-muted-foreground text-sm">
                    {releasePeriod}
                  </div>
                )}

                {/* Genres */}
                {series.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {series.genres.map((genre) => (
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

export { SeriesMiniCard };

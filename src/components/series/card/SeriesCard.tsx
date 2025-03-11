import { SeriesListItemFragment } from '@lib/graphql/generated/graphql';
import { ISOPeriodToLocale } from '@lib/utils/format';
import { Star } from 'lucide-react';
import Image from 'next/image';

type Props = {
  series: SeriesListItemFragment;
};

const SeriesCard = ({ series }: Props) => {
  const releasePeriod = ISOPeriodToLocale(
    series.startReleaseDate,
    series.endReleaseDate,
  );

  return (
    <article className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col">
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
        <div className="absolute inset-0 bg-gradient-to-b via-transparent via-45% to-card"></div>

        {/* Information over the cover */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            {/* Rating */}
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/40  text-primary-foreground backdrop-blur rounded-md font-semibold text-sm">
              <Star className="text-yellow-500" fill="currentColor" size={16} />
              {series.rating === 0 ? '-' : series.rating.toFixed(1)}
            </div>

            {/* Age restriction */}
            <div className="text-sm font-semibold bg-red-600/60 text-primary-foreground rounded-md backdrop-blur px-2 py-1">
              {series.ageRestriction}
            </div>
          </div>

          <div>
            {/* Title */}
            <h2 className="text-2xl font-bold">{series.title}</h2>

            {/* Release date */}
            {releasePeriod && (
              <div className="text-muted-foreground text-sm">
                {releasePeriod}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Other info*/}
      <div className="px-6 py-4 space-y-4 flex-1 flex flex-col">
        {/* Description */}
        <div className=" flex-1">
          <p className="text-muted-foreground text-sm line-clamp-4">
            {series.description}
          </p>
        </div>

        {/* Genres */}
        {series.genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
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

        {/* Other */}
        <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          {/* Studios */}
          {series.studios.length > 0 && (
            <div className="space-y-1">
              <p className="text-muted-foreground/65">Studios</p>
              <p>{series.studios.map((studio) => studio.name).join(', ')}</p>
            </div>
          )}

          {/* Countries */}
          {series.countries.length > 0 && (
            <div className="space-y-1">
              <p className="text-muted-foreground/65">Countries</p>
              <p>
                {series.countries.map((country) => country.name).join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export { SeriesCard };

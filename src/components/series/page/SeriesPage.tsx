import { Star, Calendar } from 'lucide-react';
import {
  MovieUserFragment,
  SeriesFragment,
  UserProfileFragment,
} from '@lib/graphql/generated/graphql';
import { FormattedDateRange } from '@components/ui/formatted-date-range';
import Image from 'next/image';
import { MovieListsButtons } from '@components/movie-user/lists-buttons';
import { Badge } from '@components/ui/badge';
import { SeasonsList } from './SeasonsList';

type Props = {
  series: SeriesFragment;
  movieUser: MovieUserFragment | null;
  user: UserProfileFragment | null;
};

const SeriesPage = ({ series, movieUser, user }: Props) => {
  return (
    <div className="space-y-8">
      {/* Cover */}
      <div className="relative w-full aspect-[3/1] bg-muted">
        {series.cover && (
          <Image
            src={series.cover.url}
            alt="cover"
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative container space-y-6">
        {/* Title */}
        <h1 className="text-5xl font-bold leading-tight">{series.title}</h1>
        <div className="flex flex-wrap items-center gap-3">
          {/* Rating */}
          <Badge className="px-3 py-2 bg-yellow-500">
            <Star fill="currentColor" />
            {series.rating === 0 ? '-' : series.rating.toFixed(1)}
          </Badge>

          {/* Release date */}
          {series.startReleaseDate && (
            <Badge variant="secondary" className="px-3 py-2">
              <Calendar />
              <FormattedDateRange
                fromDate={series.startReleaseDate}
                toDate={series.endReleaseDate}
              />
            </Badge>
          )}

          {series.ageRestriction && (
            <Badge className="bg-red-600 px-3 py-2">
              {series.ageRestriction}
            </Badge>
          )}
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {series.genres.map((genre) => (
            <Badge variant="secondary" key={genre.id}>
              {genre.name}
            </Badge>
          ))}
        </div>

        {/* Buttons */}
        {user && (
          <MovieListsButtons movieUser={movieUser} movieId={series.id} />
        )}

        {/* Seasons */}
        <SeasonsList
          seasons={series.paginatedSeasons.nodes}
          episodes={series.paginatedEpisodes.nodes}
        />
      </div>
    </div>
  );
};

export { SeriesPage };

import { Calendar } from 'lucide-react';
import {
  MovieUserFragment,
  SeriesFragment,
  UserProfileFragment,
} from '@shared/api/graphql/graphql';
import { FormattedDateRange } from '@shared/ui/formatted-date-range';
import { MovieListsButtons } from '@features/manage-movie-user/ui';
import { Badge } from '@shared/ui/badge';
import { SeasonsList } from '@entities/season/ui/SeasonsList';
import { MovieHeader } from '@entities/movie';

type Props = {
  series: SeriesFragment;
  movieUser: MovieUserFragment | null;
  user: UserProfileFragment | null;
};

export const SeriesPage = ({ series, movieUser, user }: Props) => {
  return (
    <div className="space-y-8">
      <MovieHeader
        title={series.title}
        rating={series.rating}
        coverUrl={series.cover?.url}
        actionSlot={
          user && (
            <MovieListsButtons movieUser={movieUser} movieId={series.id} />
          )
        }
        metaSlot={
          <>
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

            {/* Age restriction */}
            {series.ageRestriction && (
              <Badge className="bg-red-600 px-3 py-2">
                {series.ageRestriction}
              </Badge>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {series.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </div>
          </>
        }
      />

      <main className="container">
        {/* Seasons */}
        <SeasonsList
          seasons={series.paginatedSeasons.nodes}
          episodes={series.paginatedEpisodes.nodes}
        />
      </main>
    </div>
  );
};

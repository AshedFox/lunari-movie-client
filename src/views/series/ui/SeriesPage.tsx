import { MovieMeta } from '@entities/movie';
import {
  MovieUserFragment,
  SeriesFragment,
  UserProfileFragment,
} from '@shared/api/graphql/graphql';
import { MovieListsButtons } from '@features/manage-movie-user';
import { SeasonsList } from '@entities/season';
import { CoverHeader } from '@shared/ui/cover-header';

type Props = {
  series: SeriesFragment;
  movieUser: MovieUserFragment | null;
  user: UserProfileFragment | null;
};

export const SeriesPage = ({ series, movieUser, user }: Props) => {
  return (
    <div className="space-y-8">
      <CoverHeader
        title={series.title}
        rating={series.rating}
        coverUrl={series.cover?.url}
        actionSlot={
          user && (
            <MovieListsButtons movieUser={movieUser} movieId={series.id} />
          )
        }
        metaSlot={<MovieMeta movie={series} />}
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

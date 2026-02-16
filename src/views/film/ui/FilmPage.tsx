import { Calendar } from 'lucide-react';
import { FormattedDate } from '@shared/ui/formatted-date';
import { MovieListsButtons } from '@features/manage-movie-user/ui';
import { WatchButton } from '@features/watch-film';
import { Badge } from '@shared/ui/badge';
import {
  FilmFragment,
  MovieUserFragment,
  UserProfileFragment,
} from '@shared/api/graphql/graphql';
import { MovieHeader } from '@entities/movie';

type Props = {
  film: FilmFragment;
  movieUser: MovieUserFragment | null;
  user: UserProfileFragment | null;
};

export const FilmPage = ({ film, movieUser, user }: Props) => {
  return (
    <div className="space-y-8">
      <MovieHeader
        title={film.title}
        rating={film.rating}
        coverUrl={film.cover?.url}
        actionSlot={
          <>
            <WatchButton
              userId={user?.id}
              filmId={film.id}
              videoId={film.videoId ?? undefined}
            />
            {user && (
              <MovieListsButtons movieUser={movieUser} movieId={film.id} />
            )}
          </>
        }
        metaSlot={
          <>
            {/* Release date */}
            {film.releaseDate && (
              <Badge variant="secondary" className="px-3 py-2">
                <Calendar />
                <FormattedDate date={film.releaseDate} />
              </Badge>
            )}

            {/* Age restriction */}
            {film.ageRestriction && (
              <Badge className="bg-red-600 px-3 py-2">
                {film.ageRestriction}
              </Badge>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {film.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </div>
          </>
        }
      />
    </div>
  );
};

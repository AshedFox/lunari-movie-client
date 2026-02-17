import { MovieMeta } from '@entities/movie';
import { MovieListsButtons } from '@features/manage-movie-user';
import { WatchButton } from '@features/watch-film';
import {
  FilmFragment,
  MovieUserFragment,
  UserProfileFragment,
} from '@shared/api/graphql/graphql';
import { CoverHeader } from '@shared/ui/cover-header';

type Props = {
  film: FilmFragment;
  movieUser: MovieUserFragment | null;
  user: UserProfileFragment | null;
};

export const FilmPage = ({ film, movieUser, user }: Props) => {
  return (
    <div className="space-y-8">
      <CoverHeader
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
        metaSlot={<MovieMeta movie={film} />}
      />
    </div>
  );
};

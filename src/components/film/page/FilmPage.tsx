import { Star, Calendar } from 'lucide-react';
import {
  FilmFragment,
  MovieUserFragment,
  UserProfileFragment,
} from '@lib/graphql/generated/graphql';
import { formatDateTime } from '@lib/utils/format';
import Image from 'next/image';
import { MovieListsButtons } from '@components/movie-user/lists-buttons';
import WatchButton from './WatchButton';
import { Badge } from '@components/ui/badge';

type Props = {
  film: FilmFragment;
  movieUser: MovieUserFragment | null;
  user: UserProfileFragment | null;
};

const FilmPage = ({ film, movieUser, user }: Props) => {
  return (
    <div className="space-y-8">
      {/* Cover */}
      <div className="w-full aspect-[3/1] relative bg-muted">
        {film.cover && (
          <Image
            src={film.cover.url}
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
        <h1 className="text-5xl font-bold leading-tight">{film.title}</h1>
        <div className="flex flex-wrap items-center gap-3">
          {/* Rating */}
          <Badge className="px-3 py-2 bg-yellow-500">
            <Star fill="currentColor" />
            <span>{film.rating === 0 ? '-' : film.rating.toFixed(1)}</span>
          </Badge>

          {/* Release date */}
          {film.releaseDate && (
            <Badge variant="outline" className="px-3 py-2">
              <Calendar />
              <span>{formatDateTime(film.releaseDate)}</span>
            </Badge>
          )}

          {film.ageRestriction && (
            <Badge className="px-3 py-2 bg-red-600">
              {film.ageRestriction}
            </Badge>
          )}
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {film.genres.map((genre) => (
            <Badge variant="secondary" key={genre.id}>
              {genre.name}
            </Badge>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <WatchButton
            userId={user?.id}
            filmId={film.id}
            videoId={film.videoId ?? undefined}
          />

          {user && (
            <MovieListsButtons movieUser={movieUser} movieId={film.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export { FilmPage };

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

type Props = {
  film: FilmFragment;
  movieUser: MovieUserFragment | null;
  user: UserProfileFragment | null;
};

const FilmPage = ({ film, movieUser, user }: Props) => {
  return (
    <div className="space-y-8">
      {/* Cover */}
      {film.cover && (
        <div className="w-full aspect-[3/1] relative">
          <Image
            src={film.cover.url}
            alt="cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b via-transparent via-60% to-background/50" />
        </div>
      )}

      {/* Content */}
      <div className="relative container space-y-6">
        {/* Title */}
        <h1 className="text-5xl font-bold leading-tight">{film.title}</h1>
        <div className="flex flex-wrap items-center gap-6">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" fill="currentColor" size={24} />
            <span className="text-2xl font-bold">
              {film.rating === 0 ? '-' : film.rating.toFixed(1)}
            </span>
          </div>

          {/* Release date */}
          {film.releaseDate && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
              <Calendar size={20} />
              <span>{formatDateTime(film.releaseDate)}</span>
            </div>
          )}

          {film.ageRestriction && (
            <span className="px-3 py-1 bg-red-600 text-primary-foreground font-semibold rounded-md text-sm">
              {film.ageRestriction}
            </span>
          )}
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {film.genres.map((genre) => (
            <span
              key={genre.id}
              className="bg-secondary text-xs px-3 py-1 rounded-xl"
            >
              {genre.name}
            </span>
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

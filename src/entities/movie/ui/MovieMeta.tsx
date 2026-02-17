import { Badge } from '@shared/ui/badge';

import { FilmFragment, SeriesFragment } from '@shared/api/graphql/graphql';
import { getAgeColor } from '../lib';
import { MovieReleaseBadge } from './MovieReleaseBadge';

type Props = {
  movie: FilmFragment | SeriesFragment;
};

export const MovieMeta = ({ movie }: Props) => {
  return (
    <>
      {/* Release date */}
      <MovieReleaseBadge movie={movie} />

      {/* Age restriction */}
      {movie.ageRestriction && (
        <Badge variant={getAgeColor(movie.ageRestriction)}>
          {movie.ageRestriction}
        </Badge>
      )}

      {/* Genres */}
      {movie.genres.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};

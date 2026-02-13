import { MovieCard } from '@components/movie/card/MovieCard';
import {
  FilmListItemFragment,
  SeriesListItemFragment,
} from '@lib/graphql/generated/graphql';

type Props = {
  movies: (SeriesListItemFragment | FilmListItemFragment)[];
};

const MoviesGrid = async ({ movies }: Props) => {
  if (movies.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center text-muted-foreground text-lg">
        Nothing found
      </div>
    );
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} item={movie} />
        ))}
      </div>
    </div>
  );
};

export { MoviesGrid };

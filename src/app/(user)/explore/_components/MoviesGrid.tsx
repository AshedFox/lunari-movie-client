import { FilmCard } from '@components/film/card';
import { SeriesCard } from '@components/series/card';
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {movies.map((movie) =>
        movie.__typename === 'Film' ? (
          <FilmCard key={movie.id} film={movie} />
        ) : (
          <SeriesCard key={movie.id} series={movie} />
        ),
      )}
    </div>
  );
};

export default MoviesGrid;

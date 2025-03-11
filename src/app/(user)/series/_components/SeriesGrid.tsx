import { SeriesCard } from '@components/series/card';
import { SeriesListItemFragment } from '@lib/graphql/generated/graphql';

type Props = {
  movies: SeriesListItemFragment[];
};

const SeriesGrid = async ({ movies }: Props) => {
  if (movies.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center text-muted-foreground text-lg">
        Nothing found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {movies.map((movie) => (
        <SeriesCard key={movie.id} series={movie} />
      ))}
    </div>
  );
};

export default SeriesGrid;

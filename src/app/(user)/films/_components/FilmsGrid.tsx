import { FilmCard } from '@components/film/card';
import { FilmListItemFragment } from '@lib/graphql/generated/graphql';

type Props = {
  movies: FilmListItemFragment[];
};

const FilmsGrid = async ({ movies }: Props) => {
  if (movies.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center text-muted-foreground text-lg">
        Nothing found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {movies.map((movie) => (
        <FilmCard key={movie.id} film={movie} />
      ))}
    </div>
  );
};

export default FilmsGrid;

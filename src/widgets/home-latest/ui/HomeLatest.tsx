import { MovieSection } from '@entities/movie';
import { getMovies } from '@entities/movie/server';
import { SortDirectionEnum } from '@shared/api/graphql/graphql';

export const HomeLatest = async () => {
  const movies = await getMovies(undefined, 1, {
    releaseDate: { direction: SortDirectionEnum.DESC },
    startReleaseDate: { direction: SortDirectionEnum.DESC },
    endReleaseDate: { direction: SortDirectionEnum.DESC },
  });

  if (!movies.nodes.length) {
    return null;
  }

  return (
    <MovieSection
      title="Latest Movies"
      items={movies.nodes.slice(1)}
      href="/explore?sort=release_date_desc"
    />
  );
};

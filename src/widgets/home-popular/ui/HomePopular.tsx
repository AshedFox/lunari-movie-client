import { MovieSection } from '@entities/movie';
import { getPopularMovies } from '@entities/movie/server';

export const HomePopular = async () => {
  const popularMovies = await getPopularMovies();
  const items = popularMovies.nodes.slice(1);

  if (!items.length) {
    return null;
  }

  return (
    <MovieSection
      title="Popular Now"
      items={items}
      href="/explore?sort=most_popular"
    />
  );
};

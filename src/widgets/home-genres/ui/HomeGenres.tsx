import { GenreList } from '@entities/genre';
import { getGenres } from '@entities/genre/server';

export const HomeGenres = async () => {
  const genres = await getGenres();

  if (!genres.length) {
    return null;
  }

  return <GenreList title="Genres" genres={genres} />;
};

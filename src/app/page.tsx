import { GenreList } from '@components/home/GenreList';
import { HeroSection } from '@components/home/HeroSection';
import { MovieSection } from '@components/home/MovieSection';
import { getFilms } from '@services/film.service';
import { getGenres } from '@services/genre.service';
import { getPopularMovies } from '@services/movie.service';

export default async function Home() {
  const [popularMovies, moreFilms, genres] = await Promise.all([
    getPopularMovies(),
    getFilms(),
    getGenres(),
  ]);

  return (
    <main className="min-h-screen bg-background pb-8 container overflow-hidden">
      {popularMovies.nodes[0] && <HeroSection movie={popularMovies.nodes[0]} />}

      <div className="space-y-8">
        <GenreList genres={genres} />

        <MovieSection
          title="Popular Now"
          items={popularMovies.nodes.slice(1)}
          href="/explore?sort=most_popular"
        />

        <MovieSection
          title="More to Watch"
          items={moreFilms.nodes}
          href="/explore"
        />
      </div>
    </main>
  );
}

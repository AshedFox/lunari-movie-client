import { GenreList } from '@components/home/GenreList';
import { HeroSection } from '@components/home/HeroSection';
import { MovieSection } from '@components/home/MovieSection';
import { getClient } from '@lib/apollo/rsc-client';
import {
  FilmMiniCardFragment,
  GetAllGenresDocument,
  GetMoviesDocument,
  GetPopularMoviesDocument,
  SeriesMiniCardFragment,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';

const getPopularMovies = async (): Promise<
  (FilmMiniCardFragment | SeriesMiniCardFragment)[]
> => {
  const { data } = await getClient().query({
    query: GetPopularMoviesDocument,
    variables: {
      offset: 0,
      limit: 10,
    },
    context: {
      skipAuth: true,
    },
  });

  return data?.getMoviesOffset.nodes ?? [];
};

const getMoreFilms = async () => {
  const { data } = await getClient().query({
    query: GetMoviesDocument,
    variables: {
      offset: 0,
      limit: 10,
    },
    context: {
      skipAuth: true,
    },
  });

  return data?.getMoviesOffset.nodes ?? [];
};

const getGenres = async () => {
  const { data } = await getClient().query({
    query: GetAllGenresDocument,
    variables: {
      sort: {
        name: {
          direction: SortDirectionEnum.ASC,
        },
      },
    },
    context: {
      skipAuth: true,
    },
  });
  return data?.getAllGenres ?? [];
};

export default async function Home() {
  const [popularMovies, moreFilms, genres] = await Promise.all([
    getPopularMovies(),
    getMoreFilms(),
    getGenres(),
  ]);

  return (
    <main className="min-h-screen bg-background pb-8 container overflow-hidden">
      {popularMovies[0] && <HeroSection movie={popularMovies[0]} />}

      <div className="space-y-8">
        <GenreList genres={genres} />

        <MovieSection
          title="Popular Now"
          items={popularMovies.slice(1)}
          href="/explore?sort=most_popular"
        />

        <MovieSection title="More to Watch" items={moreFilms} href="/explore" />
      </div>
    </main>
  );
}

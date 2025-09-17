import { FilmMiniCard } from '@components/film/card/FilmMiniCard';
import { SeriesMiniCard } from '@components/series/card/SeriesMiniCard';
import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from '@components/ui/carousel';
import { getClient } from '@lib/apollo/rsc-client';
import {
  FilmMiniCardFragment,
  GetPopularMoviesDocument,
  SeriesMiniCardFragment,
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

export default async function Home() {
  const popularMovies = await getPopularMovies();

  return (
    <main className="container py-10">
      <section className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold">Popular movies</h2>

        <Carousel
          opts={{ align: 'start', duration: 30 }}
          autoPlay={{
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }}
        >
          <CarouselContent>
            {popularMovies.map((movie) => (
              <CarouselItem key={movie.id} className="basis-1/3">
                {movie.__typename === 'Film' ? (
                  <FilmMiniCard film={movie} />
                ) : (
                  <SeriesMiniCard series={movie} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  );
}

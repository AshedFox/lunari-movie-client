import { getMovieHref, MovieHero } from '@entities/movie';
import { getPopularMovies } from '@entities/movie/server';
import { buttonVariants } from '@shared/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const HomeHero = async () => {
  const movies = await getPopularMovies();
  const mostPopularMovie = movies.nodes[0];

  if (!mostPopularMovie) {
    return null;
  }

  return (
    <MovieHero
      movie={mostPopularMovie}
      labelSlot={
        <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
          Featured
        </span>
      }
      actionSlot={
        <Link
          className={buttonVariants({
            size: 'lg',
          })}
          href={getMovieHref(mostPopularMovie.id, mostPopularMovie.__typename)}
        >
          Explore Movie
          <ArrowRight className="h-5 w-5" />
        </Link>
      }
    />
  );
};

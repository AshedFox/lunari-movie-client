import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import {
  FilmMiniCardFragment,
  SeriesMiniCardFragment,
} from '@lib/graphql/generated/graphql';

interface HeroSectionProps {
  movie: FilmMiniCardFragment | SeriesMiniCardFragment;
}

export function HeroSection({ movie }: HeroSectionProps) {
  return (
    <div className="relative h-[80dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        {movie.cover && (
          <Image
            src={movie.cover.url}
            alt={movie.title}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      <div className="relative flex h-full flex-col justify-end pb-20">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              Featured
            </span>
            {!!movie.rating && (
              <span className="flex items-center gap-1 font-semibold">
                <Star
                  size={12}
                  className="text-yellow-500"
                  fill="currentColor"
                />
                {movie.rating}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            {movie.title}
          </h1>

          <p className="line-clamp-3 text-lg text-muted-foreground md:text-xl">
            {movie.description || 'No overview available for this title.'}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              className={buttonVariants({
                size: 'lg',
              })}
              href={
                movie.__typename === 'Series'
                  ? `/series/${movie.id}`
                  : `/films/${movie.id}`
              }
            >
              Explore Movie
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/carousel';
import { MovieMiniCard } from '@components/movie/card/MovieMiniCard';
import {
  FilmMiniCardFragment,
  SeriesMiniCardFragment,
} from '@lib/graphql/generated/graphql';

interface MovieSectionProps {
  title: string;
  href?: string;
  items: (FilmMiniCardFragment | SeriesMiniCardFragment)[];
}

export function MovieSection({ title, href, items }: MovieSectionProps) {
  return (
    <section className="space-y-4 py-6 overflow-hidden @container">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {href && (
          <Link
            href={href}
            className="group flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            See all
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <div>
        {items.length > 0 ? (
          <Carousel
            opts={{ align: 'start', duration: 30 }}
            autoPlay={{
              delay: 5000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }}
          >
            <CarouselContent className="px-10">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-1/2 @sm:basis-1/3 @lg:basis-1/4 @2xl:basis-1/5"
                >
                  <MovieMiniCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </section>
  );
}

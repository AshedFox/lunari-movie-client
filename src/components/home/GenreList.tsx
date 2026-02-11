import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { Badge } from '@components/ui/badge';
import { BaseGenreFragment } from '@lib/graphql/generated/graphql';

interface GenreListProps {
  genres: BaseGenreFragment[];
}

export function GenreList({ genres }: GenreListProps) {
  if (!genres.length) {
    return null;
  }

  return (
    <section className="py-4 space-y-3 overflow-hidden">
      <h2 className="text-lg font-semibold tracking-tight">Browse by Genre</h2>
      <ScrollArea className="rounded-md border">
        <div className="flex space-x-2 p-4">
          {genres.map((genre) => (
            <Link key={genre.id} href={`/films?genres=${genre.id}`}>
              <Badge
                variant="secondary"
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {genre.name}
              </Badge>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

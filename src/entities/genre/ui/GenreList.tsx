import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@shared/ui/scroll-area';
import { Badge } from '@shared/ui/badge';
import { BaseGenreFragment } from '@shared/api/graphql/graphql';

type Props = {
  genres: BaseGenreFragment[];
  title: string;
};

export const GenreList = ({ genres, title }: Props) => {
  return (
    <section className="py-4 space-y-3 overflow-hidden">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      {genres.length > 0 ? (
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
      ) : (
        <p className="text-center text-muted-foreground">
          No genres available.
        </p>
      )}
    </section>
  );
};

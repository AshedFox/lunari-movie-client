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
              <Badge key={genre.id} variant="secondary" size="lg" asChild>
                <Link href={`/films?genres=${genre.id}`}>{genre.name}</Link>
              </Badge>
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

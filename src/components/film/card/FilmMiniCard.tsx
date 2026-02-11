import { Badge } from '@components/ui/badge';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { FilmMiniCardFragment } from '@lib/graphql/generated/graphql';
import { formatDateTime } from '@lib/utils/format';
import { Film, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  film: FilmMiniCardFragment;
};

const FilmMiniCard = ({ film }: Props) => {
  const releaseDate = film.releaseDate && formatDateTime(film.releaseDate);

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {film.cover ? (
          <Image
            src={film.cover.url}
            alt={film.title}
            fill
            className="object-cover "
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Film className="h-10 w-10 text-muted-foreground" />
          </div>
        )}

        {/* Badges on top of image */}
        <div className="absolute top-0 p-2 w-full flex justify-between">
          {/* Rating */}
          {!!film.rating && (
            <Badge className="bg-yellow-500/40">
              <Star className="text-yellow-500" fill="currentColor" size={16} />
              {film.rating.toFixed(1)}
            </Badge>
          )}

          {/* Age restriction */}
          <Badge className="ml-auto bg-red-600/60">{film.ageRestriction}</Badge>
        </div>
      </div>

      <div className="px-6 py-4 space-y-4 flex-1 flex flex-col">
        <h3
          className="font-medium group-hover:text-primary transition-colors line-clamp-1"
          title={film.title}
        >
          <Link href={`/films/${film.id}`}>{film.title}</Link>
        </h3>

        {releaseDate && (
          <div className="text-muted-foreground text-sm">{releaseDate}</div>
        )}

        {film.genres.length > 0 && (
          <ScrollArea>
            <div className="flex gap-1">
              {film.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export { FilmMiniCard };

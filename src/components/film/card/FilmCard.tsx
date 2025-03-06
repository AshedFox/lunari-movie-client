'use client';

import { ScrollBar, ScrollArea } from '@components/ui/scroll-area';
import { FilmListItemFragment } from '@lib/graphql/generated/graphql';
import { ISODateToLocale } from '@lib/utils/format';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  film: FilmListItemFragment;
};

const FilmCard = ({ film }: Props) => {
  const tags = [...film.genres, ...film.countries, ...film.studios];

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border h-full divide-y">
      <div className="relative w-full aspect-video">
        {film.cover?.url && (
          <Image
            src={film.cover.url}
            fill
            className="object-cover"
            alt={'cover'}
          />
        )}
        <div className="absolute top-0 left-0 bg-primary text-sm font-bold rounded-br-md px-3 py-1 text-primary-foreground drop-shadow-lg">
          {film.ageRestriction}
        </div>
        <div className="absolute bottom-0 left-0 bg-chart-1 text-sm font-bold rounded-tr-md px-3 py-1 text-primary-foreground drop-shadow-lg">
          film
        </div>
      </div>
      <div className="p-4 space-y-2 flex flex-col flex-1">
        <Link className="w-fit" href={`/films/${film.id}`}>
          <h2 className="text-xl font-semibold truncate">{film.title}</h2>
        </Link>

        <div className="line-clamp-4 text-sm ">{film.description}</div>
        <div className="font-bold text-sm mt-auto">
          {ISODateToLocale(film.releaseDate)}
        </div>
      </div>
      <ScrollArea className="w-full  scroll-p-3">
        <div className="flex space-x-1.5 p-3 w-max h-12">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-secondary text-sm rounded py-0.5 px-2 shrink-0 text-secondary-foreground snap-start"
            >
              {tag.name}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </article>
  );
};

export { FilmCard };

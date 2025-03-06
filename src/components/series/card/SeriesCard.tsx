import { ScrollBar, ScrollArea } from '@components/ui/scroll-area';
import { SeriesListItemFragment } from '@lib/graphql/generated/graphql';
import { ISOPeriodToLocale } from '@lib/utils/format';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  series: SeriesListItemFragment;
};

const SeriesCard = ({ series }: Props) => {
  const tags = [...series.genres, ...series.countries, ...series.studios];

  return (
    <article className="flex flex-col rounded-lg overflow-hidden border h-full divide-y">
      <div className="relative w-full aspect-video">
        {series.cover?.url && (
          <Image
            src={series.cover.url}
            fill
            className="object-cover"
            alt={'cover'}
          />
        )}
        <div className="absolute top-0 left-0 bg-primary text-sm font-bold rounded-br-md px-3 py-1 text-primary-foreground drop-shadow-lg">
          {series.ageRestriction}
        </div>
        <div className="absolute bottom-0 left-0 bg-chart-3 text-sm font-bold rounded-tr-md px-3 py-1 text-primary-foreground drop-shadow-lg">
          series
        </div>
      </div>
      <div className="p-4 space-y-2 flex flex-col flex-1">
        <Link className="w-fit" href={`/series/${series.id}`}>
          <h2 className="text-xl font-semibold truncate">{series.title}</h2>
        </Link>
        <div className="line-clamp-4 text-sm">{series.description}</div>
        <div className="font-bold text-sm mt-auto">
          {ISOPeriodToLocale(series.startReleaseDate, series.endReleaseDate)}
        </div>
      </div>
      <ScrollArea className="w-full border-t scroll-p-3">
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

export { SeriesCard };

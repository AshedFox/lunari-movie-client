import { CollectionListItemFragment } from '@lib/graphql/generated/graphql';
import { DATE_FORMATS } from '@lib/utils/format/formatters';
import { FormattedDate } from '@components/ui/formatted-date';
import { FormattedDateRelative } from '@components/ui/formatted-date-relative';
import { format } from 'date-fns';
import { CameraOff, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  collection: CollectionListItemFragment;
};

export const CollectionListItem = ({ collection }: Props) => {
  return (
    <div className="grid rounded-lg border grid-cols-[96px_1fr] md:grid-cols-[156px_1fr] auto-rows-fr overflow-hidden">
      {collection.cover ? (
        <div className="relative">
          <Image
            src={collection.cover?.url}
            alt="cover"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1024px) 33vw, 20vw"
            quality={90}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="bg-muted/40 text-muted-foreground/50 flex items-center justify-center flex-col text-xs select-none">
          <CameraOff />
          No cover
        </div>
      )}
      <div className="flex flex-col gap-1.5 py-3 px-5">
        <h2 className="font-bold text-xl">
          <Link
            href={`/collections/${collection.id}`}
            className="hover:text-muted-foreground transition-colors"
          >
            {collection.name}
          </Link>
        </h2>
        {collection.description && (
          <div className="line-clamp-2 text-sm text-muted-foreground">
            {collection.description}
          </div>
        )}
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span
            className="flex items-center gap-1"
            title={`${collection.rating} with total ${collection.reviewsCount} reviews`}
          >
            <Star size={12} className="text-yellow-500" fill="currentColor" />
            {collection.rating === 0 ? '-' : collection.rating.toFixed(1)}
          </span>
          <span className="flex items-center text-muted-foreground text-sm">
            <Clock size={12} className="mr-1" />
            <span
              title={format(
                new Date(collection.createdAt),
                DATE_FORMATS.dateTime.long,
              )}
            >
              <FormattedDate date={collection.createdAt} />
            </span>
            <span
              className="hidden md:inline-block"
              title={format(
                new Date(collection.updatedAt),
                DATE_FORMATS.dateTime.long,
              )}
            >
              , last modified{' '}
              <FormattedDateRelative date={collection.updatedAt} />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

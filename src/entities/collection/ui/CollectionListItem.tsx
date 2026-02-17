import { DATE_FORMATS } from '@shared/lib/format/formatters';
import { FormattedDate } from '@shared/ui/formatted-date';
import { FormattedDateRelative } from '@shared/ui/formatted-date-relative';
import { RatingBadge } from '@shared/ui/rating-badge';
import { format } from 'date-fns';
import { CameraOff, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CollectionListItemFragment } from '@shared/api/graphql/graphql';
import { ReactNode } from 'react';

type Props = {
  collection: CollectionListItemFragment;
  actionsSlot?: ReactNode;
};

export const CollectionListItem = ({ collection, actionsSlot }: Props) => {
  return (
    <div className="@container grid rounded-lg border grid-cols-[96px_1fr] @md:grid-cols-[156px_1fr] auto-rows-fr overflow-hidden">
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
          <RatingBadge rating={collection.rating} />

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
              className="hidden @md:inline-block"
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
        {actionsSlot}
      </div>
    </div>
  );
};

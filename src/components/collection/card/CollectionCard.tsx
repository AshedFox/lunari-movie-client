import { CollectionListItemFragment } from '@lib/graphql/generated/graphql';
import { DATE_FORMATS } from '@lib/utils/format/formatters';
import { FormattedDateRelative } from '@components/ui/formatted-date-relative';
import { format } from 'date-fns';
import { CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  collection: CollectionListItemFragment;
};

export const CollectionCard = ({ collection }: Props) => {
  return (
    <article className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden border flex flex-col">
      {/* Main info */}
      <div className="relative aspect-[21/9]">
        {/* Cover */}
        {collection.cover && (
          <Image
            className="object-cover"
            fill
            src={collection.cover.url}
            alt={`Cover ${collection.name}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b via-transparent via-45% to-card" />

        {/* Information over the cover */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between px-6 pt-6 pb-2">
          <div className="flex justify-between items-start">
            {/* Rating */}
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/40 text-primary-foreground backdrop-blur rounded-md font-semibold text-sm">
              <Star className="text-yellow-500" fill="currentColor" size={16} />
              {collection.rating === 0 ? '-' : collection.rating.toFixed(1)}
            </div>

            {/* Is system */}
            {collection.isSystem && (
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-600/60 text-primary-foreground backdrop-blur rounded-md font-semibold text-sm">
                <CheckCircle size={16} />
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold w-fit">
            <Link href={`/collections/${collection.id}`}>
              {collection.name}
            </Link>
          </h2>
        </div>
      </div>

      {/* Other info*/}
      <div className="px-6 pt-2 pb-4 space-y-3 flex-1 flex flex-col">
        {/* Description */}
        {collection.description && (
          <div className="flex-1">
            <p className="text-muted-foreground text-sm line-clamp-4">
              {collection.description}
            </p>
          </div>
        )}

        {/* Owner */}
        <div className="text-sm">
          <span className="text-muted-foreground">Author: </span>
          <Link
            href={`/users/${collection.owner.id}`}
            className="text-xs px-3 py-1 rounded-xl font-semibold bg-muted transition-colors hover:bg-muted/80"
          >
            {collection.owner.name}
          </Link>
        </div>

        {/* Other */}
        <div className="space-x-2 text-xs text-muted-foreground font-bold flex flex-wrap">
          <span
            title={`Created at ${format(new Date(collection.createdAt), DATE_FORMATS.dateTime.long)}, last update at ${format(new Date(collection.updatedAt), DATE_FORMATS.dateTime.long)}`}
          >
            Last update <FormattedDateRelative date={collection.updatedAt} />
          </span>
          <span>•</span>
          <span>{collection.moviesCount} movie(s)</span>
          <span>•</span>
          <span>{collection.reviewsCount} review(s)</span>
        </div>
      </div>
    </article>
  );
};

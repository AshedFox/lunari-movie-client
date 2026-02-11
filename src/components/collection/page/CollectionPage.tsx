import { Clock, Pencil, RefreshCw, Star } from 'lucide-react';
import {
  CollectionFragment,
  CollectionUserFragment,
  UserProfileFragment,
} from '@lib/graphql/generated/graphql';
import { FormattedDate } from '@components/ui/formatted-date';
import { FormattedDateRelative } from '@components/ui/formatted-date-relative';
import Image from 'next/image';
import { CollectionListsButtons } from '@components/collection-user/lists-buttons';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { buttonVariants } from '@components/ui/button';

type Props = {
  collection: CollectionFragment;
  collectionUser: CollectionUserFragment | null;
  user: UserProfileFragment | null;
};

const CollectionPage = ({ collection, collectionUser, user }: Props) => {
  return (
    <div className="space-y-8">
      {/* Cover */}
      {collection.cover && (
        <div className="w-full aspect-[3/1] relative">
          <Image
            src={collection.cover.url}
            alt="cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-background/40 via-40% to-background/90 to-100%" />
        </div>
      )}

      {/* Content */}
      <div className="relative container space-y-6">
        {/* Name */}
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-5xl font-bold leading-tight truncate">
            {collection.name}
          </h1>
          {user && user.id === collection.owner.id && (
            <Link
              href={`/collections/${collection.id}/edit`}
              className={buttonVariants({ variant: 'outline' })}
            >
              <Pencil />
              Edit
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {/* Rating */}
          <div
            className="flex items-center gap-2"
            title={`${collection.reviewsCount} reviews with total rating ${collection.rating}`}
          >
            <Star className="text-yellow-500" fill="currentColor" size={24} />
            <span className="text-xl font-bold">
              {collection.rating === 0
                ? 'No reviews'
                : `${collection.rating.toFixed(1)} / 10`}
            </span>
          </div>

          <div className="flex items-center text-sm gap-4 text-muted-foreground">
            {/* Author */}
            <Link
              href={`/users/${collection.owner.id}`}
              className="flex items-center font-semibold gap-2 hover:text-muted-foreground/70 transition-colors"
            >
              <Avatar className="aspect-square shrink-0 overflow-hidden rounded-full size-6 font-semibold border">
                <AvatarImage
                  className="object-cover"
                  src={collection.owner.avatar?.url}
                />
                <AvatarFallback>
                  {collection.owner.name
                    .split(' ')
                    .map((word) => word[0].toUpperCase())
                    .join('')}
                </AvatarFallback>
              </Avatar>
              {collection.owner.name}
            </Link>
            <span>•</span>
            {/* Dates */}
            <div className="flex items-center gap-2">
              <Clock size={20} />

              <FormattedDate
                date={collection.createdAt}
                variant="date"
                format="long"
              />
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <RefreshCw size={20} />
              Last modified{' '}
              <FormattedDateRelative date={collection.updatedAt} />
            </div>
          </div>
        </div>
        {/* Buttons */}
        {user && (
          <CollectionListsButtons
            collectionUser={collectionUser}
            collectionId={Number(collection.id)}
          />
        )}
        {/* Description */}
        {collection.description && (
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground text-sm">
              {collection.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { CollectionPage };

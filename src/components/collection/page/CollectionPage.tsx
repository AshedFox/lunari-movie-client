import { Clock, Star } from 'lucide-react';
import {
  CollectionFragment,
  CollectionUserFragment,
  UserProfileFragment,
} from '@lib/graphql/generated/graphql';
import { formatDateTime, formatRelative } from '@lib/utils/format';
import Image from 'next/image';
import { CollectionListsButtons } from '@components/collection-user/lists-buttons';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

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
        <h1 className="text-5xl font-bold leading-tight">{collection.name}</h1>
        <div className="flex flex-wrap items-center gap-6">
          {/* Rating */}
          <div
            className="flex items-center gap-2"
            title={`${collection.reviewsCount} reviews with total rating ${collection.rating}`}
          >
            <Star className="text-yellow-500" fill="currentColor" size={24} />
            <span className="text-2xl font-bold">
              {collection.rating === 0 ? '-' : collection.rating.toFixed(1)}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="mr-2" size={20} />
            <span
              title={formatDateTime(collection.createdAt, 'dateTime', 'long')}
            >
              {formatDateTime(collection.createdAt)}
            </span>
            {collection.createdAt.getTime() ===
              collection.updatedAt.getTime() && (
              <span
                title={formatDateTime(collection.updatedAt, 'dateTime', 'long')}
              >
                , last modified {formatRelative(collection.updatedAt)}
              </span>
            )}
          </div>

          {/* Author */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold">
            <Avatar className="aspect-square shrink-0 overflow-hidden rounded-full size-6 text-sm font-semibold border">
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
            <Link
              href={`/users/${collection.owner.id}`}
              className="transition-colors hover:text-muted-foreground/70"
            >
              {collection.owner.name}
            </Link>
          </div>
        </div>
        {/* Buttons */}
        {user && (
          <CollectionListsButtons
            collectionUser={collectionUser}
            collectionId={Number(collection.id)}
          />
        )}
      </div>
    </div>
  );
};

export { CollectionPage };

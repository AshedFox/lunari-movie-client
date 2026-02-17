import { Clock, Pencil, RefreshCw } from 'lucide-react';
import { FormattedDate } from '@shared/ui/formatted-date';
import { FormattedDateRelative } from '@shared/ui/formatted-date-relative';
import { CollectionListsButtons } from '@features/manage-collection-user';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import { buttonVariants } from '@shared/ui/button';
import { CoverHeader } from '@shared/ui/cover-header';
import {
  CollectionFragment,
  CollectionUserFragment,
  UserProfileFragment,
} from '@shared/api/graphql/graphql';

type Props = {
  collection: CollectionFragment;
  collectionUser: CollectionUserFragment | null;
  user: UserProfileFragment | null;
};

export const CollectionPage = ({ collection, collectionUser, user }: Props) => {
  return (
    <div className="space-y-8">
      <CoverHeader
        title={collection.name}
        coverUrl={collection.cover?.url}
        rating={collection.rating}
        actionSlot={
          <>
            {user && (
              <CollectionListsButtons
                collectionUser={collectionUser}
                collectionId={Number(collection.id)}
              />
            )}
            {user && user.id === collection.owner.id && (
              <Link
                href={`/collections/${collection.id}/edit`}
                className={buttonVariants({ variant: 'outline' })}
              >
                <Pencil />
                Edit
              </Link>
            )}
          </>
        }
        metaSlot={
          <div className="flex flex-wrap items-center text-sm gap-4 text-muted-foreground">
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
            {/* Created Date */}
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <FormattedDate
                date={collection.createdAt}
                variant="date"
                format="long"
              />
            </div>
            <span>•</span>
            {/* Updated Date */}
            <div className="flex items-center gap-2">
              <RefreshCw size={20} />
              Last modified{' '}
              <FormattedDateRelative date={collection.updatedAt} />
            </div>
          </div>
        }
      />

      <div className="container space-y-6">
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

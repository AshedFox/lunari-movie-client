import { CollectionListItem } from '@entities/collection';
import { DeleteCollectionDialog } from '@features/delete-collection';
import { CollectionListItemFragment } from '@shared/api/graphql/graphql';
import { cn } from '@shared/lib/utils';
import { buttonVariants } from '@shared/ui/button';
import { Link, Pencil } from 'lucide-react';

type Props = {
  collections: CollectionListItemFragment[];
  className?: string;
  emptyClassName?: string;
};

export const CollectionsManageList = ({
  collections,
  className,
  emptyClassName,
}: Props) => {
  if (collections.length === 0) {
    return (
      <div
        className={cn(
          'flex-1 flex justify-center items-center text-muted-foreground text-lg',
          emptyClassName,
        )}
      >
        Nothing here...
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {collections.map((c) => (
        <CollectionListItem
          key={c.id}
          collection={c}
          actionsSlot={
            <div className="grid gap-2">
              <Link
                href={`/collections/${c.id}/edit`}
                className={buttonVariants({ variant: 'outline' })}
              >
                <Pencil />
                Edit
              </Link>
              <DeleteCollectionDialog collectionId={Number(c.id)} />
            </div>
          }
        />
      ))}
    </div>
  );
};

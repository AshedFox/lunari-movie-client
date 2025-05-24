import { buttonVariants } from '@components/ui/button';
import { CollectionListItemFragment } from '@lib/graphql/generated/graphql';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { DeleteCollectionDialog } from '../delete';
import { CollectionListItem } from './CollectionListItem';

type Props = {
  collection: CollectionListItemFragment;
};

export const CollectionManageListItem = ({ collection }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <CollectionListItem collection={collection} />

      <div className="grid grid-flow-col gap-1">
        <Link
          href={`/collections/${collection.id}/edit`}
          className={buttonVariants({ variant: 'outline' })}
        >
          <Pencil />
          Edit
        </Link>

        <DeleteCollectionDialog collectionId={Number(collection.id)} />
      </div>
    </div>
  );
};

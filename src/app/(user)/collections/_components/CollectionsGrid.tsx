import { CollectionCard } from '@components/collection/card';
import { CollectionListItemFragment } from '@lib/graphql/generated/graphql';

type Props = {
  collections: CollectionListItemFragment[];
};

const CollectionsGrid = async ({ collections }: Props) => {
  if (collections.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center text-muted-foreground text-lg">
        Nothing found
      </div>
    );
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-1 @xl:grid-cols-2 gap-4">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default CollectionsGrid;

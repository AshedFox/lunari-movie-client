import { EditCollectionForm } from '@features/edit-collection';
import { MovieListEditor } from '@features/edit-collection-movies';
import { CollectionFragment } from '@shared/api/graphql/graphql';
import { buttonVariants } from '@shared/ui/button';
import { Link, ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  collection: CollectionFragment;
};

export const EditCollectionPage = ({ collection }: Props) => {
  return (
    <div className="container py-10 space-y-8">
      <div className="flex items-center gap-2 justify-between">
        <Link
          href={`/collections/${collection.id}`}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ArrowLeft />
          Back to Collection
        </Link>
        <h1 className="text-3xl font-bold">Edit Collection</h1>
        <Link
          href={`/users/me/collections`}
          className={buttonVariants({ variant: 'outline' })}
        >
          All My Collections
          <ArrowRight />
        </Link>
      </div>
      <EditCollectionForm collection={collection} />
      <div className="space-y-4">
        <MovieListEditor
          collectionId={Number(collection.id)}
          movies={collection.movies}
        />
      </div>
    </div>
  );
};

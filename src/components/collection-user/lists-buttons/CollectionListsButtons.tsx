'use client';

import { useMutation } from '@apollo/client/react';
import { Button } from '@components/ui/button';
import {
  CreateCollectionUserDocument,
  CollectionUserFragment,
  UpdateCollectionUserDocument,
} from '@lib/graphql/generated/graphql';
import { cn } from '@lib/utils';
import { Eye, Bookmark } from 'lucide-react';
import { useMemo, useTransition } from 'react';

type Props = {
  collectionUser: CollectionUserFragment | null;
  collectionId: number;
};

const CollectionListsButtons = ({ collectionUser, collectionId }: Props) => {
  const [createCollectionUser, { data: createData }] = useMutation(
    CreateCollectionUserDocument,
  );
  const [updateCollectionUser, { data: updateData }] = useMutation(
    UpdateCollectionUserDocument,
  );
  const [isLoadingTransition, startTransition] = useTransition();

  const currentCollectionUser = useMemo(
    () =>
      updateData?.updateCollectionUser ||
      createData?.createCollectionUser ||
      collectionUser,
    [
      createData?.createCollectionUser,
      collectionUser,
      updateData?.updateCollectionUser,
    ],
  );

  const handleClick = async (type: 'isWatched' | 'isBookmarked') => {
    startTransition(async () => {
      if (!currentCollectionUser) {
        await createCollectionUser({
          variables: {
            input: {
              collectionId,
              [type]: true,
            },
          },
        });
      } else {
        await updateCollectionUser({
          variables: {
            input: {
              [type]: !currentCollectionUser[type],
            },
            collectionId,
            userId: currentCollectionUser.userId,
          },
        });
      }
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="outline"
        disabled={isLoadingTransition}
        onClick={async () => await handleClick('isWatched')}
      >
        <Eye
          size={20}
          className={cn({
            'text-green-600': currentCollectionUser?.isWatched,
          })}
        />
      </Button>
      <Button
        size="icon"
        variant="outline"
        disabled={isLoadingTransition}
        onClick={async () => await handleClick('isBookmarked')}
      >
        <Bookmark
          size={20}
          className={cn({
            'fill-current text-amber-600': currentCollectionUser?.isBookmarked,
          })}
        />
      </Button>
    </div>
  );
};

export { CollectionListsButtons };

'use client';

import { Button } from '@shared/ui/button';
import { cn } from '@shared/lib/utils';
import { Eye, Bookmark } from 'lucide-react';
import { useState, useTransition } from 'react';
import {
  createCollectionUserAction,
  updateCollectionUserAction,
} from '../api/actions';
import { CollectionUserFragment } from '@shared/api/graphql/graphql';

type Props = {
  collectionUser: CollectionUserFragment | null;
  collectionId: number;
};

export const CollectionListsButtons = ({
  collectionUser,
  collectionId,
}: Props) => {
  const [isLoadingTransition, startTransition] = useTransition();
  const [currentCollectionUser, setCurrentCollectionUser] =
    useState(collectionUser);

  const handleClick = async (type: 'isWatched' | 'isBookmarked') => {
    startTransition(async () => {
      if (!currentCollectionUser) {
        const data = await createCollectionUserAction({
          collectionId,
          [type]: true,
        });
        setCurrentCollectionUser(data);
      } else {
        const data = await updateCollectionUserAction(
          currentCollectionUser.userId,
          collectionId,
          { [type]: !currentCollectionUser[type] },
        );
        setCurrentCollectionUser(data);
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

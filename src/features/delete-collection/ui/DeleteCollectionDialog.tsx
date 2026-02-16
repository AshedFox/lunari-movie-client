'use client';

import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { DeleteCollectionButton } from './DeleteCollectionButton';

type Props = {
  collectionId: number;
  redirect?: string;
};

export const DeleteCollectionDialog = ({ collectionId, redirect }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete collection</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove collection?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DeleteCollectionButton
            collectionId={collectionId}
            redirect={redirect}
            onSuccess={() => setOpen(false)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

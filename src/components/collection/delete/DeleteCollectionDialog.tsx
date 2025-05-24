'use client';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteCollection } from './actions';
import { Trash } from 'lucide-react';

type Props = {
  collectionId: number;
  redirect?: string;
};

export const DeleteCollectionDialog = ({ collectionId, redirect }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () =>
    toast.promise(
      async () => {
        const result = await deleteCollection(collectionId);
        if (result?.error) {
          throw new Error(result.error);
        }
      },
      {
        loading: 'Loading...',
        success: () => {
          setOpen(false);
          if (redirect) {
            router.replace(redirect);
          }
          return 'Successfully deleted collection';
        },
        error: (e) => e.message,
      },
    );
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
          <Button onClick={handleDelete}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

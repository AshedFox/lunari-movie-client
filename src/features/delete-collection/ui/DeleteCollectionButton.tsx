'use client';

import { Button } from '@shared/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteCollectionAction } from '../api/actions';

type Props = {
  collectionId: number;
  redirect?: string;
  onSuccess?: () => void;
};

export const DeleteCollectionButton = ({
  collectionId,
  redirect,
  onSuccess,
}: Props) => {
  const router = useRouter();
  const handleDelete = async () =>
    toast.promise(deleteCollectionAction(collectionId), {
      loading: 'Loading...',
      success: () => {
        if (redirect) {
          router.replace(redirect);
        }
        onSuccess?.();
        return 'Successfully deleted collection';
      },
      error: (e) => e.message,
    });

  return <Button onClick={handleDelete}>Submit</Button>;
};

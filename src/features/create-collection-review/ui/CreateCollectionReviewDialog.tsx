import { CreateCollectionReviewForm } from '@features/create-collection-review';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';

export const CreateCollectionReviewDialog = ({
  collectionId,
}: {
  collectionId: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Write review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write review</DialogTitle>
        </DialogHeader>
        <CreateCollectionReviewForm collectionId={collectionId} />
      </DialogContent>
    </Dialog>
  );
};

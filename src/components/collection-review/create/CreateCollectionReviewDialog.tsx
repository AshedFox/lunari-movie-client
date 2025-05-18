import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { CreateCollectionReviewForm } from './CreateCollectionReviewForm';

const CreateCollectionReviewDialog = ({
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

export { CreateCollectionReviewDialog };

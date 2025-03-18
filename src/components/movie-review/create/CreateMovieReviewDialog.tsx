import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { CreateMovieReviewForm } from './CreateMovieReviewForm';

const CreateMovieReviewDialog = ({ movieId }: { movieId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Write review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write review</DialogTitle>
        </DialogHeader>
        <CreateMovieReviewForm movieId={movieId} />
      </DialogContent>
    </Dialog>
  );
};

export { CreateMovieReviewDialog };

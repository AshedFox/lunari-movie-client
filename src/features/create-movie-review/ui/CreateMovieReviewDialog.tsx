import { CreateMovieReviewForm } from '@features/create-movie-review';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';

export const CreateMovieReviewDialog = ({ movieId }: { movieId: string }) => {
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

import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';
import { Button } from '@shared/ui/button';
import { FilePenLine } from 'lucide-react';

type Props = {
  children: ReactNode;
  trigger?: ReactNode;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const ReviewDialog = ({
  children,
  trigger,
  title = 'Write a Review',
  open,
  onOpenChange,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <FilePenLine size={16} />
            Write review
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

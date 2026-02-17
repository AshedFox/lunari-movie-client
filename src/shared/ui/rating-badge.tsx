import { Badge } from '@shared/ui/badge';
import { Star } from 'lucide-react';
import { cn } from '@shared/lib/utils';

type Props = {
  className?: string;
  rating: number;
  size?: 'sm' | 'md' | 'lg';
};

export const RatingBadge = ({ rating, className, size = 'sm' }: Props) => {
  return (
    <Badge
      variant="ghost"
      className={cn('bg-yellow-500', className)}
      size={size}
    >
      <Star fill="currentColor" />
      <span>{rating === 0 ? '-' : rating.toFixed(1)}</span>
    </Badge>
  );
};

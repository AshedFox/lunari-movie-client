import { ReactNode } from 'react';
import { FormattedDateRelative } from '@shared/ui/formatted-date-relative';
import { cn } from '@shared/lib/utils';
import { RatingBadge } from './rating-badge';

type Props = {
  avatarSlot: ReactNode;
  authorSlot: ReactNode;
  rating: number;
  text: string;
  createdAt: string;
  className?: string;
};

export const ReviewListItem = ({
  avatarSlot,
  authorSlot,
  rating,
  text,
  createdAt,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        'p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow',
        className,
      )}
    >
      <div className="flex items-start gap-4">
        {avatarSlot}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold">{authorSlot}</h3>
            <div className="flex items-center gap-4">
              <RatingBadge rating={rating} />
              <FormattedDateRelative
                className="text-sm text-muted-foreground"
                date={createdAt}
              />
            </div>
          </div>
          <p className="text-muted-foreground text-sm whitespace-pre-wrap">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

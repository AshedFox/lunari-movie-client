import { formatDistanceToNow } from 'date-fns';
import { cn } from '@lib/utils';
import { HTMLAttributes } from 'react';

interface FormattedDateRelativeProps extends HTMLAttributes<HTMLSpanElement> {
  date: Date | string | number;
  addSuffix?: boolean;
}

export function FormattedDateRelative({
  date,
  addSuffix = true,
  className,
  ...props
}: FormattedDateRelativeProps) {
  const dateObj = new Date(date);
  const formatted = formatDistanceToNow(dateObj, { addSuffix });

  return (
    <span
      className={cn('whitespace-nowrap', className)}
      suppressHydrationWarning
      {...props}
    >
      {formatted}
    </span>
  );
}

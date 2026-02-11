import {
  DATE_FORMATS,
  DateTimeFormat,
  DateTimeVariant,
} from '@lib/utils/format/formatters';
import { format as formatFn } from 'date-fns';
import { cn } from '@lib/utils';
import { HTMLAttributes } from 'react';

interface FormattedDateProps extends HTMLAttributes<HTMLSpanElement> {
  date: Date | string | number;
  variant?: DateTimeVariant;
  format?: DateTimeFormat;
}

export function FormattedDate({
  date,
  variant = 'date',
  format = 'short',
  className,
  ...props
}: FormattedDateProps) {
  const dateObj = new Date(date);
  const pattern = DATE_FORMATS[variant][format];
  const formatted = formatFn(dateObj, pattern);

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

import {
  DATE_FORMATS,
  DateTimeFormat,
  DateTimeVariant,
} from '@lib/utils/format/formatters';
import { format as formatFn } from 'date-fns';
import { cn } from '@lib/utils';
import { HTMLAttributes } from 'react';

interface FormattedDateRangeProps extends HTMLAttributes<HTMLSpanElement> {
  fromDate?: Date | string | number | null;
  toDate?: Date | string | number | null;
  variant?: DateTimeVariant;
  format?: DateTimeFormat;
}

export function FormattedDateRange({
  fromDate,
  toDate,
  variant = 'date',
  format = 'short',
  className,
  ...props
}: FormattedDateRangeProps) {
  const pattern = DATE_FORMATS[variant][format];

  const formattedStart = fromDate ? formatFn(new Date(fromDate), pattern) : '…';
  const formattedEnd = toDate ? formatFn(new Date(toDate), pattern) : '…';

  return (
    <span
      className={cn('whitespace-nowrap', className)}
      suppressHydrationWarning
      {...props}
    >
      {formattedStart} – {formattedEnd}
    </span>
  );
}

import {
  DATE_FORMATS,
  DateTimeFormat,
  DateTimeVariant,
} from '@shared/lib/format';
import { format as formatFn } from 'date-fns';
import { cn } from '@shared/lib/utils';
import { HTMLAttributes } from 'react';

interface FormattedDateRangeProps extends HTMLAttributes<HTMLSpanElement> {
  fromDate?: Date | string | number | null;
  toDate?: Date | string | number | null;
  variant?: DateTimeVariant;
  format?: DateTimeFormat | ({} & string);
}

export function FormattedDateRange({
  fromDate,
  toDate,
  variant = 'date',
  format = 'short',
  className,
  ...props
}: FormattedDateRangeProps) {
  const pattern =
    format in DATE_FORMATS[variant]
      ? DATE_FORMATS[variant][format as DateTimeFormat]
      : format;

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

import {
  DATE_FORMATS,
  DateTimeFormat,
  DateTimeVariant,
} from '@shared/lib/format/formatters';
import { format as formatFn } from 'date-fns';
import { cn } from '@shared/lib/utils';
import { HTMLAttributes } from 'react';

interface FormattedDateProps extends HTMLAttributes<HTMLSpanElement> {
  date: Date | string | number;
  variant?: DateTimeVariant;
  format?: DateTimeFormat | ({} & string);
}

export function FormattedDate({
  date,
  variant = 'date',
  format = 'short',
  className,
  ...props
}: FormattedDateProps) {
  const dateObj = new Date(date);
  const pattern =
    format in DATE_FORMATS[variant]
      ? DATE_FORMATS[variant][format as DateTimeFormat]
      : format;
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

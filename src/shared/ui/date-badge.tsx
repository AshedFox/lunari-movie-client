import { Badge, BadgeProps } from '@shared/ui/badge';
import { Calendar } from 'lucide-react';
import { FormattedDate } from '@shared/ui/formatted-date';
import { FormattedDateRange } from '@shared/ui/formatted-date-range';
import { cn } from '@shared/lib/utils';

type Props = BadgeProps & {
  date?: string | Date;
  fromDate?: string | Date;
  toDate?: string | Date | null;
  hideIcon?: boolean;
};

export const DateBadge = ({
  date,
  fromDate,
  toDate,
  className,
  variant = 'secondary',
  hideIcon,
  children,
  ...props
}: Props) => {
  if (!date && !fromDate && !children) return null;

  return (
    <Badge
      variant={variant}
      className={cn('px-3 py-2 gap-2', className)}
      {...props}
    >
      {!hideIcon && <Calendar size={16} />}
      {children ? (
        children
      ) : date ? (
        <FormattedDate date={date} />
      ) : (
        <FormattedDateRange fromDate={fromDate!} toDate={toDate} />
      )}
    </Badge>
  );
};

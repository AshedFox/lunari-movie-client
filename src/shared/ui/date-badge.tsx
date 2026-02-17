import { Badge, BadgeProps } from '@shared/ui/badge';
import { Calendar } from 'lucide-react';
import { FormattedDate } from '@shared/ui/formatted-date';
import { FormattedDateRange } from '@shared/ui/formatted-date-range';
import { DateTimeFormat } from '@shared/lib/format';

type Props = BadgeProps & {
  date?: string | Date;
  fromDate?: string | Date;
  toDate?: string | Date | null;
  format?: DateTimeFormat | ({} & string);
};

export const DateBadge = ({
  date,
  fromDate,
  toDate,
  variant = 'secondary',
  format,
  ...props
}: Props) => {
  if (!date && !fromDate) {
    return null;
  }

  return (
    <Badge variant={variant} {...props}>
      <Calendar />
      {date ? (
        <FormattedDate date={date} format={format} />
      ) : (
        <FormattedDateRange
          fromDate={fromDate!}
          toDate={toDate}
          format={format}
        />
      )}
    </Badge>
  );
};

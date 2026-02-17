import { addYears } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/button';
import { Calendar } from '@shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { FormattedDateRange } from './formatted-date-range';

type Props = {
  value?: DateRange;
  onSelect?: (value?: DateRange) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

export const DatePickerWithRange = ({
  value,
  onSelect,
  className,
  disabled,
  placeholder = 'Pick a date',
}: Props) => {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            disabled={disabled}
            className={cn(
              'font-normal justify-start text-left',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <FormattedDateRange fromDate={value.from} toDate={value.to} />
              ) : (
                <FormattedDateRange fromDate={value.from} />
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onSelect}
            disabled={(date) =>
              date > addYears(new Date(), 10) || date < new Date('1900-01-01')
            }
            numberOfMonths={2}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

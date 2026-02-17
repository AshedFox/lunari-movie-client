import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '@shared/lib/utils';
import { FormControl, FormField, FormItem, FormLabel } from '@shared/ui/form';
import { DatePickerWithRange } from './date-picker-with-range';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  className?: string;
  disabled?: boolean;
};

export const DateRangeField = <T extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DatePickerWithRange
              value={field.value}
              onSelect={field.onChange}
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

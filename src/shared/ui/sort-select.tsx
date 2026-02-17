import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui/select';
import { cn } from '@shared/lib/utils';
import { buttonVariants } from '@shared/ui/button';

type Props = {
  currentSort?: string;
  options: Record<string, string>;
  defaultSort?: string;
  className?: string;
  onValueChange: (value: string) => void;
};

export const SortSelect = ({
  currentSort,
  options,
  defaultSort,
  className,
  onValueChange,
}: Props) => {
  return (
    <Select
      defaultValue={currentSort ?? defaultSort}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'ml-auto w-fit min-w-28',
          className,
        )}
      >
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(options).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

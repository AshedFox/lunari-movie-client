import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@lib/utils';
import { buttonVariants } from '@components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import { Check, ChevronDown } from 'lucide-react';

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  value?: Option;
  options?: Option[];
  placeholder?: string;
  emptyMessage?: string;
  onChange?: (value?: Option) => void;
};

const Combobox = ({
  value,
  options = [],
  placeholder,
  onChange,
  emptyMessage,
}: MultiSelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'overflow-hidden hover:bg-transparent font-normal justify-between',
            !value && 'text-muted-foreground',
          )}
        >
          {value
            ? options.find((option) => option.value === value.value)?.label
            : placeholder}
          <ChevronDown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value?.value === option.value;

                return (
                  <CommandItem
                    value={option.label}
                    className={cn({
                      'text-muted-foreground': isSelected,
                    })}
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        onChange?.(undefined);
                      } else {
                        onChange?.(option);
                      }
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { Combobox };

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  CommandSeparator,
} from '@components/ui/command';
import { Check, ChevronDown, X } from 'lucide-react';
import { useDebounce } from '@lib/hooks/use-debounce';

type CommandGroupItemProps = {
  onSelect?: () => void;
  onUnselect?: () => void;
  option: Option;
  isSelected: boolean;
};

const CommandGroupItem = ({
  option,
  isSelected,
  onSelect,
  onUnselect,
}: CommandGroupItemProps) => {
  return (
    <CommandItem
      value={option.label}
      className={cn({
        'text-muted-foreground': isSelected,
      })}
      onSelect={() => {
        if (isSelected) {
          onUnselect?.();
        } else {
          onSelect?.();
        }
      }}
    >
      {option.label}
      <Check
        className={cn('ml-auto', isSelected ? 'opacity-100' : 'opacity-0')}
      />
    </CommandItem>
  );
};

export type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  value: Option[];
  options: Option[];
  placeholder?: string;
  emptyMessage?: string;
  onChange: (value: Option[]) => void;
};

const MultiSelect = ({
  value = [],
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
            'overflow-hidden hover:bg-transparent font-normal h-fit',
            !value.length && 'text-muted-foreground',
          )}
        >
          <div className="flex items-center justify-between flex-1">
            <div className="flex gap-1 flex-wrap">
              {!!value.length
                ? value.map((option) => {
                    return (
                      <div
                        key={option.value}
                        className="flex rounded border text-xs overflow-hidden items-center px-2 py-1 gap-1 shrink-0"
                      >
                        <span>{option.label}</span>
                        <button
                          className="hover:text-muted-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            onChange?.(
                              value.filter((v) => v.value !== option.value),
                            );
                          }}
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    );
                  })
                : placeholder}
            </div>
            <ChevronDown />
          </div>
          {!!value.length && (
            <button
              type="button"
              className="hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.([]);
              }}
            >
              <X />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty className="py-3 text-center text-sm">
              {emptyMessage}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandGroupItem
                  key={option.value}
                  option={option}
                  isSelected={value?.some(
                    (o: Option) => o.value === option.value,
                  )}
                  onSelect={() => onChange?.([...value, option])}
                  onUnselect={() =>
                    onChange?.(value.filter((o) => o.value !== option.value))
                  }
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

type AsyncMultiSelectProps = {
  value: Option[];
  options: Option[];
  placeholder?: string;
  noFoundMessage?: string;
  noSelectMessage?: string;
  onChange: (value: Option[]) => void;
  onSearch: (search: string) => void | Promise<void>;
};

const AsyncMultiSelect = ({
  value = [],
  options = [],
  placeholder,
  onChange,
  noFoundMessage,
  noSelectMessage,
  onSearch,
}: AsyncMultiSelectProps) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const debouncedSearch = useDebounce(searchValue, 500);
  const prevSearch = useRef<string>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldFocus, setShouldFocus] = useState(false);

  const withoutSelected = useMemo(() => {
    return options.filter(
      (option) => !value.some((v) => v.value === option.value),
    );
  }, [options, value]);

  useEffect(() => {
    const search = async () => {
      if (onSearch && prevSearch.current !== debouncedSearch) {
        setIsSearching(true);
        prevSearch.current = debouncedSearch;
        try {
          await onSearch?.(debouncedSearch);
        } finally {
          setIsSearching(false);
          setShouldFocus(true);
        }
      }
    };

    void search();
  }, [onSearch, debouncedSearch]);

  useEffect(() => {
    if (shouldFocus) {
      inputRef.current?.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'overflow-hidden hover:bg-transparent font-normal h-fit',
            !value.length && 'text-muted-foreground',
          )}
        >
          <div className="flex items-center justify-between flex-1">
            <div className="flex gap-1 flex-wrap">
              {!!value.length
                ? value.map((option) => {
                    return (
                      <div
                        key={option.value}
                        className="flex rounded border text-xs overflow-hidden items-center px-2 py-1 gap-1 shrink-0"
                      >
                        <span>{option.label}</span>
                        <button
                          className="hover:text-muted-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            onChange?.(
                              value.filter((v) => v.value !== option.value),
                            );
                          }}
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    );
                  })
                : placeholder}
            </div>
            <ChevronDown />
          </div>
          {!!value.length && (
            <button
              type="button"
              className="hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.([]);
              }}
            >
              <X />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={!onSearch}>
          <CommandInput
            ref={inputRef}
            value={searchValue}
            onValueChange={setSearchValue}
            disabled={isSearching}
            placeholder={placeholder}
            className="h-9"
          />
          <CommandList>
            <CommandGroup heading="Selected">
              {value.length > 0 ? (
                value.map((option) => (
                  <CommandGroupItem
                    key={option.value}
                    option={option}
                    isSelected={value?.some(
                      (o: Option) => o.value === option.value,
                    )}
                    onSelect={() => onChange?.([...value, option])}
                    onUnselect={() =>
                      onChange?.(value.filter((o) => o.value !== option.value))
                    }
                  />
                ))
              ) : (
                <div className="py-3 text-center text-sm">
                  {noSelectMessage}
                </div>
              )}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Found">
              {withoutSelected.length > 0 ? (
                withoutSelected.map((option) => (
                  <CommandGroupItem
                    key={option.value}
                    option={option}
                    isSelected={value?.some(
                      (o: Option) => o.value === option.value,
                    )}
                    onSelect={() => onChange?.([...value, option])}
                    onUnselect={() =>
                      onChange?.(value.filter((o) => o.value !== option.value))
                    }
                  />
                ))
              ) : (
                <div className="py-3 text-center text-sm">{noFoundMessage}</div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { AsyncMultiSelect, MultiSelect };

'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@shared/ui/form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@shared/ui/button';
import { FilterFormInput } from '../model/types';
import { Input } from '@shared/ui/input';
import { Option } from '@shared/ui/multi-select';
import { Combobox } from '@shared/ui/combobox';
import { EMPTY_FILTERS } from '../config';
import { cn } from '@shared/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { Calendar } from '@shared/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { addYears, format } from 'date-fns';

type Props = {
  formInit?: FilterFormInput;
};

const COLLECTION_TYPE_OPTIONS: Option[] = [
  { value: 'official', label: 'Official' },
  { value: 'user', label: 'User-Created' },
];

export const CollectionsFilters = ({ formInit = EMPTY_FILTERS }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<FilterFormInput>({
    defaultValues: formInit,
  });

  const resetParams = (params: URLSearchParams) => {
    Object.keys(form.getValues()).forEach((key) => {
      params.delete(key);
    });
  };

  const setParams = (params: URLSearchParams, input: FilterFormInput) => {
    Object.entries(input).forEach(([key, value]) => {
      if (typeof value === 'string' && value !== '') {
        params.set(key, value);
      } else if (typeof value === 'boolean') {
        params.set(key, String(value));
      } else if (typeof value === 'object') {
        if (value.from) {
          params.set(`${key}From`, value.from.toISOString());
        }
        if (value.to) {
          params.set(`${key}To`, value.to.toISOString());
        }
      }
    });
  };

  const onSubmit = (input: FilterFormInput) => {
    const params = new URLSearchParams(searchParams);

    resetParams(params);
    setParams(params, input);
    params.delete('page');

    router.push(`${pathname}?${params}`);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    resetParams(params);
    router.push(`${pathname}?${params}`);
    form.reset(EMPTY_FILTERS);
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input placeholder="Search..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Created At</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'font-normal justify-start text-left',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > addYears(new Date(), 10) ||
                      date < new Date('1900-01-01')
                    }
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="updatedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last Modified</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'font-normal justify-start text-left',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > addYears(new Date(), 10) ||
                      date < new Date('1900-01-01')
                    }
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSystem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Combobox
                  value={
                    field.value === true
                      ? COLLECTION_TYPE_OPTIONS[0]
                      : field.value === false
                        ? COLLECTION_TYPE_OPTIONS[1]
                        : undefined
                  }
                  options={COLLECTION_TYPE_OPTIONS}
                  placeholder={'Select type'}
                  onChange={(option) =>
                    form.setValue(
                      'isSystem',
                      option
                        ? option.value === 'official'
                          ? true
                          : false
                        : undefined,
                      { shouldDirty: true },
                    )
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-1">
          <Button type="submit">Search</Button>
          <Button variant="destructive" type="reset" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

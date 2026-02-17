'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@shared/ui/form';
import { Button } from '@shared/ui/button';
import { FilterFormInput } from '../model/types';
import { useFilterForm } from '@shared/lib/hooks/use-filter-form';
import { Input } from '@shared/ui/input';
import { Option } from '@shared/ui/multi-select';
import { Combobox } from '@shared/ui/combobox';
import { EMPTY_FILTERS } from '../config';
import { DateRangeField } from '@shared/ui/date-range-field';

type Props = {
  formInit?: FilterFormInput;
};

const COLLECTION_TYPE_OPTIONS: Option[] = [
  { value: 'official', label: 'Official' },
  { value: 'user', label: 'User-Created' },
];

export const CollectionsFilters = ({ formInit = EMPTY_FILTERS }: Props) => {
  const form = useForm<FilterFormInput>({
    defaultValues: formInit,
  });

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

  const { onSubmit, handleReset } = useFilterForm({
    form,
    setParams,
    defaultValues: EMPTY_FILTERS,
  });

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
        <DateRangeField
          control={form.control}
          name="createdAt"
          label="Created At"
        />
        <DateRangeField
          control={form.control}
          name="updatedAt"
          label="Last Modified"
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

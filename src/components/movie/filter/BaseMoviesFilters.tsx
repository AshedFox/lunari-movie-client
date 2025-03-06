'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { MultiSelect, Option } from '@components/ui/multi-select';
import { AgeRestrictionEnum } from '@lib/graphql/generated/graphql';
import { UseFormReturn } from 'react-hook-form';
import { FilterFormInput } from './types';
import { StudiosSelect } from '@components/studio/select';

type Props = {
  form: UseFormReturn<FilterFormInput>;
  ageRestrictionsOptions: Option[];
  countriesOptions: Option[];
  genresOptions: Option[];
};

function BaseMoviesFilters({
  form,
  ageRestrictionsOptions,
  countriesOptions,
  genresOptions,
}: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
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
        name="ageRestriction"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age Restriction</FormLabel>
            <FormControl>
              <MultiSelect
                value={ageRestrictionsOptions.filter((option) =>
                  field.value.some((v) => v === option.value),
                )}
                placeholder={'Search age restriction...'}
                emptyMessage={'No age restrictions.'}
                options={ageRestrictionsOptions}
                onChange={(value) =>
                  form.setValue(
                    field.name,
                    value.map(
                      (option) =>
                        AgeRestrictionEnum[
                          option.value as keyof typeof AgeRestrictionEnum
                        ],
                    ),
                    { shouldDirty: true },
                  )
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="countries"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Countries</FormLabel>
            <FormControl>
              <MultiSelect
                value={countriesOptions.filter((option) =>
                  field.value.includes(option.value),
                )}
                placeholder={'Search country...'}
                emptyMessage={'No countries.'}
                options={countriesOptions}
                onChange={(value) =>
                  form.setValue(
                    field.name,
                    value.map((option) => option.value),
                    { shouldDirty: true },
                  )
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="genres"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Genres</FormLabel>
            <FormControl>
              <MultiSelect
                value={genresOptions.filter((option) =>
                  field.value.includes(option.value),
                )}
                placeholder={'Search genre...'}
                emptyMessage={'No genres.'}
                options={genresOptions}
                onChange={(value) =>
                  form.setValue(
                    field.name,
                    value.map((option) => option.value),
                    { shouldDirty: true },
                  )
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
      <StudiosSelect
        control={form.control}
        onChange={(value) =>
          form.setValue('studios', value, { shouldDirty: true })
        }
      />
    </>
  );
}

export { BaseMoviesFilters };

'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@shared/ui/form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@shared/ui/button';
import { BaseMoviesFilters } from './BaseMoviesFilters';
import { EMPTY_FILTERS } from '../config';
import { FilterFormInput } from '../model/types';
import {
  BaseCountryFragment,
  BaseGenreFragment,
  AgeRestrictionEnum,
} from '@shared/api/graphql/graphql';

type Props = {
  countries: BaseCountryFragment[];
  genres: BaseGenreFragment[];
  formInit?: FilterFormInput;
};

export const MoviesFilters = ({
  countries,
  genres,
  formInit = EMPTY_FILTERS,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const countriesOptions = useMemo(
    () =>
      countries.map((country) => ({ value: country.id, label: country.name })),
    [countries],
  );

  const genresOptions = useMemo(
    () => genres.map((genre) => ({ value: genre.id, label: genre.name })),
    [genres],
  );

  const ageRestrictionsOptions = useMemo(() => {
    return Object.entries(AgeRestrictionEnum).map((entry) => ({
      label: entry[0],
      value: entry[1].toString(),
    }));
  }, []);

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
      } else if (typeof value === 'object' && value.length > 0) {
        if (typeof value[0] === 'object') {
          params.set(
            key,
            JSON.stringify(
              (value as { label: string; value: string }[]).map((v) => v.value),
            ),
          );
        } else {
          params.set(key, JSON.stringify(value));
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
        <BaseMoviesFilters
          form={form}
          ageRestrictionsOptions={ageRestrictionsOptions}
          countriesOptions={countriesOptions}
          genresOptions={genresOptions}
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

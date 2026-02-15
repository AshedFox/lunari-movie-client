'use client';

import { useLazyQuery } from '@apollo/client/react';
import { GetStudiosDocument } from '@shared/api/graphql/graphql';
import { FormField, FormItem, FormLabel, FormControl } from '@shared/ui/form';
import { AsyncMultiSelect, Option } from '@shared/ui/multi-select';
import { useMemo } from 'react';
import { Control, Path } from 'react-hook-form';

type Props<T extends { studios: Option[] }> = {
  control: Control<T>;
  onChange: (value: Option[]) => void;
  count?: number;
};

export function StudiosSelect<T extends { studios: Option[] }>({
  control,
  onChange,
  count = 30,
}: Props<T>) {
  const [getStudios, { data: studiosData }] = useLazyQuery(GetStudiosDocument);

  const studiosOptions = useMemo(
    () =>
      (studiosData?.getStudios?.nodes ?? []).map((studio) => ({
        value: studio.id,
        label: studio.name,
      })),
    [studiosData],
  );

  return (
    <FormField
      control={control}
      name={'studios' as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Studios</FormLabel>
          <FormControl>
            <AsyncMultiSelect
              value={field.value as Option[]}
              placeholder={'Search studio...'}
              noFoundMessage={'No studios found.'}
              noSelectMessage={'No studios selected.'}
              options={studiosOptions}
              onChange={onChange}
              onSearch={async (search) => {
                await getStudios({
                  variables: {
                    limit: count,
                    offset: 0,
                    filter: { name: { ilike: search } },
                  },
                  context: {
                    skipAuth: true,
                  },
                });
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

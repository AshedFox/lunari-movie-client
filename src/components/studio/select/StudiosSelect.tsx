'use client';

import { useLazyQuery } from '@apollo/client/react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@components/ui/form';
import { AsyncMultiSelect, Option } from '@components/ui/multi-select';
import { GetFilterStudiosDocument } from '@lib/graphql/generated/graphql';
import { useMemo } from 'react';
import { Control, Path } from 'react-hook-form';

type Props<T extends { studios: Option[] }> = {
  control: Control<T>;
  onChange: (value: Option[]) => void;
  count?: number;
};

function StudiosSelect<T extends { studios: Option[] }>({
  control,
  onChange,
  count = 30,
}: Props<T>) {
  const [getStudios, { data: studiosData }] = useLazyQuery(
    GetFilterStudiosDocument,
    {
      errorPolicy: 'ignore',
      context: {
        skipAuth: true,
      },
    },
  );

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
                    search,
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

export { StudiosSelect };

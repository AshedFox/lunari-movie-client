'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SortSelect } from '@shared/ui/sort-select';
import { SORT_OPTIONS, SORT_VARIANTS } from '../config/constants';

type Props = {
  currentSort?: string;
};

export const MoviesSort = ({ currentSort }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      params.delete('page');

      return params.toString();
    },
    [searchParams],
  );

  const onValueChange = (value: string) => {
    router.replace(`${pathname}?${createQueryString('sort', value)}`);
  };

  return (
    <SortSelect
      currentSort={currentSort}
      options={SORT_OPTIONS}
      defaultSort={SORT_VARIANTS[0]}
      onValueChange={onValueChange}
    />
  );
};

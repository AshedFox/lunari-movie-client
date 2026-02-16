'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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

  return (
    <Select
      defaultValue={currentSort ?? SORT_VARIANTS[0]}
      onValueChange={(value) => {
        router.replace(`${pathname}?${createQueryString('sort', value)}`);
      }}
    >
      <SelectTrigger
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'ml-auto w-fit min-w-28',
        )}
      >
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(SORT_OPTIONS).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

'use client';

import { buttonVariants } from '@components/ui/button';
import { cn } from '@lib/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SORT_VARIANTS, SORT_OPTIONS } from './constants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

type Props = {
  currentSort?: string;
};

export const CollectionsSort = ({ currentSort }: Props) => {
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

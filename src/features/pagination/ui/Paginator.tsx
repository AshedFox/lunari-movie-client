'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@shared/ui/pagination';
import { makePaginationPages } from '../lib/utils';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  showNextPrev?: boolean;
  className?: string;
};

export const Paginator = ({
  currentPage,
  totalPages,
  showNextPrev,
  className,
}: PaginatorProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const makeHref = useCallback(
    (page: number) => {
      return `${pathname}?${createQueryString('page', page.toString())}`;
    },
    [pathname, createQueryString],
  );

  return (
    <Pagination className={className}>
      <PaginationContent>
        {showNextPrev && (
          <PaginationItem>
            <PaginationPrevious
              href={makeHref(currentPage - 1)}
              disabled={currentPage <= 1}
            />
          </PaginationItem>
        )}
        {makePaginationPages(currentPage, totalPages, makeHref)}
        {showNextPrev && (
          <PaginationItem>
            <PaginationNext
              href={makeHref(currentPage + 1)}
              disabled={currentPage >= totalPages}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

'use client';

import * as React from 'react';
import { ReactNode, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination';

function makePaginationPages(
  currentPage: number,
  totalPages: number,
  makeHref: (page: number) => string,
): ReactNode[] {
  const pageItems: ReactNode[] = [];

  const createPageItem = (page: number) => (
    <PaginationItem key={page}>
      <PaginationLink
        href={makeHref(page)}
        isActive={page === currentPage}
        disabled={page === currentPage}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );

  const createEllipsis = (key: string) => (
    <PaginationItem key={key}>
      <PaginationEllipsis />
    </PaginationItem>
  );

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(createPageItem(i));
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      pageItems.push(createPageItem(i));
    }

    if (currentPage > 2 && currentPage < totalPages - 1) {
      pageItems.push(createEllipsis('start'));
      pageItems.push(createPageItem(currentPage));
    }

    pageItems.push(createEllipsis('end'));

    for (let i = totalPages - 1; i <= totalPages; i++) {
      pageItems.push(createPageItem(i));
    }
  }

  return pageItems;
}

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  showNextPrev?: boolean;
  className?: string;
};

function Paginator({
  currentPage,
  totalPages,
  showNextPrev,
  className,
}: PaginatorProps) {
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
}

export { Paginator };

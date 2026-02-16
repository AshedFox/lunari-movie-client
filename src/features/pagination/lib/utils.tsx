import {
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@shared/ui/pagination';
import { ReactNode } from 'react';

export function makePaginationPages(
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

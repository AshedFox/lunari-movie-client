'use client';

import { GetCollectionTabsInfoQuery } from '@lib/graphql/generated/graphql';
import { cn } from '@lib/utils';
import { Film, Star } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ReactNode } from 'react';

type TabsCollectionInfo = GetCollectionTabsInfoQuery['getCollection'];

type TabInfo = {
  value: string | null;
  makeHref: (id: number) => string;
} & (
  | {
      countKey: keyof Omit<TabsCollectionInfo, 'id'>;
      label: (count: number) => ReactNode;
    }
  | { countKey: undefined; label: ReactNode }
);

const tabs: TabInfo[] = [
  {
    countKey: 'moviesCount',
    makeHref: (id) => `/collections/${id}`,
    value: null,
    label: (count) => (
      <span className="flex items-center gap-1">
        <Film size={14} />
        <span>
          <span>Movies</span>
          <span className="text-xs align-text-top">({count})</span>
        </span>
      </span>
    ),
  },
  {
    countKey: 'reviewsCount',
    makeHref: (id) => `/collections/${id}/reviews`,
    value: 'reviews',
    label: (count) => (
      <span className="flex items-center gap-1">
        <Star size={14} />
        <span>
          <span>Reviews</span>
          <span className="text-xs align-text-top">({count})</span>
        </span>
      </span>
    ),
  },
] as const;

type Props = {
  id: number;
  tabsInfo: GetCollectionTabsInfoQuery['getCollection'];
};

const TabsNav = ({ id, tabsInfo }: Props) => {
  const tab = useSelectedLayoutSegment();

  return (
    <nav className="text-muted-foreground inline-flex items-center flex-wrap gap-y-5 text-sm w-full justify-start rounded-none border-b">
      {tabs.map(({ makeHref, label, value, countKey }) => (
        <Link
          key={value}
          href={makeHref(id)}
          replace={true}
          scroll={false}
          className={cn(
            'border-b-2 border-b-transparent rounded-none pb-3 font-semibold px-2 hover:text-muted-foreground/60',
            {
              'border-b-primary text-primary pointer-events-none':
                tab === value,
            },
          )}
        >
          {countKey ? label(tabsInfo[countKey]) : label}
        </Link>
      ))}
    </nav>
  );
};

export default TabsNav;

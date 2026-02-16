'use client';

import { cn } from '@shared/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { GetSeriesTabsInfoQuery } from '@shared/api/graphql/graphql';
import { getSeriesTabsConfig } from '../config';

type Props = {
  id: string;
  tabsInfo: GetSeriesTabsInfoQuery['getOneSeries'];
};

export const SeriesTabsNav = ({ id, tabsInfo }: Props) => {
  const segment = useSelectedLayoutSegment('tab');
  const tabs = getSeriesTabsConfig(id, tabsInfo);

  return (
    <nav className="text-muted-foreground inline-flex items-center text-sm w-full justify-start rounded-none border-b">
      {tabs.map(({ href, label, value, count }) => (
        <Link
          key={value}
          href={href}
          className={cn(
            'border-b-2 border-b-transparent rounded-none pb-3 font-semibold px-2 hover:text-muted-foreground/60',
            {
              'border-b-primary text-primary pointer-events-none':
                segment === value,
            },
          )}
        >
          {label}
          {count !== undefined && (
            <span className="text-xs align-text-top">({count})</span>
          )}
        </Link>
      ))}
    </nav>
  );
};

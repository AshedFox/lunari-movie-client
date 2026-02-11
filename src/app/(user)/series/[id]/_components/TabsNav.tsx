'use client';

import { GetSeriesTabsInfoQuery } from '@lib/graphql/generated/graphql';
import { cn } from '@lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

type TabInfo = {
  countKey?: keyof Omit<GetSeriesTabsInfoQuery['getOneSeries'], 'id'>;
  value: string;
  label: string;
  makeHref: (id: string) => string;
};

const tabs: TabInfo[] = [
  {
    makeHref: (id: string) => `/series/${id}`,
    value: '(slot)',
    label: 'About',
  },
  {
    countKey: 'trailersCount',
    makeHref: (id: string) => `/series/${id}/trailers`,
    value: 'trailers',
    label: 'Trailers',
  },
  {
    countKey: 'movieImagesCount',
    makeHref: (id: string) => `/series/${id}/images`,
    value: 'images',
    label: 'Images',
  },
  {
    countKey: 'moviePersonsCount',
    makeHref: (id: string) => `/series/${id}/persons`,
    value: 'persons',
    label: 'Persons',
  },
  {
    countKey: 'reviewsCount',
    makeHref: (id: string) => `/series/${id}/reviews`,
    value: 'reviews',
    label: 'Reviews',
  },
] as const;

type Props = {
  id: string;
  tabsInfo: GetSeriesTabsInfoQuery['getOneSeries'];
};

const TabsNav = ({ id, tabsInfo }: Props) => {
  const tab = useSelectedLayoutSegment('tab');

  return (
    <nav className="text-muted-foreground inline-flex items-center text-sm w-full justify-start rounded-none border-b">
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
          {label}
          {countKey && (
            <span className="text-xs align-text-top">
              ({tabsInfo[countKey]})
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default TabsNav;

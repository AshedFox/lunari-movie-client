'use client';

import { GetFilmTabsInfoQuery } from '@lib/graphql/generated/graphql';
import { cn } from '@lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

type TabInfo = {
  countKey?: keyof Omit<GetFilmTabsInfoQuery['getFilm'], 'id'>;
  value: string;
  label: string;
  makeHref: (id: string) => string;
};

const tabs: TabInfo[] = [
  {
    makeHref: (id: string) => `/films/${id}`,
    value: 'page$',
    label: 'About',
  },
  {
    countKey: 'trailersCount',
    makeHref: (id: string) => `/films/${id}/trailers`,
    value: 'trailers',
    label: 'Trailers',
  },
  {
    countKey: 'movieImagesCount',
    makeHref: (id: string) => `/films/${id}/images`,
    value: 'images',
    label: 'Images',
  },
  {
    countKey: 'moviePersonsCount',
    makeHref: (id: string) => `/films/${id}/persons`,
    value: 'persons',
    label: 'Persons',
  },
  {
    countKey: 'reviewsCount',
    makeHref: (id: string) => `/films/${id}/reviews`,
    value: 'reviews',
    label: 'Reviews',
  },
] as const;

type Props = {
  id: string;
  tabsInfo: GetFilmTabsInfoQuery['getFilm'];
};

const TabsNav = ({ id, tabsInfo }: Props) => {
  const tab = useSelectedLayoutSegment('tab');

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

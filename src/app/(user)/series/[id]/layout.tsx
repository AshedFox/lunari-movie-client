import { getSeriesTabsInfo } from '@entities/series/server';
import { MovieVisitTracker } from '@features/track-visit';
import { SeriesTabsNav } from '@widgets/series-tabs';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  tab: ReactNode;
  params: Promise<{
    id: string;
  }>;
};

const Layout = async ({ children, tab, params }: Props) => {
  const { id } = await params;
  const seriesTabsInfo = await getSeriesTabsInfo(id);

  return (
    <div className="space-y-10">
      {children}
      <div className="flex flex-col gap-2 container ">
        <SeriesTabsNav id={id} tabsInfo={seriesTabsInfo} />
        <div className="py-4">{tab}</div>
      </div>
      <MovieVisitTracker movieId={id} />
    </div>
  );
};

export default Layout;

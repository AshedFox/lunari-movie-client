'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { GetSeriesTabsInfoQuery } from '@shared/api/graphql/graphql';
import { getSeriesTabsConfig } from '../config';
import { TabsNav } from '@shared/ui/tabs-nav';

type Props = {
  id: string;
  tabsInfo: GetSeriesTabsInfoQuery['getOneSeries'];
};

export const SeriesTabsNav = ({ id, tabsInfo }: Props) => {
  const segment = useSelectedLayoutSegment('tab');
  const tabs = getSeriesTabsConfig(id, tabsInfo);

  return <TabsNav tabs={tabs} activeValue={segment} />;
};

'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { GetCollectionTabsInfoQuery } from '@shared/api/graphql/graphql';
import { getCollectionTabsConfig } from '../config';
import { TabsNav } from '@shared/ui/tabs-nav';

type Props = {
  id: number;
  tabsInfo: GetCollectionTabsInfoQuery['getCollection'];
};

export const CollectionTabsNav = ({ id, tabsInfo }: Props) => {
  const segment = useSelectedLayoutSegment('tab');
  const tabs = getCollectionTabsConfig(id, tabsInfo);

  return <TabsNav tabs={tabs} activeValue={segment} />;
};

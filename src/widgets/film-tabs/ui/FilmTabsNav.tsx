'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { GetFilmTabsInfoQuery } from '@shared/api/graphql/graphql';
import { getFilmTabsConfig } from '../config';
import { TabsNav } from '@shared/ui/tabs-nav';

type Props = {
  id: string;
  tabsInfo: GetFilmTabsInfoQuery['getFilm'];
};

export const FilmTabsNav = ({ id, tabsInfo }: Props) => {
  const segment = useSelectedLayoutSegment('tab');
  const tabs = getFilmTabsConfig(id, tabsInfo);

  return <TabsNav tabs={tabs} activeValue={segment} />;
};

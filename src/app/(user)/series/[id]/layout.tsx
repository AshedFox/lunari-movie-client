import { ReactNode } from 'react';
import TabsNav from './_components/TabsNav';
import { getClient } from '@lib/apollo/rsc-client';
import { GetSeriesTabsInfoDocument } from '@lib/graphql/generated/graphql';
import MovieVisitTracker from '@components/common/MovieVisitTracker';

type Props = {
  children: ReactNode;
  tab: ReactNode;
  params: Promise<{
    id: string;
  }>;
};

const getSeriesTabsInfo = async (id: string) => {
  const { data } = await getClient().query({
    query: GetSeriesTabsInfoDocument,
    variables: {
      id,
    },
  });

  return data.getOneSeries;
};

const Layout = async ({ children, tab, params }: Props) => {
  const { id } = await params;
  const filmTabsInfo = await getSeriesTabsInfo(id);

  return (
    <div className="space-y-10">
      {children}
      <div className="flex flex-col gap-2 container ">
        <TabsNav id={id} tabsInfo={filmTabsInfo} />
        <div className="py-4">{tab}</div>
      </div>
      <MovieVisitTracker movieId={id} />
    </div>
  );
};

export default Layout;

import { ReactNode } from 'react';
import TabsNav from './_components/TabsNav';
import { getClient } from '@lib/apollo/rsc-client';
import { GetFilmTabsInfoDocument } from '@lib/graphql/generated/graphql';

type Props = {
  children: ReactNode;
  tab: ReactNode;
  params: Promise<{
    id: string;
  }>;
};

const getFilmTabsInfo = async (id: string) => {
  const { data } = await getClient().query({
    query: GetFilmTabsInfoDocument,
    variables: {
      id,
    },
  });

  return data.getFilm;
};

const Layout = async ({ children, tab, params }: Props) => {
  const { id } = await params;
  const filmTabsInfo = await getFilmTabsInfo(id);

  return (
    <div className="space-y-10">
      {children}
      <div className="flex flex-col gap-2 container">
        <TabsNav id={id} tabsInfo={filmTabsInfo} />
        <div className="py-4">{tab}</div>
      </div>
    </div>
  );
};

export default Layout;

import { ReactNode } from 'react';
import { getClient } from '@lib/apollo/rsc-client';
import { GetCollectionTabsInfoDocument } from '@lib/graphql/generated/graphql';
import TabsNav from './_components/TabsNav';
import { paramsSchema } from './_validation/params-schema';

type Props = {
  children: ReactNode;
  tab: ReactNode;
  params: Promise<{
    id: string;
  }>;
};

const getCollectionTabsInfo = async (id: number) => {
  const { data } = await getClient().query({
    query: GetCollectionTabsInfoDocument,
    variables: {
      id,
    },
  });

  return data.getCollection;
};

const Layout = async ({ children, tab, params }: Props) => {
  const { id } = paramsSchema.parse(await params);

  const collectionTabsInfo = await getCollectionTabsInfo(id);

  return (
    <div className="space-y-10">
      {children}
      <div className="flex flex-col gap-2 container">
        <TabsNav id={id} tabsInfo={collectionTabsInfo} />
        <div className="py-4">{tab}</div>
      </div>
    </div>
  );
};

export default Layout;

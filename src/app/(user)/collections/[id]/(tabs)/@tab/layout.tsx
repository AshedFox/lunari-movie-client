import { getClient } from '@lib/apollo/rsc-client';
import { GetCollectionTabsInfoDocument } from '@lib/graphql/generated/graphql';
import TabsNav from './_components/TabsNav';
import { paramsSchema } from '../../_validation/params-schema';
import { ReactNode } from 'react';

type Props = {
  params: Promise<{
    id: string;
  }>;
  children: ReactNode;
};

const getCollectionTabsInfo = async (id: number) => {
  const { data, error } = await getClient().query({
    query: GetCollectionTabsInfoDocument,
    variables: {
      id,
    },
  });

  if (!data || error) {
    throw new Error(error?.message ?? 'Failed to fetch');
  }

  return data.getCollection;
};

const Layout = async ({ children, params }: Props) => {
  const { id } = paramsSchema.parse(await params);
  const collectionTabsInfo = await getCollectionTabsInfo(id);

  return (
    <div className="flex flex-col gap-2 container">
      <TabsNav id={id} tabsInfo={collectionTabsInfo} />
      <div className="py-4">{children}</div>
    </div>
  );
};

export default Layout;

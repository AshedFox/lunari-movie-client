import { getCollectionTabsInfo } from '@entities/collection/server';
import { CollectionTabsNav } from '@widgets/collection-tabs';
import { ReactNode } from 'react';

type Props = {
  params: Promise<{
    id: string;
  }>;
  children: ReactNode;
};

const Layout = async ({ children, params }: Props) => {
  const { id } = await params;
  const collectionTabsInfo = await getCollectionTabsInfo(Number(id));

  return (
    <div className="flex flex-col gap-2 container">
      <CollectionTabsNav id={Number(id)} tabsInfo={collectionTabsInfo} />
      <div className="py-4">{children}</div>
    </div>
  );
};

export default Layout;

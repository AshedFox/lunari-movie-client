import { getCurrentUser } from '@entities/user/server';
import { Metadata } from 'next';
import { fetchCollectionUser } from '@entities/collection-user/server';
import { getCollection } from '@entities/collection/server';
import { CollectionPage } from '@/views/collection';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 60;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const collection = await getCollection(Number(id));

  return {
    title: collection.name,
    description: collection.description,
  };
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const [collection, collectionUser] = await Promise.all([
    getCollection(Number(id)),
    user ? fetchCollectionUser(user.id, Number(id)) : null,
  ]);

  return (
    <CollectionPage
      collection={collection}
      collectionUser={collectionUser}
      user={user}
    />
  );
};

export default Page;

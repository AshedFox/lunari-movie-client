import { CollectionPage } from '@components/collection/page';
import { getCurrentUser } from '@services/user.service';
import { Metadata } from 'next';
import { paramsSchema } from '../_validation/params-schema';
import { fetchCollectionUser } from '@services/collection-user.service';
import { getCollection } from '@services/collection.service';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 60;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = paramsSchema.parse(await params);
  const collection = await getCollection(id);

  return {
    title: collection.name,
    description: collection.description,
  };
};

const Page = async ({ params }: Props) => {
  const { id } = paramsSchema.parse(await params);

  const user = await getCurrentUser();

  const [collection, collectionUser] = await Promise.all([
    getCollection(id),
    user ? fetchCollectionUser(user.id, id) : null,
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

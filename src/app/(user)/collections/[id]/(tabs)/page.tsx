import { CollectionPage } from '@components/collection/page';
import { getUser } from '@lib/auth/user-dal';
import { Metadata } from 'next';
import { paramsSchema } from '../_validation/params-schema';
import { getCollection, getCollectionUser } from '../_lib/api';

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

  const user = await getUser();
  const collectionPromise = getCollection(id);
  const collectionUserPromise = user ? getCollectionUser(user.id, id) : null;

  const [collection, collectionUser] = await Promise.all([
    collectionPromise,
    collectionUserPromise,
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

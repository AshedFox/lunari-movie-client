import { CollectionPage } from '@components/collection/page';
import { getClient } from '@lib/apollo/rsc-client';
import { getUser } from '@lib/auth/user-dal';
import {
  CollectionFragment,
  CollectionUserFragment,
  GetCollectionDocument,
  GetCollectionUserDocument,
} from '@lib/graphql/generated/graphql';
import { Metadata } from 'next';
import { paramsSchema } from './_validation/params-schema';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 60;

const getCollection = async (id: number): Promise<CollectionFragment> => {
  const { data } = await getClient().query({
    query: GetCollectionDocument,
    variables: {
      id,
    },
  });

  return data.getCollection;
};

const getCollectionUser = async (
  userId: string,
  collectionId: number,
): Promise<CollectionUserFragment | null> => {
  const { data } = await getClient().query({
    query: GetCollectionUserDocument,
    variables: {
      collectionId,
      userId,
    },
    errorPolicy: 'all',
  });

  return data?.getCollectionUser ?? null;
};

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

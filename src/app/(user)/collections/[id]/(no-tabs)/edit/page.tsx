import { getCollection } from '@entities/collection/server';
import { getCurrentUser } from '@entities/user/server';
import { notFound, redirect } from 'next/navigation';
import { EditCollectionPage } from '@/views/edit-collection';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const [collection, user] = await Promise.all([
    getCollection(Number(id)),
    getCurrentUser(),
  ]);

  if (!user) {
    redirect(`/login?from=/collections/${id}/edit`);
  }

  if (user.id !== collection.owner.id) {
    notFound();
  }

  return <EditCollectionPage collection={collection} />;
};

export default Page;

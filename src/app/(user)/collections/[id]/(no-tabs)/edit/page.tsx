import { EditCollectionPage } from '@components/collection/edit';
import { paramsSchema } from '../../_validation/params-schema';
import { getCurrentUser } from '@services/user.service';
import { notFound, redirect } from 'next/navigation';
import { getCollection } from '@services/collection.service';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = paramsSchema.parse(await params);
  const [collection, user] = await Promise.all([
    getCollection(id),
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

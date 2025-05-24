import { EditCollectionPage } from '@components/collection/edit';
import { paramsSchema } from '../../_validation/params-schema';
import { getCollection } from '../../_lib/api';
import { getUser } from '@lib/auth/user-dal';
import { notFound, redirect } from 'next/navigation';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = paramsSchema.parse(await params);
  const collection = await getCollection(id);
  const user = await getUser();

  if (!user) {
    redirect(`/login?from=/collections/${id}/edit`);
  }

  if (user.id !== collection.owner.id) {
    notFound();
  }

  return <EditCollectionPage collection={collection} />;
};

export default Page;

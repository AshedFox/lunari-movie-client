import { getUser } from '@entities/user/api/server';
import { UserPage } from '@/views/user';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const user = await getUser(id);

  return {
    title: user.name,
  };
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getUser(id);

  return <UserPage user={user} />;
};

export default Page;

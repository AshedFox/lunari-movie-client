import { UserPage } from '@components/user/page';
import { getClient } from '@lib/apollo/rsc-client';
import {
  GetUserDocument,
  UserProfileFragment,
} from '@lib/graphql/generated/graphql';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const getUser = async (id: string): Promise<UserProfileFragment> => {
  const { data, error } = await getClient().query({
    query: GetUserDocument,
    variables: {
      id,
    },
  });

  if (!data || error) {
    throw new Error(error?.message ?? 'Failed to fetch');
  }

  return data.getUser;
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

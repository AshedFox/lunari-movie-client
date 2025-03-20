import { getUser } from '@lib/auth/user-dal';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { UserPage } from '@components/user/page';

export const metadata: Metadata = {
  title: 'Profile',
};

const Page = async () => {
  const user = await getUser();

  if (!user) {
    redirect('/login?from=/users/me');
  }

  return <UserPage user={user} />;
};

export default Page;

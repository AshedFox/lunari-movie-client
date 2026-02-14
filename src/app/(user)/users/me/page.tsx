import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { UserPage } from '@components/user/page';
import { getCurrentUser } from '@services/user.service';

export const metadata: Metadata = {
  title: 'Profile',
};

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?from=/users/me');
  }

  return <UserPage user={user} />;
};

export default Page;

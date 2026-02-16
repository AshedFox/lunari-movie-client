import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getCurrentUser } from '@entities/user/api/server';
import { UserPage } from '@/views/user';

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

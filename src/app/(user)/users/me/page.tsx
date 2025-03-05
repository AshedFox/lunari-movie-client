import { getUser } from '@lib/auth/user-dal';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { CheckCircle2 } from 'lucide-react';
import VerifyEmailButton from '@components/common/VerifyEmailButton';
import { ISODateToLocale } from '@lib/utils/format';

export const metadata: Metadata = {
  title: 'Profile',
};

const Page = async () => {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col gap-1.5 py-10 container">
      <main className="flex flex-col sm:flex-row gap-4 items-center">
        <Avatar className="aspect-square shrink size-28 text-xl font-bold">
          <AvatarImage className="object-cover" src={user.avatar?.url} />
          <AvatarFallback>
            {user.name
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <div className="flex gap-1">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            {user.isEmailConfirmed ? (
              <CheckCircle2 className="text-emerald-500" />
            ) : (
              <VerifyEmailButton />
            )}
          </div>
          {user.country && <p className="text-sm">{user.country.name}</p>}
          <p>
            <span className="font-semibold">Since: </span>
            {ISODateToLocale(user.createdAt)}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Page;

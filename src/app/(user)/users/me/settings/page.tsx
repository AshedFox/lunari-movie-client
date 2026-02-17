import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getCurrentUser } from '@entities/user/api/server';
import { getCountries } from '@entities/country/server';
import { SortDirectionEnum } from '@shared/api/graphql/graphql';
import { UpdatePasswordForm, UpdateProfileForm } from '@features/update-user';
import { ManageSubscriptionButton } from '@features/manage-subscription';
import { LogoutButton } from '@features/logout';

export const metadata: Metadata = {
  title: 'Settings',
};

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?from=/users/me/settings');
  }

  const countries = await getCountries({
    name: { direction: SortDirectionEnum.ASC },
  });

  return (
    <div className="py-10 flex flex-col gap-6 overflow-y-auto container">
      <h1 className="text-4xl font-bold">Settings</h1>
      <div className="grid grid-flow-row gap-4">
        <UpdateProfileForm user={user} countries={countries} />
        <UpdatePasswordForm />
      </div>
      <div className="flex flex-col gap-3">
        <ManageSubscriptionButton />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Page;

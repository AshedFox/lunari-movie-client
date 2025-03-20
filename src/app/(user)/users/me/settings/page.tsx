import UpdateProfileForm from './_components/UpdateProfileForm';
import UpdatePasswordForm from './_components/UpdatePasswordForm';
import LogoutButton from '@components/common/LogoutButton';
import { getUser } from '@lib/auth/user-dal';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getClient } from '@lib/apollo/rsc-client';
import {
  GetCountriesDocument,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';

export const metadata: Metadata = {
  title: 'Settings',
};

const Page = async () => {
  const user = await getUser();

  if (!user) {
    redirect('/login?from=/users/me/settings');
  }

  const { data } = await getClient().query({
    query: GetCountriesDocument,
    variables: {
      sort: {
        name: {
          direction: SortDirectionEnum.DESC,
        },
      },
    },
  });

  return (
    <div className="py-10 flex flex-col gap-8 overflow-y-auto container">
      <h1 className="text-4xl font-bold">Settings</h1>
      <div className="grid grid-flow-row gap-10">
        <UpdateProfileForm user={user} countries={data.getAllCountries} />
        <UpdatePasswordForm />
      </div>
      <LogoutButton />
    </div>
  );
};

export default Page;

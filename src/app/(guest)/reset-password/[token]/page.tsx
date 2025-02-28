import React, { use } from 'react';
import type { Metadata } from 'next';
import ResetPasswordForm from './_components/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password',
};

type Props = {
  params: Promise<{
    token?: string;
  }>;
};

const Page = ({ params }: Props) => {
  const { token } = use(params);

  if (!token) {
    return <></>;
  }

  return (
    <div className="flex items-center justify-center">
      <main className="w-full m-4 md:m-0 md:w-98 lg:w-114 xl:w-140 2xl:w-156">
        <ResetPasswordForm token={token} />
      </main>
    </div>
  );
};

export default Page;

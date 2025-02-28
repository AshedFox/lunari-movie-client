import React from 'react';
import type { Metadata } from 'next';
import ForgotPasswordForm from './_components/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

const Page = () => {
  return (
    <div className="flex items-center justify-center">
      <main className="w-full m-4 md:m-0 md:w-98 lg:w-114 xl:w-140 2xl:w-156">
        <ForgotPasswordForm />
      </main>
    </div>
  );
};

export default Page;

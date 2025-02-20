import React from 'react';
import LoginForm from './_components/LoginForm';

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <main className="w-full m-4 md:m-0 md:w-98 lg:w-114 xl:w-140 2xl:w-156">
        <LoginForm />
      </main>
    </div>
  );
};

export default Page;

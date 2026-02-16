import type { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';
import { cacheLife } from 'next/cache';
import { ForgotPasswordForm } from '@features/forgot-password';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

const Page = async () => {
  'use cache';
  cacheLife('max');

  return (
    <div className="@container">
      <div className="grid @lg:grid-cols-2 size-full">
        <div className="flex flex-1 items-center justify-center p-6 @md:p-10">
          <div className="w-full max-w-sm">
            <Suspense>
              <ForgotPasswordForm />
            </Suspense>
          </div>
        </div>

        <div className="relative hidden bg-muted @lg:block">
          <Image
            src="/image.png"
            alt="Auth"
            quality={100}
            fill
            sizes="50vw"
            className="object-cover grayscale-50 brightness-75 dark:brightness-50 dark:grayscale-75"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

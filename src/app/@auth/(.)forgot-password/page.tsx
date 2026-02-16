import { ForgotPasswordForm } from '@features/forgot-password';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared/ui/dialog';
import { NextModal } from '@shared/ui/NextModal';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

const Page = async () => {
  'use cache';
  cacheLife('max');

  return (
    <NextModal>
      <DialogContent className="@sm:max-w-[425px] @container">
        <DialogHeader>
          <DialogTitle className="sr-only">Forgot password</DialogTitle>
          <DialogDescription className="sr-only">
            Forgot password to your account?
          </DialogDescription>
        </DialogHeader>
        <Suspense>
          <ForgotPasswordForm />
        </Suspense>
      </DialogContent>
    </NextModal>
  );
};

export default Page;

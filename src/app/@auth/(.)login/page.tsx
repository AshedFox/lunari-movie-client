import { LoginForm } from '@features/login';
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
          <DialogTitle className="sr-only">Login</DialogTitle>
          <DialogDescription className="sr-only">
            Login to the account
          </DialogDescription>
        </DialogHeader>
        <Suspense>
          <LoginForm />
        </Suspense>
      </DialogContent>
    </NextModal>
  );
};

export default Page;

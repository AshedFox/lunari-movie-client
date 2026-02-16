import { SignUpForm } from '@features/sign-up';
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
          <DialogTitle className="sr-only">Sign Up</DialogTitle>
          <DialogDescription className="sr-only">
            Create new account
          </DialogDescription>
        </DialogHeader>
        <Suspense>
          <SignUpForm />
        </Suspense>
      </DialogContent>
    </NextModal>
  );
};

export default Page;

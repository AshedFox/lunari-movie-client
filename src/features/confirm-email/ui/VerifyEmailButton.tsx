'use client';

import { Button } from '@shared/ui/button';
import { toast } from 'sonner';
import { sendEmailConfirmationAction } from '../api/actions';

export const VerifyEmailButton = () => {
  const handleClick = () => {
    toast.promise(
      async () => {
        await sendEmailConfirmationAction();
      },
      {
        loading: 'Loading...',
        success: 'Successfully sent email confirmation',
        error: (e) => e.message,
      },
    );
  };

  return (
    <Button variant={'link'} onClick={handleClick}>
      Get email confirmation
    </Button>
  );
};

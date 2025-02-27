'use client';

import React from 'react';
import { Button } from '@components/ui/button';
import { sendEmailConfirmation } from '@lib/actions/send-email-confirmation';
import { toast } from 'sonner';

const VerifyEmailButton = () => {
  const handleClick = () => {
    toast.promise(
      async () => {
        const result = await sendEmailConfirmation();

        if (result?.error) {
          throw new Error(result.error);
        }

        return;
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

export default VerifyEmailButton;

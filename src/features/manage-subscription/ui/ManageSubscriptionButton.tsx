'use client';

import { Button } from '@shared/ui/button';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { createSubscriptionsManageLinkAction } from '../api/actions';

export const ManageSubscriptionButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      loading={isPending}
      onClick={async () => {
        startTransition(async () => {
          const data = await createSubscriptionsManageLinkAction();

          if (data) {
            router.push(data);
          }
        });
      }}
    >
      Manage subscription
    </Button>
  );
};

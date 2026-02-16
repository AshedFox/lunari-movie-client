'use client';

import { useMutation } from '@apollo/client/react';
import { Button } from '@shared/ui/button';
import { CreateSubscriptionsManageLinkDocument } from '@shared/api/graphql/graphql';
import { useRouter } from 'next/navigation';

export const ManageSubscriptionButton = () => {
  const [createLink, { loading }] = useMutation(
    CreateSubscriptionsManageLinkDocument,
  );
  const router = useRouter();

  return (
    <Button
      loading={loading}
      onClick={async () => {
        const { data } = await createLink({
          errorPolicy: 'all',
        });

        if (data) {
          router.push(data.createSubscriptionsManageLink);
        }
      }}
    >
      Manage subscription
    </Button>
  );
};

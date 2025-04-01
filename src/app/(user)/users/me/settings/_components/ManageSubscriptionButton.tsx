'use client';

import { useMutation } from '@apollo/client';
import { Button } from '@components/ui/button';
import { CreateSubscriptionsManageLinkDocument } from '@lib/graphql/generated/graphql';
import { useRouter } from 'next/navigation';

const ManageSubscriptionButton = () => {
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

export default ManageSubscriptionButton;

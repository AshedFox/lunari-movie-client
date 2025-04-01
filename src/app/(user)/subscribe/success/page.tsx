import { buttonVariants } from '@components/ui/button';
import { getClient } from '@lib/apollo/rsc-client';
import { ActivateSubscriptionDocument } from '@lib/graphql/generated/graphql';
import { Frown, Smile } from 'lucide-react';
import Link from 'next/link';

type Props = {
  searchParams: Promise<{
    sessionId?: string;
  }>;
};

const activateSubscription = async (sessionId: string) => {
  const { data } = await getClient().mutate({
    mutation: ActivateSubscriptionDocument,
    variables: {
      sessionId,
    },
    errorPolicy: 'all',
  });

  return data;
};

const Page = async ({ searchParams }: Props) => {
  const { sessionId } = await searchParams;

  if (!sessionId) {
    throw new Error('Session id not provided');
  }

  const isActivated = await activateSubscription(sessionId);

  if (!isActivated) {
    return (
      <div className="flex flex-col gap-8 container py-10 items-center justify-center">
        <Frown size={164} />
        <h1 className="text-3xl font-semibold">
          Failed to activate subscription
        </h1>
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href="/subscribe"
        >
          Return to Subscribe page
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 container py-10 items-center justify-center">
      <Smile size={164} />
      <h1 className="text-3xl font-semibold">
        Successfully activated subscription
      </h1>
      <Link className={buttonVariants({ variant: 'outline' })} href="/">
        Go to Home
      </Link>
    </div>
  );
};

export default Page;

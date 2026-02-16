import { activateSubscriptionAction } from '@features/activate-subscription';
import { buttonVariants } from '@shared/ui/button';
import { Smile } from 'lucide-react';
import Link from 'next/link';

type Props = {
  searchParams: Promise<{
    sessionId?: string;
  }>;
};

const Page = async ({ searchParams }: Props) => {
  const { sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-xl">Session ID is missing. Please try again.</h1>
      </div>
    );
  }

  await activateSubscriptionAction(sessionId);

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

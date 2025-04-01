import { getClient } from '@lib/apollo/rsc-client';
import {
  GetActivePlansDocument,
  HasActiveSubscriptionDocument,
} from '@lib/graphql/generated/graphql';
import SubscribeForm from './_components/SubscribeForm';
import { getUser } from '@lib/auth/user-dal';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

const getPlans = async () => {
  const { data } = await getClient().query({
    query: GetActivePlansDocument,
    context: {
      skipAuth: true,
    },
  });

  return data.getPlans;
};

const userHasSubscription = async (): Promise<boolean> => {
  const { data } = await getClient().query({
    query: HasActiveSubscriptionDocument,
    errorPolicy: 'all',
  });

  return data.hasActiveSubscription;
};

type Props = {
  searchParams: Promise<{
    from?: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Subscribe',
};

const Page = async ({ searchParams }: Props) => {
  const plans = await getPlans();
  const user = await getUser();

  if (!user) {
    redirect('/login?from=/subscribe');
  }

  const hasSubsrciption = await userHasSubscription();
  const { from } = await searchParams;

  if (hasSubsrciption) {
    redirect(from ?? '/');
  }

  return (
    <div className="container flex items-center justify-center flex-col">
      <main className="w-full space-y-6 lg:space-y-10 py-10 overflow-hidden">
        <h1 className="text-4xl font-bold text-center">
          Choose your subscription
        </h1>
        <div className="grid gap-3 lg:gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <SubscribeForm key={plan.id} plan={plan} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;

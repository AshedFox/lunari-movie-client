import SubscribeForm from './_components/SubscribeForm';
import { Metadata } from 'next';
import { SubscribeUserCheck } from './_components/SubscribeUserCheck';
import { Suspense } from 'react';
import { getActivePlans } from '@services/plan.service';

type Props = {
  searchParams: Promise<{
    from?: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Subscribe',
};

const Page = async ({ searchParams }: Props) => {
  const { from } = await searchParams;
  const plans = await getActivePlans();

  return (
    <div className="@container">
      <Suspense>
        <SubscribeUserCheck from={from} />
      </Suspense>
      <div className="container flex items-center justify-center flex-col">
        <main className="w-full space-y-6 @lg:space-y-10 py-10 overflow-hidden">
          <h1 className="text-4xl font-bold text-center">
            Choose your subscription
          </h1>
          <div className="grid gap-3 @lg:gap-5 grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3">
            {plans.map((plan) => (
              <SubscribeForm key={plan.id} plan={plan} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@entities/user/api/server';
import { hasActiveSubscription } from '@entities/subscription/api/server';

type Props = {
  from?: string;
};

export const SubscribeUserCheck = async ({ from }: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?from=/subscribe`);
  }

  const hasSubscription = await hasActiveSubscription();

  if (hasSubscription) {
    redirect(from ?? '/');
  }

  return null;
};

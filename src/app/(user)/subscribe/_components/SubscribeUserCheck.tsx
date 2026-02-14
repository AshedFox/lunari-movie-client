import { redirect } from 'next/navigation';
import { getCurrentUser } from '@services/user.service';
import { hasActiveSubscription } from '@services/subscription.service';

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

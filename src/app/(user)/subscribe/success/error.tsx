'use client';

import { buttonVariants } from '@shared/ui/button';
import { Frown, Link } from 'lucide-react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="flex flex-col gap-8 container py-10 items-center justify-center">
      <Frown size={164} />
      <h1 className="text-3xl font-semibold">
        Failed to activate subscription
      </h1>
      <p>{error.message}</p>
      <Link
        className={buttonVariants({ variant: 'outline' })}
        href="/subscribe"
      >
        Return to Subscribe page
      </Link>
    </div>
  );
}

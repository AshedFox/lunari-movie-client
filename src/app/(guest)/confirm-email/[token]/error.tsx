'use client';

import { Frown } from 'lucide-react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="flex items-center justify-center flex-col gap-3 container text-destructive">
      <Frown className="size-[40%]" />
      <div className="font-bold text-4xl text-center">
        Failed to confirm email
      </div>
      <p>{error.message}</p>
    </div>
  );
}

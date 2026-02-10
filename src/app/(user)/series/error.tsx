'use client';

import { useEffect } from 'react';
import { Button } from '@components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function SeriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 text-center p-8">
      <div className="rounded-full bg-muted p-4">
        <RefreshCw className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold">Failed to load series</h3>
      <p className="text-muted-foreground text-sm max-w-lg">
        {error.message ||
          'We encountered an error while fetching the series list.'}
      </p>
      <Button onClick={() => reset()} variant="outline" size="sm">
        Try again
      </Button>
    </div>
  );
}

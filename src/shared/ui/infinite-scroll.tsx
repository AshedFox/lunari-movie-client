'use client';

import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollLoaderProps {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}

export function InfiniteScrollLoader({
  onLoadMore,
  hasNextPage,
  isLoading,
}: InfiniteScrollLoaderProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isLoading, onLoadMore]);

  if (!hasNextPage) {
    return null;
  }

  return (
    <div ref={ref} className="flex justify-center py-6 w-full">
      {isLoading && <Loader2 className="animate-spin text-muted-foreground" />}
    </div>
  );
}

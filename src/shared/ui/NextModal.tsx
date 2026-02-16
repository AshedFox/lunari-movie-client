'use client';

import { Dialog } from '@shared/ui/dialog';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export const NextModal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <Dialog modal defaultOpen={true} onOpenChange={router.back}>
      {children}
    </Dialog>
  );
};

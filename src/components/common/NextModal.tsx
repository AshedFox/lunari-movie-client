'use client';

import { Dialog } from '@components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const NextModal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <Dialog modal defaultOpen={true} onOpenChange={router.back}>
      {children}
    </Dialog>
  );
};

export default NextModal;

'use client';

import { Button } from '@shared/ui/button';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import { logoutAction } from '../api/actions';

type Props = {
  className?: string;
};

export const LogoutButton = ({ className }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    toast.promise(logoutAction(), {
      loading: 'Loading...',
      success: () => {
        router.push(`/login?from=${pathname}`);
        return 'Successfully logged out';
      },
      error: (e) => (e instanceof Error ? e.message : 'Failed to logout'),
    });
  };

  return (
    <Button
      className={cn('flex items-center', className)}
      variant="destructive"
      size="sm"
      onClick={handleClick}
    >
      <LogOut className="text-current" />
      Logout
    </Button>
  );
};

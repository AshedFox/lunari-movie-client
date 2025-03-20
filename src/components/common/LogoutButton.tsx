'use client';

import { Button } from '@components/ui/button';
import { logout } from '@lib/actions/logout';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { cn } from '@lib/utils';

type Props = {
  className?: string;
};

const LogoutButton = ({ className }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    toast.promise(
      async () => {
        const result = await logout();

        if (result?.error) {
          throw new Error(result.error);
        }
      },
      {
        loading: 'Loading...',
        success: () => {
          router.push(`/login?from=${pathname}`);
          return 'Successfully logged out';
        },
        error: (e) => e.message,
      },
    );
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

export default LogoutButton;

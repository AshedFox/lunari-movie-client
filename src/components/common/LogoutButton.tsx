'use client';

import React from 'react';
import { Button } from '@components/ui/button';
import { logout } from '@lib/actions/logout';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

type Props = {
  className?: string;
};

const LogoutButton = ({ className }: Props) => {
  const router = useRouter();
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
          router.replace('/login');
          return 'Successfully logged out';
        },
        error: (e) => e.message,
      },
    );
  };

  return (
    <Button className={className} variant="destructive" onClick={handleClick}>
      <LogOut />
      Logout
    </Button>
  );
};

export default LogoutButton;

'use client';

import { usePathname } from 'next/navigation';
import { HeaderLink } from './HeaderLink';

export const HeaderUserActionGuest = () => {
  const pathname = usePathname();
  return (
    <HeaderLink
      className="ml-auto"
      selected={pathname === '/login' || pathname === '/sign-up'}
      href={`/login?from=${pathname}`}
    >
      Login
    </HeaderLink>
  );
};

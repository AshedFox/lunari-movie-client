'use client';

import { usePathname } from 'next/navigation';
import { HeaderProfileDropdown } from './HeaderProfileDropdown';
import { UserProfileFragment } from '@shared/api/graphql/graphql';

export const HeaderUserActionClient = ({
  user,
}: {
  user: UserProfileFragment;
}) => {
  const pathname = usePathname();
  return (
    <HeaderProfileDropdown
      name={user.name}
      pathname={pathname}
      avatarUrl={user.avatar?.url}
    />
  );
};

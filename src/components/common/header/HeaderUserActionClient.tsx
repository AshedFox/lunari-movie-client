'use client';

import { usePathname } from 'next/navigation';
import { UserProfileFragment } from '@lib/graphql/generated/graphql';
import { HeaderProfileDropdown } from './HeaderProfileDropdown';

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

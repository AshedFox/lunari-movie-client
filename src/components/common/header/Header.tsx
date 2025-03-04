'use client';

import { usePathname } from 'next/navigation';
import { UserProfileFragment } from '@lib/graphql/generated/graphql';
import { HeaderLink } from '@components/common/header/HeaderLink';
import { HeaderProfileDropdown } from '@components/common/header/HeaderProfileDropdown';
import { publicLinks } from '@components/common/header/constants';

type Props = {
  user?: UserProfileFragment | null;
};

export const Header = ({ user }: Props) => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b flex">
      <nav className="flex items-center gap-2 container">
        {publicLinks.map(({ selected, href, children }) => (
          <HeaderLink key={href} selected={selected(pathname)} href={href}>
            {children}
          </HeaderLink>
        ))}
        {user ? (
          <HeaderProfileDropdown
            name={user.name}
            pathname={pathname}
            avatarUrl={user.avatar?.url}
          />
        ) : (
          <HeaderLink
            className="ml-auto"
            selected={pathname === '/login' || pathname === '/sign-up'}
            href={`/login?from=${pathname}`}
          >
            Login
          </HeaderLink>
        )}
      </nav>
    </header>
  );
};

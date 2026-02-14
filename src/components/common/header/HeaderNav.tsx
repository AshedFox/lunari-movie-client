'use client';

import { usePathname } from 'next/navigation';
import { publicLinks } from './constants';
import { HeaderLink } from './HeaderLink';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const HeaderNav = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {publicLinks.map(({ selected, href, children: linkChildren }) => (
        <HeaderLink key={href} selected={selected(pathname)} href={href}>
          {linkChildren}
        </HeaderLink>
      ))}
      {children}
    </>
  );
};

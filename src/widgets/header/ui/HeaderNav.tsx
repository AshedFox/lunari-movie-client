'use client';

import { usePathname } from 'next/navigation';
import { getHeaderPublicLinks } from '../config';
import { HeaderLink } from './HeaderLink';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const HeaderNav = ({ children }: Props) => {
  const pathname = usePathname();
  const links = getHeaderPublicLinks(pathname);

  return (
    <>
      {links.map(({ selected, href, children: linkChildren }) => (
        <HeaderLink key={href} selected={selected} href={href}>
          {linkChildren}
        </HeaderLink>
      ))}
      {children}
    </>
  );
};

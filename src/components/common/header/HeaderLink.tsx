import Link from 'next/link';
import { cn } from '@lib/utils';
import { buttonVariants } from '@components/ui/button';
import React, { ReactNode } from 'react';

type Props = {
  selected: boolean;
  href: string;
  children?: Readonly<ReactNode>;
  className?: string;
};

export const HeaderLink = ({ href, children, selected, className }: Props) => {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'link' }),
        'flex gap-0.5 p-1 h-auto',
        { 'text-foreground': !selected },
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

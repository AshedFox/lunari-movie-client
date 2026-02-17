import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@shared/lib/utils';

export type TabItem = {
  href: string;
  label: ReactNode;
  value: string | null;
  count?: number;
};

type Props = {
  tabs: TabItem[];
  activeValue?: string | null;
  className?: string;
};

export const TabsNav = ({ tabs, activeValue, className }: Props) => {
  return (
    <nav
      className={cn(
        'text-muted-foreground inline-flex items-center flex-wrap gap-y-5 text-sm w-full justify-start rounded-none border-b',
        className,
      )}
    >
      {tabs.map(({ href, label, value, count }) => {
        const isActive = activeValue === value;
        return (
          <Link
            key={value}
            href={href}
            className={cn(
              'border-b-2 border-b-transparent rounded-none pb-3 font-semibold px-2 hover:text-muted-foreground/60 transition-colors',
              {
                'border-b-primary text-primary pointer-events-none': isActive,
              },
            )}
          >
            {label}
            {count !== undefined && (
              <span className="text-xs align-text-top ml-1">({count})</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

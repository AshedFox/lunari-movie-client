import { Suspense } from 'react';
import { HeaderNav } from './HeaderNav';
import { HeaderUserAction } from './HeaderUserAction';
import { HeaderUserFallback } from './HeaderUserFallback';

export const Header = () => {
  return (
    <header className="w-full border-b flex">
      <nav className="flex items-center gap-2 container">
        <Suspense>
          <HeaderNav />
        </Suspense>
        <Suspense fallback={<HeaderUserFallback />}>
          <HeaderUserAction />
        </Suspense>
      </nav>
    </header>
  );
};

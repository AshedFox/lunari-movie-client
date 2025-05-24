import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  tab: ReactNode;
};

const Layout = async ({ children, tab }: Props) => {
  return (
    <div className="space-y-10">
      {children}
      {tab}
    </div>
  );
};

export default Layout;

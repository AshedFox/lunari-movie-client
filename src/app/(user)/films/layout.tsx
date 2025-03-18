import { ReactNode } from 'react';

type Props = {
  modal: ReactNode;
  children: ReactNode;
};

const Layout = ({ modal, children }: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout;

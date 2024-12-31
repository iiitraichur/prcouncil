import React from 'react';
import { ReactNode } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
        <NavbarAdmin/>
      {children}
    </>
  );
};

export default Layout;

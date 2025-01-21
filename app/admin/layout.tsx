"use client"
import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation'; 
import PrivateRoute from "../components/PrivateRoute";
import NavbarAdmin from "../components/NavbarAdmin";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter(); 

  return (
    <PrivateRoute>
      <NavbarAdmin />
      <main>{children}</main>
    </PrivateRoute>
  );
};

export default Layout;

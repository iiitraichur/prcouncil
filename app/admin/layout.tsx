"use client"
import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Import for routing if needed

import PrivateRoute from "../components/PrivateRoute";
import NavbarAdmin from "../components/NavbarAdmin";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter(); // Use this for any routing logic, if required

  return (
    <PrivateRoute>
      <NavbarAdmin />
      <main>{children}</main>
    </PrivateRoute>
  );
};

export default Layout;

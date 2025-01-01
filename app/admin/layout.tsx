"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = false; // Replace with actual auth check
    if (!isAuthenticated) {
      router.push('/sign-in');;
    }
  }, [router]);

  return <>{children}</>;
};

export default PrivateRoute;

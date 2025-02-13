'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Short timeout to ensure loading state is visible
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      {!isLoading && <Footer />}
    </>
  );
};

export default Layout;
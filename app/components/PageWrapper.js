'use client'

import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'

export default function PageWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after initial render and content is ready
    setIsLoading(false);

    // Listen for route changes that might trigger loading
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return children;
}

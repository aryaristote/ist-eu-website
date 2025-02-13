'use client'

import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'
import Hero from '../sections/Hero'
import Solution from '../sections/Solution'
import Rumpole from '../sections/Rumpole'
import About from '../sections/About'
import FAQ from '../sections/FAQ'
import Pricing from '../sections/Pricing'
import ContactForm from '../sections/ContactForm'

export default function MainContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after initial render
    setIsLoading(false);

    // Listen for route changes
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

  return (
    <main className="relative w-full overflow-x-hidden sm:pb-32">
      <Hero />
      <Solution />
      <Rumpole />
      <About />
      <FAQ />
      <Pricing />
      <ContactForm />
    </main>
  );
}

'use client';

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { keyframes } from "@emotion/react"
import { useEffect } from 'react';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

export const scrollToContact = () => {
  if (typeof window === 'undefined') return; // Guard clause for SSR

  // Small delay to ensure DOM is ready after navigation
  setTimeout(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const startPosition = window.pageYOffset;
    const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500;
    let start = null;

    const animation = currentTime => {
      if (!start) start = currentTime;
      const timeElapsed = currentTime - start;

      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, 100);
};

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

// Custom hook for handling scroll animations
export const useScrollToContact = () => {
  useEffect(() => {
    // Check for hash in URL on page load
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      scrollToContact();
    }
  }, []);

  return scrollToContact;
};

// Helper function to check if we're on the client side
export const isClient = typeof window !== 'undefined';

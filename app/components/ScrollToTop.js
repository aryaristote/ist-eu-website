'use client';

import { useEffect, useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import { Button } from "./ui/button";
import { HiMiniArrowUp } from 'react-icons/hi2';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const contactPosition = contactSection.getBoundingClientRect().top;
      setIsVisible(window.scrollY > contactPosition);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-32 right-8 z-50 p-2 primary-btn rounded-full animate-bounce-slow"
          aria-label="Scroll to top"
        >
          <HiMiniArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTop;

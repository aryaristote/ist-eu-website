"use client";

import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useScrollToContact } from "../utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t, i18n, ready } = useTranslation();
  const scrollToContactHandler = useScrollToContact();

  if (!ready) return null;

  const newsUrl = `/news/${i18n.language === 'en' ? 'en' : 'rw'}`;

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = async () => {
    if (pathname === '/') {
      scrollToContactHandler();
    } else {
      await router.push('/#contact');
      scrollToContactHandler();
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="mx-3 md:mx-32">
        <div className="flex items-center justify-between pt-2 pb-4">
          <Fade delay={200} triggerOnce>
            <Link href="/" aria-label="Home" className="font-bold outline-none">
              <img src="/images/ISTLogo.png" className="max-h-8 lg:h-8 object-contain" alt="IST Legal Logo" />
            </Link>
          </Fade>
          <div className="navbar-link-block gap-2">
            <Fade delay={200} triggerOnce> 
              <Link href="/pricing" aria-label="FAQ" className="outline-none desktop-only">
                <p className={pathname === '/pricing' ? "py-[2px] navbar-link-active hover:opacity-100 text-black font-semibold px-0 md:px-3" : "opacity-65 hover:opacity-100 px-0 md:px-3 py-[2px] font-normal"}>
                  {t("pricing.header")}
                </p>
              </Link>
              <button
                onClick={handleContactClick}
                className="outline-none border-none bg-transparent cursor-pointer"
              >
                <p className="opacity-65 hover:opacity-100 py-[2px] pr-3 navbar-link font-normal">
                  {t("navBarItems.contact")}
                </p>
              </button>
              <Link href="/faq" aria-label="FAQ" className="outline-none">
                <p className={pathname === '/faq' ? "py-[2px] navbar-link-active hover:opacity-100 text-black font-semibold px-0 md:px-3" : "opacity-65 hover:opacity-100 px-0 md:px-3 py-[2px] font-normal"}>
                  FAQ
                </p>
              </Link>
            </Fade>
            <Fade delay={400} triggerOnce>
              <Button className="primary-btn">
                <Link href="#" className="px-0 md:px-2">
                  {t("login")}
                </Link>
              </Button>
            </Fade>
          </div>
        </div>
      </div>
    </nav>
  );
};

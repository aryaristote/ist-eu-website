'use client';

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from 'next/navigation'
import { IoLogoLinkedin } from "react-icons/io5"; 
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { BiLogoTiktok } from "react-icons/bi";

const Footer = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  
  return (
    <footer className="pb-6 pt-4 md:py-8 bg-[#3981a2] md:bg-transparent xl:bg-transparent">
      <div className="container">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="md:text-left text-white md:text-black lg:text-black md:opacity-65">
            <p className="text-[12px] md:text-sm">&copy; {new Date().getFullYear()} IST Legal</p>
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-auto mb-4 md:mb-0 items-center gap-2">
            <div className="flex flex-raw md:flex-row justify-center w-full md:w-auto items-center gap-6 md:gap-2">
              <a href="https://istlegal.rw/" className={`primary-btn h-7 md:px-2 md:w-auto text-center border-b-2 border-b-solid border-transparent transition-colors hover:opacity-75 text-white hover:font-medium text-[12px] md:text-sm ${pathname === 'https://istlegal.rw/' ? 'opacity-100 font-medium' : 'opacity-64'}`} >
                {t("login")}
              </a> 
              <Link href="/faq" className={`md:w-auto text-center border-b-2 border-b-solid border-transparent transition-colors md:opacity-65 hover:opacity-100 text-white md:text-black lg:text-black hover:font-medium text-[12px] md:text-sm ${pathname === '/faq' ? 'opacity-100 font-medium' : 'opacity-64'}`}>
                FAQ
              </Link>
              <Link href="/pricing" className={`md:w-auto text-center border-b-2 border-b-solid border-transparent transition-colors md:opacity-65 hover:opacity-100 text-white md:text-black lg:text-black hover:font-medium text-[12px] md:text-sm ${pathname === '/pricing' ? 'opacity-100 font-medium' : 'opacity-64'}`} aria-label="Pricing" > 
                  Pricing
              </Link>
              <FooterItem href="/terms-of-service" title={t("footer.terms-of-service")} />
            </div>
            <span className="hidden md:inline opacity-65 text-white md:text-black lg:text-black">|</span>
            <div className="flex flex-row md:flex-row w-full md:w-auto items-center justify-center gap-2">
              <a href="https://linkedin.com/company/ist-legal" target="_blank" className="md:w-auto text-center border-b-2 border-b-solid border-transparent transition-colors md:opacity-65 hover:opacity-100 text-white md:text-black lg:text-black hover:font-medium text-[16px] md:text-sm pt-1" rel="noreferrer" aria-label="Find us on Github" data-tooltip-id="open-linkedin" data-tooltip-content="Find us on Linkedin">
                <IoLogoLinkedin size={21} />
              </a>
              <a href="https://www.instagram.com/ISTLegal.rw" target="_blank" className="md:w-auto text-center border-b-2 border-b-solid border-transparent transition-colors md:opacity-65 hover:opacity-100 text-white md:text-black lg:text-black hover:font-medium text-[16px] md:text-sm pt-1" rel="noreferrer" aria-label="Find us on Github" data-tooltip-id="open-linkedin" data-tooltip-content="Find us on Linkedin">
                <RiInstagramFill size={21} />
              </a>
              <a href="https://x.com/ISTLegal_rw" target="_blank" className="md:w-auto text-center border-b-2 border-b-solid border-transparent transition-colors md:opacity-65 hover:opacity-100 text-white md:text-black lg:text-black hover:font-medium text-[16px] md:text-sm pt-1" rel="noreferrer" aria-label="Find us on Github" data-tooltip-id="open-linkedin" data-tooltip-content="Find us on Linkedin">
                <FaSquareXTwitter size={21} />
              </a>
              <a href="https://www.youtube.com/@ISTLegal_rw" target="_blank" className="md:w-auto text-center border-b-2 border-b-solid border-transparent transition-colors md:opacity-65 hover:opacity-100 text-white md:text-black lg:text-black hover:font-medium text-[16px] md:text-sm pt-1" rel="noreferrer" aria-label="Find us on Github" data-tooltip-id="open-linkedin" data-tooltip-content="Find us on Linkedin">
                <IoLogoYoutube size={21} />
              </a>
              <a href="https://www.tiktok.com/@ISTLegal.rw" target="_blank" className="md:w-auto text-center border-b-2 border-b-solid border-transparent transition-colors md:opacity-65 hover:opacity-100 text-white md:text-black lg:text-black hover:font-medium text-[16px] md:text-sm pt-1" rel="noreferrer" aria-label="Find us on Github" data-tooltip-id="open-linkedin" data-tooltip-content="Find us on Linkedin">
                <BiLogoTiktok size={21} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterItem = ({ href, title }) => {
  const pathname = usePathname();

  return (
    <Link href={href} passHref legacyBehavior>
      <a className={`hover:border-primary text-white md:text-black lg:text-black md:opacity-65 hover:opacity-100 text-[14px] md:text-sm ${pathname === href ? 'opacity-100 font-medium' : 'opacity-64'}`}>
        <div>{title}</div>
      </a>
    </Link>
  );
};

export default Footer;

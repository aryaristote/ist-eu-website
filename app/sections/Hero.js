'use client';

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Reveal } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { useScrollToContact } from "../utils";

const VideoComponent = dynamic(() => import('../components/VideoComponent'), { ssr: false });
const CookieConsentPopup = dynamic(() => import('./Cookies'), { ssr: false });

export default function Hero() {
  const { t } = useTranslation();
  const scrollToContactHandler = useScrollToContact();
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  const fadeInButton = {
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };
  const fadeInVideoblock = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <section className="section hero-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-2 lg:gap-12 pt-[20px] md:pt-[90px] lg:pt-[100px]">
        <div className="flex flex-col justify-center">
          <div className="space-y-3 mt-24 md:mt-0">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} >
              <div className="space-y-5 sm:space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter text-center md:text-left md:text-5xl xl:text-[4.15rem] break-words">
                  {t("home.heading")}
                </h1>
                <p className="max-w-lg text-muted-foreground text-center md:text-left text-[12px] sm:text-[16px]">
                  {t("home.text")}
                </p>
              </div>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeInButton} >
              <div className="flex items-end justify-start gap-4 mt-1 desktop-only">
                <Button className="w-100% md:w-auto h-8 px-4 py-2 sm:h-7 sm:px-3 sm:rounded-md lg:h-10 lg:px-5 lg:rounded-md lg:text-base primary-btn">
                  <Link href="https://istlegal.rw/">
                    {t("try.text")}
                  </Link>
                </Button>
                <Button
                  className="w-100% md:w-auto h-8 px-4 py-2 sm:h-7 sm:px-3 sm:rounded-md lg:h-10 lg:px-5 lg:rounded-md lg:text-base bg-white primary-btn-o"
                  onClick={scrollToContactHandler}
                >
                  {t("contact-us")}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <Reveal keyframes={fadeIn} delay={300} duration={600} triggerOnce>
          <motion.div initial="hidden" animate="visible" variants={fadeInVideoblock} >
            <div className="video-container">
              <VideoComponent />
            </div>
          </motion.div>
          <div className="flex flex-row align-start justify-start gap-2 pb-5 md:pb-0">
            <Button className="block md:hidden lg:hidden xl:hidden  h-8 px-4 py-2 sm:h-7 sm:px-3 sm:rounded-md lg:h-10 lg:px-5 lg:rounded-md lg:text-base primary-btn">
              <Link href="https://istlegal.rw/" className="outline-none">
                {t("login")}
              </Link>
            </Button>
            <Button
              className="block md:hidden lg:hidden xl:hidden w-100% md:w-auto h-8 px-4 py-2 sm:h-7 sm:px-3 sm:rounded-md lg:h-10 lg:px-5 lg:rounded-md lg:text-base primary-btn-o"
              onClick={scrollToContactHandler}
            >
              {t("contact-us")}
            </Button>
          </div>
        </Reveal>
      </div>
      <CookieConsentPopup />
    </section>
  );
};
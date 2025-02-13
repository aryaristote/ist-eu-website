'use client';

import { useTranslation } from "react-i18next"
import { Reveal } from "react-awesome-reveal"
import { fadeIn } from "../utils"
import { MdOutlineAutoMode } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import ScrollAnimation from 'react-animate-on-scroll';
import { TbDatabaseCog, TbFileInfinity } from "react-icons/tb";

const Rumpole = () => {
  const { t } = useTranslation()
  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -50 }, // Start off-screen to the left
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }, // Animate into view
  };
  const fadeInFromRight = {
    hidden: { opacity: 0, x: 50 }, // Animate from right
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <section className="md:py-20 overflow-hidden" id="features">
      <ScrollAnimation animateIn="fadeIn">
        <Reveal keyframes={fadeIn} delay={400} duration={600} triggerOnce>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-1">
            <div className="flex flex-col w-full justify-center items-start">
              <div className="flex flex-raw w-full justify-between items-center gap-10 md:w-[70%]">
                <div className="hidden md:inline w-24 h-1 bg-gray-500 mx-auto my-4"></div>
                <div className="w-full md:text-left">
                  <h6
                    className="font-bold text-3xl md:text-4xl leading-snug break-words"
                    dangerouslySetInnerHTML={{ __html: t("reason-why.heading") }}
                  />
                  <p className="my-6 text-gray-600 w-full md:w-[80%]" dangerouslySetInnerHTML={{ __html: t("reason-why.subheading") }} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center w-full gap:8 md:gap-8 md:pt-12">
                <div className="mb-12 md:mb-0 w-[55%]">
                  <img
                    className="mx-auto bg md:mx-0 w- rounded-md"
                    src="images/feature-bg.jpeg"
                    alt="Feature Illustration"
                  />
                </div>
                <div className="flex flex-col items-start gap-1 justify-between">
                  <div className="flex items-center mb-8 shadow-md px-3 py-4 rounded-md">
                    <div className="img-bg feat-1">
                      <TbDatabaseCog className="icn text-muted-foreground text-[30px] md:text-[70px]" />
                    </div>
                    <div className="pl-4">
                      <p
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: t("reason-why.reason-one") }} />
                    </div>
                  </div>
                  <div className="flex items-center mb-8 shadow-md px-3 py-4 rounded-md w-full">
                    <div className="img-bg feat-2">
                      <TbFileInfinity className="icn text-muted-foreground text-[30px] md:text-[70px]" />
                    </div>
                    <div className="pl-4">
                      <p
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: t("reason-why.reason-two") }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center mb-8 shadow-md px-3 py-4 rounded-md w-full">
                    <div className="img-bg feat-3">
                      <MdOutlineAutoMode className="icn text-muted-foreground text-[30px] md:text-[70px]" />
                    </div>
                    <div className="pl-4">
                      <p
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: t("reason-why.reason-three") }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center mb-8 shadow-md px-3 py-4 rounded-md w-full">
                    <div className="img-bg feat-4">
                      <GiWeightLiftingUp className="icn text-muted-foreground text-[30px] md:text-[70px]" />
                    </div>
                    <div className="pl-4">
                      <p
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: t("reason-why.reason-four") }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </ScrollAnimation>
    </section>
  )
}

export default Rumpole

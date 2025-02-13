'use client';

import { useTranslation } from "react-i18next"
import { motion, useScroll, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "react-awesome-reveal"
import { fadeIn } from "../utils"
import { BsLinkedin } from "react-icons/bs";
import { TbBrandWikipedia } from "react-icons/tb";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Team = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={sectionRef} className="section mt-12 md:mt-0 bg-gradient-to-b from-white to-[#f8fafc]">
      <div className="container px-4">
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-20">
          <motion.div 
            className="w-full xl:w-1/2 space-y-8"
            variants={leftVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="space-y-6">
              <div className="inline-block">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl/tight bg-gradient-to-r from-[#3981a2] to-[#65b7e5] bg-clip-text text-transparent">
                  {t("team.heading")}
                </h2>
                <div className="h-1 w-1/3 bg-gradient-to-r from-[#3981a2] to-[#65b7e5] mt-2"></div>
              </div>
              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t("team.text1") }}></p>
                <p className="text-gray-600 text-lg leading-relaxed">{t("team.text2")}</p>
              </div>
              <div className="flex gap-6 pt-4">
                <a 
                  href="https://www.linkedin.com/in/mariammuganga/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#3981a2] hover:text-[#65b7e5] transition-colors duration-300"
                >
                  <BsLinkedin size={20} />
                  <span>LinkedIn</span>
                  <HiOutlineArrowNarrowRight className="ml-1" />
                </a>
                <a 
                  href="https://rw.wikipedia.org/wiki/Mariam_Muganga" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#3981a2] hover:text-[#65b7e5] transition-colors duration-300"
                >
                  <TbBrandWikipedia size={22} />
                  <span>Wikipedia</span>
                  <HiOutlineArrowNarrowRight className="ml-1" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full xl:w-1/2"
            variants={rightVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3981a2] to-[#65b7e5] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-xl overflow-hidden shadow-xl">
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src="/images/Mariam.jfif" 
                    alt="Mariam M. Muganga" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">Mariam M. Muganga</h4>
                      <p className="text-[#3981a2] font-medium mt-1">CEO, IST Legal</p>
                    </div>
                    <div className="flex gap-3">
                      <a 
                        href="https://www.linkedin.com/in/mariammuganga/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#3981a2] transition-colors duration-300"
                      >
                        <BsLinkedin size={20} />
                      </a>
                      <a 
                        href="https://rw.wikipedia.org/wiki/Mariam_Muganga" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#3981a2] transition-colors duration-300"
                      >
                        <TbBrandWikipedia size={22} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Team

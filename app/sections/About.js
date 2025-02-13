'use client';

import { useTranslation } from "react-i18next"
import { Reveal } from "react-awesome-reveal"
import { fadeIn } from "../utils"

const About = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#e1e8ef] mb-20 md:mb-0 py-20 md:py-20">
      <div className="container grid items-center justify-center gap-4 text-center">
        <div className="space-y-3">
          <Reveal keyframes={fadeIn} fraction={1} delay={200} duration={600} triggerOnce>
            <h2 className="text-3xl font-bold tracking-tighter text-center md:text-5xl/tight">
              {t("foytech.heading")}
            </h2>
          </Reveal>
          <Reveal keyframes={fadeIn} delay={400} duration={600} triggerOnce>
            <p className="max-w-[48rem] mx-auto text-center text-muted-foreground md:text-xl/relaxed">
              {t("foytech.text")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About

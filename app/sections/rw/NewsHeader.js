'use client';

import { useTranslation } from "react-i18next"
import { Reveal } from "react-awesome-reveal"
import { fadeIn } from "../../utils"

const NewsHeader = () => {
  const { t } = useTranslation()

  return (
    <section className="section">
      <Reveal keyframes={fadeIn} delay={200} duration={600} triggerOnce>
        <div className="container flex flex-col items-center gap-6 lg:flex-row md:gap-16 xl:gap-24">
          <div className="w-full md:w-1/2 xl:w-full space-y-6">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold tracking-tighter md:text-5xl/tight">
                {t("news.qura.header")}
              </h3>
              <p className="flex text-muted-foreground justify-start">
                Sep 12, 2024
              </p>
            </div>
          </div>
          <img src="/images/foytech-qura.jpg" alt="News image cover" className="w-full md:w-1/2 xl:w-full rounded-xl"/>
        </div>
      </Reveal>
    </section>
  )
}

export default NewsHeader
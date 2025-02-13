'use client';

import { useTranslation } from "react-i18next"
import { Reveal } from "react-awesome-reveal"
import { fadeIn } from "../../utils"

const Podcast = () => {
  const { t } = useTranslation()

  return (
    <section className="section">
      <Reveal keyframes={fadeIn} delay={200} duration={600} triggerOnce>
        <div className="container flex flex-col items-center gap-6 lg:flex-row md:gap-16 xl:gap-24">
          <div className="w-full md:w-2/3 xl:w-full space-y-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <img className="flex w-1/6 h-1/6" src="/images/o1-blogcard.webp" alt="o1-bg"/>
                <div className=" ml-3">
                  <h3 className="text-3xl font-bold tracking-tighter md:text-5xl/tight">
                    {t("news.podcast.title")}
                  </h3>
                  <p className="flex text-muted-foreground justify-start">
                    Sep 18, 2024
                  </p>
                </div>
              </div>
              <p className="">
                IST Legal yasohoye podcast(amajwi yafashe) yambere yakozwe na AI. akurikije udushya twikoranabuhanga kuva mu cyumweru 
                gishize, ibyanditswe n'amajwi byakozwe rwose na AI bishingiye ku masoko rusange, nta cyahinduwe n' intoki.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 xl:w-full space-y-6">
            <audio controls className="w-full">
              <source src="/audio/OpenAI_o1.wav" type="audio/wav" />
              <track kind="captions" srcLang="en" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default Podcast
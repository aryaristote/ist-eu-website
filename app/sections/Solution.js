'use client';

import { useTranslation } from "react-i18next"
import { Reveal } from "react-awesome-reveal"
import { fadeIn } from "../utils"
import { FaPlaneDeparture } from "react-icons/fa"
import { useInView } from "react-intersection-observer";

const Solution = () => {
    const { t } = useTranslation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.4,
    });

    return (

        <section className="bg-gray py-16">
            <Reveal keyframes={fadeIn} delay={300} duration={700} triggerOnce>
                <div className="container flex flex-col items-center px-4 service-2">
                    <div className="text-center flex flex-col items-center mb-12">
                        <h2 className="font-bold text-2xl text-center w-full md:w-[40%]" dangerouslySetInnerHTML={{ __html: t("pricing-card.title") }} />
                        <div className="w-24 h-1 bg-gray-500 mx-auto my-4"></div>
                        <p className="text-center w-full md:w-[80%]" dangerouslySetInnerHTML={{ __html: t("pricing-card.title-desc") }} />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 w-[98%] md:w-[90%]">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div class="md:w-[33%] m-2 flex flex-col items-start">
                                <span className="text-[80px] relative z-[80] top-12 left-2 font-bold count">1.</span>
                                <div class="service-item text-center">
                                    <img src="images/training.png" alt="Dashboard" class="icon" />
                                    <h3 className="text-xl py-2 font-semibold w-full">{t("pricing-card.heading-one")}</h3>
                                    <p className="text-center opacity-60">{t("pricing-card.desc-one")}</p>
                                </div>
                            </div>
                            <div class="md:w-[33%] m-2">
                                <span className="text-[80px] relative z-[80] top-12 left-2 font-bold count">2.</span>
                                <div class="service-item text-center">
                                    <img src="images/pricing.png" alt="More Income" class="icon" />
                                    <h3 className="text-xl py-2 font-semibold w-full">{t("pricing-card.heading-two")}</h3>
                                    <p className="text-center opacity-60">
                                        {t("pricing-card.desc-two")}
                                    </p>
                                </div>
                            </div>
                            <div class="md:w-[33%] m-2">
                                <span className="text-[80px] relative z-[80] top-12 left-2 font-bold count">3.</span>
                                <div class="service-item text-center">
                                    <img src="images/experience.png" className="w-160 h-30" alt="Monitor Online" class="icon" />
                                    <h3 className="text-xl py-2 font-semibold w-full">{t("pricing-card.heading-three")}</h3>
                                    <p className="text-center opacity-60">{t("pricing-card.desc-three")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}

export default Solution

'use client';

import { useTranslation } from "react-i18next"
import { Reveal } from "react-awesome-reveal"
import { fadeIn } from "../utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import { Button } from "../components/ui/button";
import Link from "next/link";

const FAQ = () => {
  const { t } = useTranslation()

  return (
    <section className="section- mb-5 md:mb-0 md:pb-8 mt-12 md:mt-6">
      <Reveal keyframes={fadeIn} fraction={1} delay={200} duration={600} triggerOnce>
        <div className="container">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl text font-bold tracking-tighter md:text-4xl/tight">
              {t("faq.heading")}
            </h2>
            <span className="title-border w-40 md:w-40 xl:w-40"></span>
            <Accordion type="single" collapsible className="w-full space-y-3 pt-2">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("faq.q1")}</AccordionTrigger>
                <AccordionContent>
                  {t("faq.a11")}
                  <br />
                  <br />
                  {t("faq.a12")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t("faq.q2")}</AccordionTrigger>
                <AccordionContent>{t("faq.a2")}</AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="w-full md:w-[140px]">
              <Link href="/faq">
                <Button className="h-6 px-4 py-2 sm:h-6 sm:px-5 sm:rounded-md lg:h-8 lg:px-5 lg:rounded-md lg:text-base primary-btn-o">
                  {t("view-more")}
                </Button>
              </Link>
            </div>
          </div> 
        </div>
      </Reveal>
    </section>
  )
}

export default FAQ

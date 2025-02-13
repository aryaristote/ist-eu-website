'use client';

import { useTranslation } from "react-i18next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion" 

export default function FAQContent() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[#f2f6f7]">
      <main className="pt-16 md:pt-28 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <section className="section mt-20 md:mt-8"> 
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold tracking-tighter text-center md:text-5xl/tight">
                  {t("faq.heading")}
                </h2>
                <div className="w-full max-w-3xl mt-8">
                  <Accordion 
                    type="single" 
                    collapsible 
                    className="w-full space-y-4"
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>{t("faq.q1")}</AccordionTrigger>
                      <AccordionContent>
                        {t("faq.a11")}
                        <br /><br />
                        {t("faq.a12")}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>{t("faq.q2")}</AccordionTrigger>
                      <AccordionContent>
                        {t("faq.a2")}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>{t("faq.q3")}</AccordionTrigger>
                      <AccordionContent>
                        {t("faq.a3")}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>{t("faq.q4")}</AccordionTrigger>
                      <AccordionContent>
                        {t("faq.a4")}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>{t("faq.q5")}</AccordionTrigger>
                      <AccordionContent>
                        {t("faq.a5")}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger>{t("faq.q6")}</AccordionTrigger>
                      <AccordionContent>
                        {t("faq.a6")}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                      <AccordionTrigger>{t("faq.q7")}</AccordionTrigger>
                      <AccordionContent>
                        {t("faq.a7")}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-8">
                      <AccordionTrigger>{t("faq.q8")}</AccordionTrigger>
                      <AccordionContent>
                        {t("faq.a8")}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div> 
            </section>
          </div>
        </div>
      </main> 
    </div>
  )
}

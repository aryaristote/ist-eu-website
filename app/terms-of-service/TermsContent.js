'use client';

import { useTranslation } from "react-i18next"

export default function TermsContent() {
  const { t } = useTranslation()

  return (
    <div className="container flex flex-col flex-grow py-8 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-5 pt-28 pb-16">
        <h2 className="text-3xl font-bold tracking-tighter md:text-5xl/tight">
          {t("terms-of-service.heading")}
        </h2>
        <div className="text-muted-foreground md:text-lg/relaxed space-y-6">
          {t("terms-of-service.full-terms", { returnObjects: true }).map(
            (section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-xl mb-2">{section.title}</h3>
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-2 ml-5">
                    {paragraph}
                  </p>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

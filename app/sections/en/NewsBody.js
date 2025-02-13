'use client';

import { useTranslation } from "react-i18next"
import { Reveal } from "react-awesome-reveal"
import { fadeIn } from "../../utils"

const NewsBody = () => {
  const { t } = useTranslation()
  const newsItems = t("news.qura.items", { returnObjects: true })

  return (
    <section className="">
      <Reveal keyframes={fadeIn} delay={200} duration={600} triggerOnce>
        <div className="container-small">
          {newsItems.map(
            (item, index) =>
              item.body && (
                <div key={index} className="container space-y-3 py-4">
                  <p className="">{item.body}</p>
                  <blockquote className="quote text-muted-foreground md:text-xl/relaxed">
                    <p className="pl-4">{item.quote}</p>
                    <footer className="pl-4">{item.citee}</footer>
                  </blockquote>
                </div>
              )
          )}
          <p className="container">{t("news.qura.conclusion")}</p>
        </div>
      </Reveal>
    </section>
  )
}

export default NewsBody
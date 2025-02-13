'use client';

import { useTranslation } from "react-i18next"
import { Reveal } from "react-awesome-reveal"
import { fadeIn } from "../../utils"

const NewsBody = () => {
  const { t } = useTranslation()
  const newsItems = t("news.qura.items", { returnObjects: true })

  return (
    <section className="section">
      <Reveal keyframes={fadeIn} delay={200} duration={600} triggerOnce>
        <div className="container-small">
            <div className="container space-y-3 py-4">
              <p className="">Nyuma yo kugerageza ibicuruzwa byinshi bya AI, Foyen yahisemo gutera imbere gusa hamwe na Qura na IST Legal, babigaragaje mu kigo cyose cy’abakora imyitozo bagera ku 100.</p>
              <blockquote className="quote text-muted-foreground md:text-xl/relaxed">
                <p className="pl-4">Gukoresha Qura nku buryo bushya bwo gushakisha bwa moteri zishakisha kugirango ugarure neza amasoko akenewe mu bushakashatsi bwagutse bw’ amategeko kandi ugenzure byihuse umusaruro wa AI utanga umusaruro watumye habaho guhuza bidasubirwaho hamwe na IST Legal's ibyara urubuga rwa AI. Gusubira mu bikorwa bya gakondo mu gushakisha amategeko ntabwo ari amahitamo.</p>
                <footer className="pl-4">- Madeleine Jönsson, Partner(umufatanyabikorwa muri Foyen) at Foyen</footer>
              </blockquote>
            </div> 
            <div className="container space-y-3 py-4">
              <p className="">The IST Legal platform, which started as an internal GenAI project, worked so well that Foyen decided to move the platform to IST Legal, an independent company, which will launch to the entire Nordic legal market</p>
              <blockquote className="quote text-muted-foreground md:text-xl/relaxed">
                <p className="pl-4">“Combining IST Legal's generative AI with Qura's non-generative AI search has yielded incredible productivity gains across the firm.”</p>
                <footer className="pl-4">- Richard Sahlberg, partner (umufatanyabikorwa muri Foyen) at Foyen</footer>
              </blockquote>
            </div> 
            <div className="container space-y-3 py-4">
              <p className="">Abifashijwemo na AI ya Foyen yageze ku ntego mu guhuza ibikoresho byombi, Qura na IST Legal noneho bazagirana ubufatanye butuma abakiriya bakoresha ibicuruzwa byombi hamwe kugirango bakore ibikoresho bikomeye bya AI.</p>
              <blockquote className="quote text-muted-foreground md:text-xl/relaxed">
                <p className="pl-4">Twabonye imbuga nyinchi za GenAI, ariko urubuga rwa IST Legal ruri muzikora neza. Foyen yerekanye agaciro ko guhuza Qura n’ urubuga rwa IST Legal, ubwo bufatanye bugamije kuzana abantu benchi.</p>
                <footer className="pl-4">- Arvid Winterfeldt, CEO Qura</footer>
              </blockquote>
            </div> 
          <p className="container">More information about this partnership will be communicated to Qura's and IST Legal's customers.</p>
        </div>
      </Reveal>
    </section>
  )
}

export default NewsBody
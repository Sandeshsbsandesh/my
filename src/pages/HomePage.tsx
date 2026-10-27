import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { SiteIntro } from "../components/SiteIntro"
import { Seo } from "../components/Seo"
import { homeJsonLd, HOME_DESCRIPTION, HOME_TITLE } from "../data/seo"
import { Closing } from "../sections/Closing"
import { Faq } from "../sections/Faq"
import { Hero } from "../sections/Hero"
import { PreviewRibbon } from "../sections/PreviewRibbon"
import { Audiences } from "../sections/Audiences"
import { Offerings } from "../sections/Offerings"
import { Pricing } from "../sections/Pricing"
import { Process } from "../sections/Process"
import { Promises } from "../sections/Promises"
import { Prototype } from "../sections/Prototype"

function embedIntro() {
  if (typeof window === "undefined") return false
  return new URLSearchParams(window.location.search).get("intro") === "1"
}

export function HomePage() {
  const jsonLd = homeJsonLd()
  const reduce = useReducedMotion()
  const embedded = useRef(embedIntro()).current
  const [armed, setArmed] = useState(false)
  const [showIntro, setShowIntro] = useState(() => !embedIntro())

  const startHero = useCallback(() => setArmed(true), [])
  const finishIntro = useCallback(() => setShowIntro(false), [])

  useEffect(() => {
    if (!reduce) return
    setArmed(true)
    setShowIntro(false)
  }, [reduce])

  return (
    <>
      <Seo title={HOME_TITLE} description={HOME_DESCRIPTION} path="/" jsonLd={jsonLd} />
      <Hero hold={!embedded && !armed} embed={embedded} />
      {showIntro && !reduce ? <SiteIntro onHero={startHero} onDone={finishIntro} /> : null}
      <PreviewRibbon />
      <Audiences />
      <Promises />
      <Prototype />
      <Offerings />
      <Process />
      <Pricing />
      <Faq />
      <Closing />
    </>
  )
}

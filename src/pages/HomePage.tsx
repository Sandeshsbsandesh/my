import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { SiteIntro } from "../components/SiteIntro"
import { usePageTitle } from "../hooks/usePageTitle"
import { Closing } from "../sections/Closing"
import { Faq } from "../sections/Faq"
import { Hero } from "../sections/Hero"
import { PreviewRibbon } from "../sections/PreviewRibbon"
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
  usePageTitle("Briefly — Your coolest website, without the hassle")
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
      <Hero hold={!embedded && !armed} embed={embedded} />
      {showIntro && !reduce ? <SiteIntro onHero={startHero} onDone={finishIntro} /> : null}
      <PreviewRibbon />
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

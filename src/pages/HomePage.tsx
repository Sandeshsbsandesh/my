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

const INTRO_KEY = "zebriyo.intro.seen"

function embedIntro() {
  if (typeof window === "undefined") return false
  return new URLSearchParams(window.location.search).get("intro") === "1"
}

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1"
  } catch {
    return false
  }
}

function skipHomeIntro() {
  if (typeof window === "undefined") return true
  if (embedIntro()) return true
  if (window.location.hash.length > 1) return true
  return introAlreadySeen()
}

export function HomePage() {
  const jsonLd = homeJsonLd()
  const reduce = useReducedMotion()
  const embedded = useRef(embedIntro()).current
  const skipIntro = useRef(skipHomeIntro()).current
  const [armed, setArmed] = useState(skipIntro)
  const [showIntro, setShowIntro] = useState(!skipIntro)

  const startHero = useCallback(() => setArmed(true), [])
  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1")
    } catch {
      // Private mode still skips a replay for this visit via state.
    }
    setShowIntro(false)
  }, [])

  useEffect(() => {
    if (!skipIntro) return
    try {
      sessionStorage.setItem(INTRO_KEY, "1")
    } catch {
      // Ignore private-mode storage failures.
    }
  }, [skipIntro])

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

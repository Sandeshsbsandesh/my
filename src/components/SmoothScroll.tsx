import { useEffect } from "react"
import { useReducedMotion } from "framer-motion"
import Lenis from "lenis"

let lenis: Lenis | null = null

export function scrollPage(target: number | HTMLElement, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { immediate })
    return
  }
  if (typeof target === "number") window.scrollTo(0, target)
  else target.scrollIntoView()
}

export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const next = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.15,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    })
    lenis = next

    const sync = () => {
      if (document.body.classList.contains("site-intro-on")) next.stop()
      else next.start()
    }
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })

    return () => {
      observer.disconnect()
      next.destroy()
      if (lenis === next) lenis = null
    }
  }, [reduce])

  return null
}

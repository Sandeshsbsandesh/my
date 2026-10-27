import { useEffect } from "react"
import { useReducedMotion } from "framer-motion"
import Lenis from "lenis"

let lenis: Lenis | null = null

const HEADER_OFFSET = -80

export function scrollPage(target: number | HTMLElement, immediate = false, offset = 0) {
  const current = lenis?.scroll ?? window.scrollY
  const top =
    typeof target === "number" ? target : target.getBoundingClientRect().top + current + offset
  const y = Math.max(0, top)
  if (lenis) {
    lenis.scrollTo(y, { immediate, duration: immediate ? 0 : 0.85 })
    return
  }
  window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" })
}

export function scrollToId(id: string, immediate = false) {
  const el = document.getElementById(id)
  if (!el) return false
  scrollPage(el, immediate, HEADER_OFFSET)
  return true
}

export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "")
  if (!id) return () => {}
  const jump = (immediate: boolean) => scrollToId(id, immediate)
  jump(true)
  const frame = window.requestAnimationFrame(() => jump(false))
  const later = window.setTimeout(() => jump(false), 280)
  return () => {
    window.cancelAnimationFrame(frame)
    window.clearTimeout(later)
  }
}

export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const next = new Lenis({
      autoRaf: true,
      anchors: false,
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

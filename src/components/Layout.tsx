import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Outlet, useLocation } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { EASE } from "./motion"
import { scrollPage, SmoothScroll } from "./SmoothScroll"

export function Layout() {
  const { pathname, hash } = useLocation()
  const reduce = useReducedMotion()
  const hasEntered = useRef(false)

  useEffect(() => {
    hasEntered.current = true
  }, [])

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        scrollPage(el, true)
        return
      }
    }
    scrollPage(0, true)
  }, [pathname, hash])

  return (
    <div className="flex min-h-svh flex-col">
      <SmoothScroll />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1">
        <motion.div
          key={pathname}
          initial={hasEntered.current && !reduce ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

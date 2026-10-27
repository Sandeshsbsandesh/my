import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { nav } from "../data/site"
import { cn } from "../lib/cn"
import { goHeroPreview, navCurrent, toHref } from "../lib/links"
import { Button } from "./Button"
import { Logo } from "./Logo"
import { EASE } from "./motion"
import { scrollPage, scrollToHash } from "./SmoothScroll"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const { pathname, hash } = useLocation()
  const [atHero, setAtHero] = useState(pathname === "/")
  const items = atHero ? nav : [{ label: "Home", href: "/#hero" }, ...nav]

  function onHome() {
    goHeroPreview()
    const hero = document.getElementById("hero")
    if (hero && pathname === "/") scrollPage(hero, false, -80)
    setOpen(false)
  }

  function onItem(href: string) {
    if (href === "/#hero") {
      onHome()
      return
    }
    setOpen(false)
    if (href.startsWith("/#")) scrollToHash(href)
  }

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== "/") {
      setAtHero(false)
      return
    }
    const hero = document.getElementById("hero")
    if (!hero) {
      setAtHero(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setAtHero(entry.isIntersecting && entry.intersectionRatio >= 0.28),
      { threshold: [0, 0.28, 1], rootMargin: "-64px 0px 0px 0px" },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-paper transition-shadow duration-300",
        scrolled ? "border-line shadow-[0_10px_30px_-24px_rgba(20,22,28,0.55)]" : "border-transparent shadow-none",
      )}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Zebriyo, home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <Link
              key={item.href}
              to={toHref(item.href, pathname)}
              className={cn(
                "link-draw text-sm text-ink-soft hover:text-ink",
                navCurrent(item.href, pathname, hash) && "text-ink",
              )}
              aria-current={navCurrent(item.href, pathname, hash) ? "page" : undefined}
              onClick={() => onItem(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/start" jelly className="px-3 sm:px-5">
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Get My Preview</span>
            <ArrowRight className="hidden size-4 sm:block" aria-hidden="true" />
          </Button>
          <button
            type="button"
            className="grid size-10 cursor-pointer place-items-center lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                className="grid place-items-center"
                initial={reduce ? false : { opacity: 0, rotate: -40 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={reduce ? undefined : { opacity: 0, rotate: 40 }}
                transition={{ duration: 0.16 }}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-auto bg-paper lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
          >
            <nav className="wrap flex flex-col py-8" aria-label="Mobile">
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.05 + index * 0.06, ease: EASE }}
                >
                  <Link
                    to={toHref(item.href, pathname)}
                    className="block border-b border-line py-4 font-serif text-4xl"
                    onClick={() => onItem(item.href)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.32, ease: EASE }}
              >
                <Button href="/start" jelly className="mt-8 w-full" onClick={() => setOpen(false)}>
                  Get My Preview
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

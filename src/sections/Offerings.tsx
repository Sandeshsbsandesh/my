import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { BrowserFrame } from "../components/BrowserFrame"
import { Button } from "../components/Button"
import { Mockup } from "../components/Mockups"
import { Collapse, EASE, MaskHeading, Reveal } from "../components/motion"
import { cn } from "../lib/cn"
import { works } from "../data/site"

const ROW_MS = 4800

export function Offerings() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [wide, setWide] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const item = works[active]

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)")
    const onChange = () => setWide(query.matches)
    onChange()
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduce || paused || !inView || !wide) return
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % works.length)
    }, ROW_MS)
    return () => window.clearTimeout(timer)
  }, [active, inView, paused, reduce, wide])

  return (
    <section ref={sectionRef} className="bg-paper">
      <div className="wrap py-12 sm:py-16">
      <MaskHeading className="max-w-[16ch] font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-[0.98] tracking-[-0.03em]">
        Pick the one that sounds like you.
      </MaskHeading>
      <Reveal delay={0.06}>
        <p className="mt-3 max-w-xl text-base text-ink-soft">
          Business websites, Instagram websites, influencer websites, portfolios, startup sites, landing pages, and
          revamps.{" "}
          <span className="lg:hidden">Tap one to see a sample layout.</span>
          <span className="hidden lg:inline">Choose a row to see a sample layout.</span>
        </p>
      </Reveal>

      <div
        className="mt-5 hidden items-center gap-6 lg:grid lg:grid-cols-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <motion.div
          className="col-span-4"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
        >
          {works.map((work, index) => {
            const selected = index === active
            return (
              <motion.button
                key={work.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(index)}
                variants={
                  reduce
                    ? undefined
                    : {
                        hidden: { opacity: 0, x: -18 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
                      }
                }
                className={cn(
                  "w-full cursor-pointer border-t border-line py-2.5 text-left transition-[border-color,background-color,padding] duration-300 last:border-b",
                  selected ? "border-l-2 border-l-accent bg-paper pl-4" : "border-l-2 border-l-transparent pl-4",
                )}
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-muted">{work.index}</span>
                  <span className="font-serif text-xl text-ink">{work.title}</span>
                </span>
                <span className="mt-1 block text-base leading-snug text-ink-soft">{work.summary}</span>
                {selected && !reduce ? (
                  <span className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent">Next</span>
                    <span className="block h-1 flex-1 overflow-hidden rounded-full bg-line">
                      <span
                        key={active}
                        className="hero-progress block h-full origin-left bg-accent"
                        style={{ animationPlayState: paused || !inView ? "paused" : "running" }}
                      />
                    </span>
                  </span>
                ) : null}
              </motion.button>
            )
          })}
        </motion.div>
        <motion.div
          className="col-span-8 min-w-0"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : 0.12 }}
        >
          <div className="rounded-xl bg-ink p-4 text-paper shadow-[0_30px_60px_-36px_rgba(20,22,28,0.7)] sm:p-5">
            {reduce ? (
              <Preview work={item} onDark />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.42, ease: EASE }}
                >
                  <Preview work={item} onDark />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>

      <div className="mt-5 border-t border-line lg:hidden">
        {works.map((work, index) => {
          const selected = index === active
          return (
            <div key={work.id} className="border-b border-line">
              <button
                type="button"
                className="flex w-full cursor-pointer items-start gap-3 py-4 text-left"
                aria-expanded={selected}
                onClick={() => setActive(index)}
              >
                <span className="block min-w-0 flex-1 text-left">
                  <span className="text-xs uppercase tracking-[0.16em] text-muted">{work.index}</span>
                  <span className="mt-1 block font-serif text-2xl">{work.title}</span>
                  <span className="mt-1 block text-base text-ink-soft">{work.summary}</span>
                </span>
                <ChevronDown
                  className={cn("mt-6 size-5 shrink-0 text-ink-soft transition-transform duration-300", selected && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
              <Collapse open={selected}>
                <div className="pb-4">
                  <div className="rounded-xl bg-ink p-3 text-paper">
                    <Preview work={work} onDark />
                  </div>
                </div>
              </Collapse>
            </div>
          )
        })}
      </div>
      </div>
    </section>
  )
}

function Preview({ work, onDark = false }: { work: (typeof works)[number]; onDark?: boolean }) {
  return (
    <>
      <p className={cn("mb-3 text-xs font-medium uppercase tracking-[0.16em]", onDark ? "text-paper/70" : "text-muted")}>
        Sample layout
      </p>
      <BrowserFrame url="yoursite.com">
        <Mockup name={work.mock} />
      </BrowserFrame>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className={cn("text-base", onDark ? "text-paper/70" : "text-ink-soft")}>Placeholder content, not a client project.</p>
        <Button href={`/start?type=${work.id}`} variant={onDark ? "light" : "primary"}>
          Start with this
        </Button>
      </div>
    </>
  )
}

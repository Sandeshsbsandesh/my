import { useEffect, useRef, useState, type MouseEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { BoutiqueMock, ClinicMock, HotelMock, InfluencerMock, JewelleryMock } from "./Mockups"
import { cn } from "../lib/cn"

type Card = { value: string; label: string; delta?: string; chart?: boolean }

const SLIDE_MS = 2000
const HOLD_MS = 2800

const slides: {
  id: string
  label: string
  url: string
  view: typeof InfluencerMock
  top: Card
  bottom: Card
}[] = [
  {
    id: "influencer",
    label: "Instagram influencer",
    url: "yourname.com",
    view: InfluencerMock,
    top: { value: "2.4M", label: "total views", delta: "+48%" },
    bottom: { value: "+128%", label: "Website traffic", chart: true },
  },
  {
    id: "boutique",
    label: "Boutique",
    url: "theboutique.com",
    view: BoutiqueMock,
    top: { value: "Coat", label: "New this week" },
    bottom: { value: "Ceramic", label: "In the room" },
  },
  {
    id: "clinic",
    label: "Clinic",
    url: "theclinic.com",
    view: ClinicMock,
    top: { value: "30 min", label: "Consultation" },
    bottom: { value: "Mon–Sat", label: "Open hours" },
  },
  {
    id: "jewellery",
    label: "Jewellery shop",
    url: "thejeweller.com",
    view: JewelleryMock,
    top: { value: "Ring", label: "In the case" },
    bottom: { value: "Chain", label: "Made to order" },
  },
  {
    id: "hotel",
    label: "Hotel",
    url: "thehotel.com",
    view: HotelMock,
    top: { value: "King", label: "Tonight" },
    bottom: { value: "Breakfast", label: "Until 10" },
  },
]

export function PrototypeReel({ name = "", run = true }: { name?: string; run?: boolean }) {
  const reduce = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [held, setHeld] = useState(false)
  const slide = slides[index]
  const typed = name.trim()

  useEffect(() => {
    if (!typed) return
    setHeld(true)
    const timer = window.setTimeout(() => setHeld(false), HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [typed])

  useEffect(() => {
    if (!run) return
    setIndex(0)
  }, [run])

  useEffect(() => {
    if (reduce || paused || held || !run) return
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearTimeout(timer)
  }, [index, paused, held, reduce, run])

  const step = (direction: number) => {
    setIndex((current) => (current + direction + slides.length) % slides.length)
  }

  const tilt = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const node = frameRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    node.style.setProperty("--py", `${(x * 5).toFixed(2)}deg`)
    node.style.setProperty("--px", `${(-y * 3.5).toFixed(2)}deg`)
  }

  const clearTilt = () => {
    const node = frameRef.current
    if (!node) return
    node.style.setProperty("--py", "0deg")
    node.style.setProperty("--px", "0deg")
  }

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative px-1 pb-2 lg:px-2 lg:pt-12 lg:pb-2">
        <svg className="hero-rings pointer-events-none absolute top-0 left-[4%] hidden h-7 w-[52%] lg:block" viewBox="0 0 200 32" aria-hidden="true">
          <path className="hero-arc" pathLength="1" d="M4 26C48 8 120 4 196 18" />
          {reduce ? (
            <circle cx="96" cy="10" r="2.2" fill="#f04420" />
          ) : (
            <circle r="2.2" fill="#f04420">
              <animateMotion dur="9s" repeatCount="indefinite" path="M4 26C48 8 120 4 196 18" />
            </circle>
          )}
        </svg>
        <svg className="pointer-events-none absolute top-0 right-2 hidden text-[#F04420] lg:block" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <g className="hero-cross">
            <circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <path d="M2 8H14M8 2V14" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </g>
        </svg>
        <svg className="hero-rings pointer-events-none absolute top-full left-0 mt-3 hidden h-5 w-32 lg:block" viewBox="0 0 140 24" aria-hidden="true">
          <path className="hero-arc hero-arc-low" pathLength="1" d="M4 6C28 20 78 22 136 10" />
        </svg>

        <div className="hero-stage relative lg:mr-4">
          <div ref={frameRef} className="hero-pointer" onMouseMove={tilt} onMouseLeave={clearTilt}>
          <div className="hero-lift relative rounded-[1.35rem] bg-white px-2.5 pb-2.5 pt-6 shadow-[0_24px_40px_-22px_rgba(16,19,27,0.28)] lg:rounded-[1.6rem] lg:px-3 lg:pb-3 lg:pt-7">
            <p className="absolute left-3.5 top-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/40">Sample</p>
            <div className="h-[228px] overflow-hidden rounded-[0.95rem] lg:h-[352px]">
              <motion.div
                className="flex h-full"
                animate={{ x: `${(-index * 100) / slides.length}%` }}
                transition={{ duration: reduce ? 0 : 0.9, ease: [0.76, 0, 0.18, 1] }}
                style={{ width: `${slides.length * 100}%` }}
              >
                {slides.map((item) => (
                  <div key={item.id} className="h-full shrink-0" style={{ width: `${100 / slides.length}%` }}>
                    <item.view name={typed} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {slide.id === "influencer" ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
            >
              <div className="hero-chip absolute -right-2 top-[20%] flex -rotate-6 items-center gap-2 rounded-2xl border border-[#10131B]/8 bg-white px-2.5 py-2 shadow-[0_16px_30px_-18px_rgba(16,19,27,0.35)]">
                <span className="grid size-7 place-items-center rounded-full border border-line text-ink">
                  <Eye className="size-3.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="flex items-baseline gap-1">
                    <span className="text-sm font-semibold leading-none">{slide.top.value}</span>
                    {slide.top.delta ? <span className="text-[10px] font-semibold text-[#F04420]">↑</span> : null}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-muted">{slide.top.label}</span>
                </span>
              </div>
              <div className="hero-chip hero-chip-b absolute -right-3 bottom-[12%] w-[8.75rem] rotate-3 rounded-2xl border border-[#10131B]/8 bg-white px-3 py-2 shadow-[0_16px_30px_-18px_rgba(16,19,27,0.35)]">
                <span className="block text-[10px] text-muted">{slide.bottom.label}</span>
                <span className={cn("mt-0.5 block text-sm font-semibold leading-none", slide.bottom.chart && "text-[#F04420]")}>
                  {slide.bottom.value}
                </span>
                {slide.bottom.chart ? (
                  <svg viewBox="0 0 88 28" className="mt-1.5 h-6 w-full text-[#F04420]" aria-hidden="true">
                    <path d="M1 22 L14 16 L24 18 L38 11 L50 14 L64 6 L86 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
          ) : null}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-3 flex items-center justify-center gap-3 lg:mt-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <span className="hidden lg:block" aria-hidden="true" />
        <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          className="grid size-8 cursor-pointer place-items-center text-ink/45 hover:text-ink"
          aria-label="Previous sample"
          onClick={() => step(-1)}
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Example previews">
          {slides.map((item, itemIndex) => {
            const active = itemIndex === index
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={item.label}
                onClick={() => setIndex(itemIndex)}
                className="relative flex cursor-pointer items-center py-3 sm:py-1"
              >
                <span
                  className={cn(
                    "block rounded-full",
                    active ? "size-2.5 bg-accent" : "size-1.5 bg-ink/25",
                  )}
                />
              </button>
            )
          })}
        </div>
        <button
          type="button"
          className="grid size-8 cursor-pointer place-items-center text-ink/45 hover:text-ink"
          aria-label="Next sample"
          onClick={() => step(1)}
        >
          <ChevronRight className="size-4" />
        </button>
        </div>
        <p className="hero-note pointer-events-none relative hidden justify-self-end text-right font-serif text-[1.35rem] italic leading-[0.95] text-[#F04420] lg:block">
          <svg className="absolute -top-3 -left-4 text-[#F04420]" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M8 1.2 9.1 6.2 14 8 9.1 9.8 8 14.8 6.9 9.8 2 8 6.9 6.2Z" fill="currentColor" />
          </svg>
          Beautiful sites.
          <span className="mt-0.5 block">Faster.</span>
        </p>
      </div>
    </div>
  )
}

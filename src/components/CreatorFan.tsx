import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { publicUrl } from "../lib/publicUrl"

const EASE = [0.22, 1, 0.36, 1] as const

const links = ["Reels", "Views", "Sponsors", "Contact"]

function Play({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M6 4.2 12 8 6 11.8V4.2z" fill="currentColor" />
    </svg>
  )
}

function SiteBar({ active, onPick }: { active: number; onPick: (index: number) => void }) {
  return (
    <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-2.5">
      <span className="font-serif text-[1.15rem] italic leading-none text-[#14203a]">Your Name</span>
      <span className="flex items-center gap-3 text-[11px] font-medium text-[#14203a]">
        {links.map((link, index) => (
          <button
            key={link}
            type="button"
            onClick={() => onPick(index)}
            className={index === active ? "cursor-pointer underline decoration-2 underline-offset-4" : "cursor-pointer text-[#14203a]/70"}
          >
            {link}
          </button>
        ))}
      </span>
      <span className="rounded-full bg-[#14203a] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">Sample</span>
    </div>
  )
}

function ReelsPage({ onPick }: { onPick: (index: number) => void }) {
  const reels = [
    { title: "Morning light", time: "0:18" },
    { title: "Market walk", time: "0:24" },
    { title: "Night bus", time: "0:31" },
  ]
  return (
    <div className="relative h-full overflow-hidden text-[#14203a]">
      <img src={publicUrl("influencer-plate.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
      <SiteBar active={0} onPick={onPick} />
      <div className="relative flex h-[calc(100%-46px)] flex-col px-5 pb-4 pt-1">
        <span className="w-fit rounded-full border border-[#14203a]/15 bg-white/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em]">CREATOR · SAMPLE</span>
        <p className="mt-3 max-w-[11ch] font-sans text-[2.35rem] font-semibold leading-[0.9] tracking-[-0.045em]">Reels worth staying for.</p>
        <p className="mt-2 font-serif text-sm italic">ನಮಸ್ಕಾರ!</p>
        <p className="mt-1 max-w-[26ch] text-[12px] leading-snug">The edit stays calm, and the point lands.</p>
        <ul className="mt-3 max-w-[240px] space-y-1">
          {reels.map((reel) => (
            <li key={reel.title} className="flex items-center justify-between gap-3 border-b border-[#14203a]/15 pb-1 text-[12px]">
              <span className="flex min-w-0 items-center gap-1.5 font-medium">
                <Play className="size-2.5 shrink-0" />
                <span className="truncate underline decoration-[#14203a]/30 underline-offset-2">{reel.title}</span>
              </span>
              <span className="text-[10px] text-[#14203a]/60">{reel.time}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex w-fit items-center gap-2 rounded-md bg-[#14203a] py-1 pl-1 pr-3 text-white">
          <span className="grid size-7 place-items-center rounded-sm bg-[#e23d12]">
            <Play className="size-3" />
          </span>
          <span>
            <span className="block text-[8px] font-semibold uppercase tracking-[0.14em] text-white/60">YouTube preview</span>
            <span className="block text-[12px] font-medium">City walk · 4:12</span>
          </span>
        </div>
      </div>
      <div className="absolute left-[46%] top-16 flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 shadow-[0_10px_24px_-16px_rgba(20,22,28,0.6)]">
        <span className="grid size-6 place-items-center rounded-full bg-[#14203a] text-white">
          <Play className="size-3" />
        </span>
        <span>
          <span className="block font-sans text-sm font-semibold leading-none">2.4M</span>
          <span className="block text-[9px] text-[#14203a]/55">avg. reel views</span>
        </span>
      </div>
      <div className="absolute left-[52%] top-[6.6rem] flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 shadow-[0_10px_24px_-16px_rgba(20,22,28,0.6)]">
        <span className="grid size-6 place-items-center rounded-sm bg-[#e23d12] text-white">
          <Play className="size-3" />
        </span>
        <span>
          <span className="block font-sans text-sm font-semibold leading-none">860K</span>
          <span className="block text-[9px] text-[#14203a]/55">on YouTube</span>
        </span>
      </div>
    </div>
  )
}

function ViewsPage({ onPick }: { onPick: (index: number) => void }) {
  return (
    <div className="flex h-full flex-col bg-[#fffdf6] text-[#14203a]">
      <div className="bg-[#f5c400]">
        <SiteBar active={1} onPick={onPick} />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-6 px-5 py-4">
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e23d12]">Instagram</p>
          <p className="mt-1 font-sans text-5xl font-semibold leading-none tracking-[-0.04em]">2.4M</p>
          <p className="mt-1 text-xs text-[#14203a]/55">Cumulative views</p>
          <ul className="mt-4 text-[13px]">
            <li className="flex items-center justify-between gap-3 border-t border-[#14203a]/10 py-2">
              <span>Highest liked reel</span>
              <span className="font-semibold">Morning light</span>
            </li>
            <li className="flex items-center justify-between gap-3 border-t border-[#14203a]/10 py-2">
              <span>Most viewed reel</span>
              <span className="font-semibold">Market walk</span>
            </li>
          </ul>
        </section>
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#14203a]">YouTube</p>
          <p className="mt-1 font-sans text-5xl font-semibold leading-none tracking-[-0.04em]">860K</p>
          <p className="mt-1 text-xs text-[#14203a]/55">Cumulative views</p>
          <ul className="mt-4 text-[13px]">
            <li className="flex items-center justify-between gap-3 border-t border-[#14203a]/10 py-2">
              <span>Most viewed video</span>
              <span className="font-semibold">City walk</span>
            </li>
            <li className="flex items-center justify-between gap-3 border-t border-[#14203a]/10 py-2">
              <span>Length</span>
              <span className="font-semibold">4:12</span>
            </li>
          </ul>
        </section>
      </div>
      <p className="mt-auto border-t border-[#14203a]/10 px-5 py-3 text-[11px] text-[#14203a]/45">yourname.com · Sample</p>
    </div>
  )
}

function SponsorsPage({ onPick }: { onPick: (index: number) => void }) {
  const brands = [
    { name: "Northwind", note: "Spring film, posted on Instagram and YouTube.", color: "#e23d12" },
    { name: "Fieldnote", note: "A desk film, told in one reel.", color: "#1d7a8c" },
    { name: "Atelier", note: "Lookbook stills and a short video.", color: "#c47b2b" },
  ]
  return (
    <div className="flex h-full flex-col bg-[#fffdf6] text-[#14203a]">
      <div className="bg-[#f5c400]">
        <SiteBar active={2} onPick={onPick} />
      </div>
      <div className="px-5 py-4">
        <p className="font-sans text-3xl font-semibold leading-none tracking-[-0.04em]">Brand sponsored.</p>
        <ul className="mt-4 space-y-2">
          {brands.map((brand) => (
            <li key={brand.name} className="flex items-center gap-3 border border-[#14203a]/10 bg-white px-3 py-2.5">
              <span className="h-12 w-16 shrink-0" style={{ backgroundColor: brand.color }} />
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{brand.name}</span>
                <span className="block text-[12px] text-[#14203a]/65">{brand.note}</span>
              </span>
              <span className="ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#14203a]/45">Sponsored</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-auto border-t border-[#14203a]/10 px-5 py-3 text-[11px] text-[#14203a]/45">yourname.com · Sample</p>
    </div>
  )
}

function ContactPage({ onPick }: { onPick: (index: number) => void }) {
  const lines = [
    { label: "Email", value: "hello@yourname.com" },
    { label: "Instagram", value: "@yourname" },
    { label: "YouTube", value: "Your Name" },
  ]
  return (
    <div className="flex h-full flex-col bg-[#fffdf6] text-[#14203a]">
      <div className="bg-[#f5c400]">
        <SiteBar active={3} onPick={onPick} />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-6 px-5 py-4">
        <div>
          <p className="font-sans text-3xl font-semibold leading-none tracking-[-0.04em]">Say hello.</p>
          <ul className="mt-4">
            {lines.map((line) => (
              <li key={line.label} className="border-t border-[#14203a]/10 py-2">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#14203a]/45">{line.label}</span>
                <span className="block text-sm font-medium">{line.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-end">
          <div className="border border-[#14203a]/15 bg-white px-3 py-2 text-[12px] text-[#14203a]/40">A short note</div>
          <span className="mt-3 inline-flex w-fit rounded-full bg-[#14203a] px-3.5 py-1.5 text-[12px] font-medium text-white">Send a note</span>
        </div>
      </div>
      <p className="mt-auto border-t border-[#14203a]/10 px-5 py-3 text-[11px] text-[#14203a]/45">yourname.com · Sample</p>
    </div>
  )
}

const pages = [ReelsPage, ViewsPage, SponsorsPage, ContactPage]

const thumbs = [
  { label: "01 Reels", wash: "#f5c400", ink: "#14203a" },
  { label: "02 Views", wash: "#fffdf6", ink: "#14203a" },
  { label: "03 Sponsors", wash: "#fff8ee", ink: "#14203a" },
  { label: "04 Contact", wash: "#ffffff", ink: "#14203a" },
]

export function CreatorFan() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const wasInView = useRef(false)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const seen = entry.isIntersecting && entry.intersectionRatio >= 0.28
        if (seen && !wasInView.current) setActive(0)
        wasInView.current = seen
        setInView(seen)
      },
      { threshold: [0, 0.28, 1] },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduce || !inView) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % pages.length), 3400)
    return () => window.clearInterval(timer)
  }, [reduce, active, inView])

  const Page = pages[active]

  return (
    <div ref={rootRef} className="bg-[#f5c400]">
      <div className="relative h-[440px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          >
            <Page onPick={setActive} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-4 gap-1.5 bg-[#14203a] p-2">
        {thumbs.map((thumb, index) => (
          <button
            key={thumb.label}
            type="button"
            onClick={() => setActive(index)}
            className="cursor-pointer border-2 px-2 py-2 text-left"
            style={{
              backgroundColor: thumb.wash,
              color: thumb.ink,
              borderColor: index === active ? "#f5c400" : "transparent",
            }}
          >
            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em]">{thumb.label}</span>
            <span className="mt-1 block h-1.5 w-8 bg-[#14203a]/80" />
            <span className="mt-1 block h-1 w-12 bg-[#14203a]/25" />
          </button>
        ))}
      </div>
    </div>
  )
}

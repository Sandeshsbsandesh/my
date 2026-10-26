import { useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { publicUrl } from "../lib/publicUrl"

const EASE = [0.22, 1, 0.36, 1] as const

function useCycle(count: number) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (reduce || count < 2) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % count), 3400)
    return () => window.clearInterval(timer)
  }, [reduce, active, count])
  return { active, setActive, reduce }
}

function Stage({
  pages,
  labels,
  ground,
}: {
  pages: ((onPick: (index: number) => void) => ReactNode)[]
  labels: { label: string; wash: string; ink: string }[]
  ground: string
}) {
  const { active, setActive, reduce } = useCycle(pages.length)
  const Page = pages[active]
  return (
    <div style={{ background: ground }}>
      <div className="relative h-[420px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          >
            {Page(setActive)}
          </motion.div>
        </AnimatePresence>
      </div>
      {labels.length > 1 ? (
        <div className="grid gap-1.5 bg-[#14203a] p-2" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}>
          {labels.map((thumb, index) => (
            <button
              key={thumb.label}
              type="button"
              onClick={() => setActive(index)}
              className="cursor-pointer border-2 px-2 py-2 text-left"
              style={{
                backgroundColor: thumb.wash,
                color: thumb.ink,
                borderColor: index === active ? ground : "transparent",
              }}
            >
              <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.12em]">{thumb.label}</span>
              <span className="mt-1 block h-1.5 w-8" style={{ backgroundColor: thumb.ink, opacity: 0.8 }} />
              <span className="mt-1 block h-1 w-12" style={{ backgroundColor: thumb.ink, opacity: 0.25 }} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function StartupBar({ active, onPick }: { active: number; onPick: (index: number) => void }) {
  const items = ["Offer", "Who", "Proof", "Start"]
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-white">
      <span className="font-sans text-sm font-semibold tracking-tight">Fieldnote</span>
      <span className="flex items-center gap-3 text-[11px]">
        {items.map((item, index) => (
          <button key={item} type="button" onClick={() => onPick(index)} className={index === active ? "cursor-pointer font-semibold underline decoration-2 underline-offset-4" : "cursor-pointer text-white/60"}>
            {item}
          </button>
        ))}
      </span>
      <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]">Sample</span>
    </div>
  )
}

function NoteCard() {
  const lines = ["Ship the page", "Cut the extra line", "Send it Friday"]
  return (
    <div className="w-full max-w-[240px] bg-white p-4 text-[#10131b] shadow-[0_24px_40px_-28px_rgba(0,0,0,0.8)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e23d12]">Friday note</p>
      <ul className="mt-3 space-y-2">
        {lines.map((line, index) => (
          <li key={line} className="flex items-center gap-2 border-b border-[#10131b]/10 pb-2 text-[13px] font-medium">
            <span className="font-sans text-[11px] text-[#10131b]/35">0{index + 1}</span>
            {line}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] leading-snug text-[#10131b]/70">One paragraph. The decision, and nothing around it.</p>
    </div>
  )
}

function StartupOffer({ onPick }: { onPick: (index: number) => void }) {
  return (
    <div className="flex h-full flex-col bg-[#10131b] text-white">
      <StartupBar active={0} onPick={onPick} />
      <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] items-center gap-4 px-5 pb-5">
        <div>
          <p className="font-sans text-[2.3rem] font-semibold leading-[0.92] tracking-[-0.045em]">The weekly update, already written.</p>
          <p className="mt-3 max-w-[28ch] text-[13px] leading-snug text-white/70">For a new product. One page that says what it is and what to do next.</p>
          <button type="button" onClick={() => onPick(3)} className="mt-4 cursor-pointer rounded-full bg-[#e23d12] px-3.5 py-1.5 text-[12px] font-medium">
            Get started
          </button>
        </div>
        <NoteCard />
      </div>
    </div>
  )
}

function StartupWho({ onPick }: { onPick: (index: number) => void }) {
  const people = [
    { title: "A founder", text: "You still write the update yourself, late on Thursday." },
    { title: "A small team", text: "Three people need the same three decisions." },
    { title: "A shop", text: "Customers should know what changed this week." },
  ]
  return (
    <div className="flex h-full flex-col bg-[#10131b] text-white">
      <StartupBar active={1} onPick={onPick} />
      <div className="px-5 py-4">
        <p className="font-sans text-3xl font-semibold tracking-[-0.04em]">Who it is for.</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {people.map((person) => (
            <article key={person.title} className="border border-white/15 p-3">
              <p className="text-sm font-semibold">{person.title}</p>
              <p className="mt-2 text-[12px] leading-snug text-white/65">{person.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function StartupProof({ onPick }: { onPick: (index: number) => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1ea] text-[#10131b]">
      <div className="bg-[#10131b]">
        <StartupBar active={2} onPick={onPick} />
      </div>
      <div className="grid flex-1 grid-cols-[0.8fr_1fr] items-center gap-6 px-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e23d12]">Product proof</p>
          <p className="mt-2 font-sans text-3xl font-semibold leading-[0.95] tracking-[-0.04em]">Three decisions. One paragraph. Sent Friday.</p>
        </div>
        <NoteCard />
      </div>
    </div>
  )
}

function StartupStart({ onPick }: { onPick: (index: number) => void }) {
  return (
    <div className="flex h-full flex-col bg-[#10131b] text-white">
      <StartupBar active={3} onPick={onPick} />
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-5">
        <p className="font-sans text-3xl font-semibold tracking-[-0.04em]">One next step.</p>
        <p className="mt-2 text-[13px] text-white/65">Leave an email. Friday’s note is the reply.</p>
        <div className="mt-4 border border-white/20 px-3 py-2.5 text-[13px] text-white/40">you@company.com</div>
        <span className="mt-3 w-fit rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#10131b]">Send me Friday’s note</span>
      </div>
    </div>
  )
}

export function StartupSite() {
  return (
    <Stage
      ground="#10131b"
      labels={[
        { label: "01 Offer", wash: "#10131b", ink: "#ffffff" },
        { label: "02 Who", wash: "#1c1e24", ink: "#ffffff" },
        { label: "03 Proof", wash: "#f4f1ea", ink: "#10131b" },
        { label: "04 Start", wash: "#ffffff", ink: "#10131b" },
      ]}
      pages={[
        (onPick) => <StartupOffer onPick={onPick} />,
        (onPick) => <StartupWho onPick={onPick} />,
        (onPick) => <StartupProof onPick={onPick} />,
        (onPick) => <StartupStart onPick={onPick} />,
      ]}
    />
  )
}

function ShopBar({ active, onPick }: { active: number; onPick: (index: number) => void }) {
  const items = ["Services", "Hours", "WhatsApp", "Fitting"]
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-[#2a2118]">
      <span className="font-serif text-[1.05rem] italic leading-none">The Workshop</span>
      <span className="flex items-center gap-3 text-[11px] font-medium">
        {items.map((item, index) => (
          <button key={item} type="button" onClick={() => onPick(index)} className={index === active ? "cursor-pointer underline decoration-2 underline-offset-4" : "cursor-pointer text-[#2a2118]/60"}>
            {item}
          </button>
        ))}
      </span>
      <span className="rounded-full bg-[#2a2118] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#f6f1ea]">Sample</span>
    </div>
  )
}

function ShopServices({ onPick }: { onPick: (index: number) => void }) {
  const services = [
    { name: "Repair", time: "45 min" },
    { name: "Fitting", time: "30 min" },
    { name: "Advice", time: "15 min" },
  ]
  return (
    <div className="relative h-full overflow-hidden text-[#2a2118]">
      <img src={publicUrl("boutique-plate.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover object-[72%_center]" />
      <ShopBar active={0} onPick={onPick} />
      <div className="relative max-w-[280px] px-5 pt-2">
        <p className="font-serif text-[2.2rem] leading-[0.92] tracking-[-0.03em]">Book a time this week.</p>
        <ul className="mt-3">
          {services.map((service) => (
            <li key={service.name} className="flex items-center justify-between border-b border-[#2a2118]/15 py-1.5 text-[13px]">
              <span className="font-medium">{service.name}</span>
              <span>{service.time}</span>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => onPick(2)} className="mt-3 cursor-pointer rounded-full bg-[#1f6b4a] px-3.5 py-1.5 text-[12px] font-medium text-white">
          WhatsApp
        </button>
      </div>
    </div>
  )
}

function ShopHours({ onPick }: { onPick: (index: number) => void }) {
  const days = [
    ["Thu", "11–6"],
    ["Fri", "11–6"],
    ["Sat", "11–6"],
    ["Sun", "11–6"],
  ]
  return (
    <div className="flex h-full flex-col bg-[#f3ece4] text-[#2a2118]">
      <ShopBar active={1} onPick={onPick} />
      <div className="grid flex-1 grid-cols-2 items-center gap-6 px-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f6b4a]">Visit</p>
          <p className="mt-2 font-serif text-4xl leading-none">Thu–Sun</p>
          <p className="mt-2 text-sm">11–6 · Your street</p>
        </div>
        <ul>
          {days.map(([day, hours]) => (
            <li key={day} className="flex justify-between border-b border-[#2a2118]/15 py-2 text-sm">
              <span className="font-medium">{day}</span>
              <span>{hours}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ShopChat({ onPick }: { onPick: (index: number) => void }) {
  return (
    <div className="flex h-full flex-col bg-[#efeae3] text-[#2a2118]">
      <ShopBar active={2} onPick={onPick} />
      <div className="mx-auto mt-4 w-full max-w-[280px] bg-[#e7f3ec] p-3">
        <p className="text-center text-[11px] font-semibold text-[#1f6b4a]">The Workshop</p>
        <p className="ml-auto mt-3 max-w-[85%] bg-[#1f6b4a] px-3 py-2 text-[12px] leading-snug text-white">Can I come in Thursday?</p>
        <p className="mt-2 max-w-[85%] bg-white px-3 py-2 text-[12px] leading-snug">Yes. 2pm for a fitting. We’re here 11–6.</p>
        <p className="mt-3 bg-white px-3 py-2 text-[12px] text-[#2a2118]/40">Message</p>
      </div>
    </div>
  )
}

function ShopFitting({ onPick }: { onPick: (index: number) => void }) {
  const points = ["What you want changed", "A pin and a mirror", "A time to collect it"]
  return (
    <div className="flex h-full flex-col bg-[#f3ece4] text-[#2a2118]">
      <ShopBar active={3} onPick={onPick} />
      <div className="grid flex-1 grid-cols-2 items-center gap-4 px-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f6b4a]">One offer</p>
          <p className="mt-2 font-serif text-4xl leading-[0.95]">A fitting. Thirty minutes.</p>
          <button type="button" onClick={() => onPick(2)} className="mt-4 cursor-pointer rounded-full bg-[#2a2118] px-3.5 py-1.5 text-[12px] font-medium text-[#f6f1ea]">
            Book this
          </button>
        </div>
        <ul className="space-y-2">
          {points.map((point) => (
            <li key={point} className="border border-[#2a2118]/15 bg-white px-3 py-2.5 text-[13px] font-medium">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function BusinessSite() {
  return (
    <Stage
      ground="#c4a882"
      labels={[
        { label: "01 Services", wash: "#f3ece4", ink: "#2a2118" },
        { label: "02 Hours", wash: "#efeae3", ink: "#2a2118" },
        { label: "03 WhatsApp", wash: "#e7f3ec", ink: "#1f6b4a" },
        { label: "04 Fitting", wash: "#ffffff", ink: "#2a2118" },
      ]}
      pages={[
        (onPick) => <ShopServices onPick={onPick} />,
        (onPick) => <ShopHours onPick={onPick} />,
        (onPick) => <ShopChat onPick={onPick} />,
        (onPick) => <ShopFitting onPick={onPick} />,
      ]}
    />
  )
}

function LaunchBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 text-white">
      <span className="font-sans text-sm font-semibold">Saturday class</span>
      <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]">Sample</span>
    </div>
  )
}

export function LandingSite() {
  const points = ["You leave with one finished page", "Twelve seats, one Saturday", "Bring a notebook"]
  return (
    <div className="grid min-h-[420px] grid-cols-[1.15fr_0.85fr] bg-[#101218] text-white">
      <div className="flex flex-col px-5 pb-6 pt-2">
        <LaunchBar />
        <p className="mt-4 font-sans text-[2.5rem] font-semibold leading-[0.9] tracking-[-0.045em]">One Saturday. Twelve seats.</p>
        <p className="mt-3 max-w-[28ch] text-[13px] leading-snug text-white/70">A single offer. The page says what it is, then asks for one thing.</p>
        <ul className="mt-4 space-y-1.5">
          {points.map((point) => (
            <li key={point} className="text-[13px] text-white/85">
              {point}
            </li>
          ))}
        </ul>
        <span className="mt-5 w-fit rounded-full bg-[#e23d12] px-3.5 py-1.5 text-[12px] font-medium">Join the list</span>
      </div>
      <div className="flex items-center justify-center pr-5">
        <div className="w-[168px] border border-white/20 bg-[#181b22] px-3 py-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50">On a phone</p>
          <p className="mt-3 font-sans text-xl font-semibold leading-[0.95]">One Saturday. Twelve seats.</p>
          <p className="mt-2 text-[10px] leading-snug text-white/60">The same page, stacked.</p>
          <span className="mt-3 inline-flex rounded-full bg-[#e23d12] px-2 py-1 text-[10px] font-medium">Join the list</span>
        </div>
      </div>
    </div>
  )
}

function RevampBar({ active, onPick }: { active: number; onPick: (index: number) => void }) {
  const items = ["Review", "Prototype", "Pages", "Keep"]
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-[#14161c]">
      <span className="font-sans text-sm font-semibold">The same shop</span>
      <span className="flex items-center gap-3 text-[11px] font-medium">
        {items.map((item, index) => (
          <button key={item} type="button" onClick={() => onPick(index)} className={index === active ? "cursor-pointer underline decoration-2 underline-offset-4" : "cursor-pointer text-[#14161c]/55"}>
            {item}
          </button>
        ))}
      </span>
      <span className="rounded-full bg-[#14161c] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">Sample</span>
    </div>
  )
}

function OldSite() {
  return (
    <div className="border border-[#b7b1a6] bg-[#ece7df] p-4 text-[#6d675e]">
      <p className="text-[10px] uppercase tracking-[0.14em]">Home</p>
      <p className="mt-4 font-serif text-2xl leading-tight">Welcome to our website</p>
      <p className="mt-2 text-[12px] leading-snug">We do many things. Click below to learn more about our mission.</p>
      <div className="mt-4 h-8 w-28 bg-[#b7b1a6]" />
    </div>
  )
}

function RevampReview({ onPick }: { onPick: (index: number) => void }) {
  const notes = ["The offer is missing", "No way to book", "The name can stay"]
  return (
    <div className="flex h-full flex-col bg-[#f7f4ee] text-[#14161c]">
      <RevampBar active={0} onPick={onPick} />
      <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] items-center gap-4 px-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e23d12]">Review</p>
          <p className="mt-2 font-sans text-3xl font-semibold leading-[0.95] tracking-[-0.04em]">What the current site fails to say.</p>
          <ul className="mt-3 space-y-1 text-[13px]">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        <OldSite />
      </div>
    </div>
  )
}

function RevampNew({ onPick }: { onPick: (index: number) => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f7f4ee] text-[#14161c]">
      <RevampBar active={1} onPick={onPick} />
      <div className="px-5 pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f6b4a]">Prototype</p>
        <div className="mt-3 border border-[#14161c]/10 bg-white p-4">
          <p className="font-serif text-[1.7rem] leading-[0.95]">Tailoring, booked this week.</p>
          <p className="mt-2 max-w-[36ch] text-[13px] leading-snug text-[#14161c]/70">What you do, who it is for, and how to start.</p>
          <span className="mt-3 inline-flex rounded-full bg-[#14161c] px-3 py-1.5 text-[12px] font-medium text-white">Book a visit</span>
        </div>
      </div>
    </div>
  )
}

function RevampPages({ onPick }: { onPick: (index: number) => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f7f4ee] text-[#14161c]">
      <RevampBar active={2} onPick={onPick} />
      <div className="grid flex-1 grid-cols-2 gap-3 px-5 py-4">
        <article className="border border-[#14161c]/10 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#14161c]/45">Services</p>
          <p className="mt-2 font-serif text-xl leading-tight">Repair, fitting, advice.</p>
          <p className="mt-1 text-[12px] text-[#14161c]/65">Each one gets its own page.</p>
        </article>
        <article className="border border-[#14161c]/10 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#14161c]/45">Visit</p>
          <p className="mt-2 font-serif text-xl leading-tight">Thu–Sun, 11–6.</p>
          <p className="mt-1 text-[12px] text-[#14161c]/65">The street stays where it was.</p>
        </article>
      </div>
    </div>
  )
}

function RevampKeep({ onPick }: { onPick: (index: number) => void }) {
  const kept = [
    { keep: "The name", why: "People already search for it." },
    { keep: "The street", why: "The visit page still needs it." },
    { keep: "The phone", why: "WhatsApp can use the same number." },
  ]
  return (
    <div className="flex h-full flex-col bg-[#f7f4ee] text-[#14161c]">
      <RevampBar active={3} onPick={onPick} />
      <div className="px-5 py-4">
        <p className="font-sans text-3xl font-semibold tracking-[-0.04em]">What to keep.</p>
        <ul className="mt-4">
          {kept.map((item) => (
            <li key={item.keep} className="flex items-baseline justify-between gap-4 border-t border-[#14161c]/10 py-2.5 text-[13px]">
              <span className="font-semibold">{item.keep}</span>
              <span className="text-[#14161c]/65">{item.why}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function RevampSite() {
  return (
    <Stage
      ground="#f7f4ee"
      labels={[
        { label: "01 Review", wash: "#ece7df", ink: "#6d675e" },
        { label: "02 Prototype", wash: "#ffffff", ink: "#14161c" },
        { label: "03 Pages", wash: "#f7f4ee", ink: "#14161c" },
        { label: "04 Keep", wash: "#fffdf8", ink: "#14161c" },
      ]}
      pages={[
        (onPick) => <RevampReview onPick={onPick} />,
        (onPick) => <RevampNew onPick={onPick} />,
        (onPick) => <RevampPages onPick={onPick} />,
        (onPick) => <RevampKeep onPick={onPick} />,
      ]}
    />
  )
}

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "../components/Button"
import { cn } from "../lib/cn"
import { PREVIEW_EVENT } from "../lib/links"

const HOLD_MS = 2500
const READ_MS = 5000

type Advantage = {
  n: string
  label: string
  title: string
  line: string
  text: string
  wide: boolean
}
const WIPES = {
  right: ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
  left: ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
  up: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
  down: ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
  circle: ["circle(0% at 50% 62%)", "circle(150% at 50% 62%)"],
  slant: ["polygon(0 0, 0 0, -40% 100%, 0 100%)", "polygon(0 0, 140% 0, 100% 100%, -40% 100%)"],
} as const

const WEB_NODES: Array<[number, number]> = [
  [5, 14], [12, 6], [20, 18], [8, 32], [16, 44], [6, 58], [14, 74], [26, 90],
  [38, 8], [50, 16], [64, 7], [76, 14], [90, 18], [96, 36], [84, 48], [94, 62],
  [82, 76], [70, 90], [92, 88], [48, 94], [36, 72], [30, 36], [62, 40], [72, 28],
]

const WEB_LINKS = [
  [0, 1], [1, 2], [0, 3], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [4, 6], [2, 4],
  [1, 8], [8, 9], [9, 10], [10, 11], [2, 8], [9, 11],
  [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [16, 18], [17, 18], [11, 23], [23, 12], [23, 14],
  [7, 20], [7, 19], [20, 19], [19, 17], [6, 20], [20, 4],
  [21, 2], [21, 4], [21, 8], [21, 9], [22, 9], [22, 10], [22, 14], [22, 23], [21, 22],
  [14, 22], [19, 16],
]

const SCENES: Array<{
  id: string
  label: string
  theme: string
  hold: number
  from: keyof typeof WIPES
  enter: number
  title: string
  ice?: string
  next?: string
  accent?: string
  sub: string
  button: "primary" | "light"
  link: "secondary" | "night"
  points?: Advantage[]
}> = [
  {
    id: "preview",
    label: "Preview",
    theme: "hero-scene-cream",
    hold: 3200,
    from: "right",
    enter: 1100,
    title: "Your coolest website.",
    ice: "coolest",
    next: "business",
    sub: "See your website in 24 hours.",
    button: "primary",
    link: "secondary",
  },
  {
    id: "simple",
    label: "Simple",
    theme: "hero-scene-night",
    hold: HOLD_MS,
    from: "circle",
    enter: 1100,
    title: "Without the hassle.",
    accent: "hassle.",
    sub: "One set of details. A preview the next day. No calls needed.",
    button: "light",
    link: "night",
  },
  {
    id: "care",
    label: "Care",
    theme: "hero-scene-heat",
    hold: HOLD_MS,
    from: "slant",
    enter: 1100,
    title: "From ₹1,999/month.",
    sub: "Care for the site you already have. A new site still starts as a one-day preview.",
    button: "primary",
    link: "night",
  },
  {
    id: "identity",
    label: "Identity",
    theme: "hero-scene-cream",
    hold: READ_MS,
    from: "up",
    enter: 1100,
    title: "What a website does.",
    sub: "How you show up before anyone calls.",
    button: "primary",
    link: "secondary",
    points: [
      {
        n: "01",
        label: "Brand identity",
        title: "Stronger Branding",
        line: "Make your first impression unforgettable.",
        text: "Give your business a distinctive identity, a professional presence and a look customers remember.",
        wide: true,
      },
      {
        n: "02",
        label: "Global reach",
        title: "Reach More Customers",
        line: "Be where your next customer is looking.",
        text: "Help people discover your business online, beyond your existing network and local reach.",
        wide: false,
      },
      {
        n: "03",
        label: "24/7 presence",
        title: "Always Open",
        line: "Your business doesn’t clock out.",
        text: "Let potential customers explore your services, view your work and find your contact details anytime.",
        wide: false,
      },
      {
        n: "04",
        label: "Customer trust",
        title: "Build Trust",
        line: "Look as good as the work you do.",
        text: "Showcase testimonials, projects, credentials and your story to help customers feel confident choosing you.",
        wide: true,
      },
    ],
  },
  {
    id: "growth",
    label: "Growth",
    theme: "hero-scene-night",
    hold: READ_MS,
    from: "down",
    enter: 1100,
    title: "What it keeps doing.",
    sub: "How the site keeps working after the first look.",
    button: "light",
    link: "night",
    points: [
      {
        n: "05",
        label: "New enquiries",
        title: "Get More Enquiries",
        line: "Turn curiosity into conversations.",
        text: "Make it easy for interested customers to call, message on WhatsApp, request a quote or book a service.",
        wide: false,
      },
      {
        n: "06",
        label: "Online discovery",
        title: "Get Discovered on Google",
        line: "Show up when people search for what you do.",
        text: "Build a search-friendly online presence so potential customers can find relevant information about your business.",
        wide: true,
      },
      {
        n: "07",
        label: "Your work, online",
        title: "Showcase Your Work",
        line: "Let your work speak before you do.",
        text: "Display your portfolio, products, services and previous projects in one beautiful, easy-to-explore place.",
        wide: true,
      },
      {
        n: "08",
        label: "Room to grow",
        title: "Ready to Scale",
        line: "Build a foundation for what’s next.",
        text: "Create room to expand your services, attract new audiences and introduce new offerings as your business grows.",
        wide: false,
      },
    ],
  },
]

function introRequested() {
  if (typeof window === "undefined") return false
  return new URLSearchParams(window.location.search).get("intro") === "1"
}

function MaskLine({ text, ice, next }: { text: string; ice: string; next?: string }) {
  const iceAt = text.indexOf(ice)
  const letters = Array.from(ice).map((letter, index) => (
    <span key={index} className="hero-ice-letter" style={{ ["--n" as string]: index }} aria-hidden="true">
      <span className="hero-ice-face">{letter}</span>
      <span className="hero-ice-glass">{letter}</span>
      <span className="hero-ice-sheen">{letter}</span>
    </span>
  ))
  return (
    <span className="hero-line">
      <span>
        {text.slice(0, iceAt)}
        {next ? (
          <span className="hero-swap">
            <span className="hero-swap-out" aria-hidden="true">
              {next}
            </span>
            <span className="hero-ice hero-swap-in" aria-label={ice}>
              {letters}
            </span>
          </span>
        ) : (
          <span className="hero-ice" aria-label={ice}>
            {letters}
          </span>
        )}
        {text.slice(iceAt + ice.length)}
      </span>
    </span>
  )
}

function WipeTitle({ text, accent }: { text: string; accent?: string }) {
  return (
    <p className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.035em]" aria-hidden="true">
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="hero-scene-word" style={{ ["--i" as string]: index }}>
          <span className={accent && word.toLowerCase().startsWith(accent.replace(".", "").toLowerCase()) ? "italic text-[#F04420]" : undefined}>
            {word}
          </span>
        </span>
      ))}
    </p>
  )
}

const PANEL_IN = {
  left: { clipPath: "inset(0 100% 0 0)", x: -36, y: 0 },
  right: { clipPath: "inset(0 0 0 100%)", x: 36, y: 0 },
  up: { clipPath: "inset(0 0 100% 0)", x: 0, y: -32 },
  down: { clipPath: "inset(100% 0 0 0)", x: 0, y: 32 },
} as const

function AdvantageSpread({ scene, run }: { scene: (typeof SCENES)[number]; run: boolean }) {
  const reduce = useReducedMotion()
  const night = scene.theme === "hero-scene-night"
  const directions = scene.id === "growth" ? (["right", "down", "up", "left"] as const) : (["left", "up", "down", "right"] as const)
  const settled = { clipPath: "inset(0% 0% 0% 0%)", x: 0, y: 0 }
  return (
    <div className="absolute inset-x-0 top-0 bottom-[6.75rem]">
      <div className="wrap flex h-full min-h-0 flex-col py-5 sm:py-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em]">
          <span className="mr-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-[#F04420]" aria-hidden="true" />
          {scene.title}
        </p>
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-12 sm:grid-rows-2 sm:gap-3">
          {scene.points?.map((point, index) => (
            <motion.article
              key={point.n}
              initial={PANEL_IN[directions[index]]}
              animate={reduce || run ? settled : PANEL_IN[directions[index]]}
              transition={{
                duration: reduce ? 0 : 0.55,
                delay: reduce || !run ? 0 : 0.2 + index * 0.62,
                ease: [0.77, 0, 0.18, 1],
              }}
              className={cn(
                "flex min-h-0 flex-col justify-between overflow-hidden rounded-2xl px-4 py-3 sm:p-5",
                point.wide ? "sm:col-span-7" : "sm:col-span-5",
                night
                  ? point.wide
                    ? "bg-[#f8f5ed] text-[#10131b]"
                    : "bg-[#23262f] text-[#f8f5ed]"
                  : point.wide
                    ? "bg-[#10131b] text-[#f8f5ed]"
                    : "bg-white text-[#10131b]",
              )}
            >
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-[2rem] italic leading-none text-[#F04420] sm:text-[clamp(2.4rem,4vw,3.8rem)]">{point.n}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] opacity-70">{point.label}</span>
                </div>
                <h2 className="mt-2 font-serif text-[1.35rem] leading-[0.95] tracking-[-0.03em] sm:mt-3 sm:text-[clamp(1.55rem,2.2vw,2.35rem)]">{point.title}</h2>
              </div>
              <div className="mt-2 sm:mt-3">
                <p className="text-sm leading-snug sm:text-[15px]">{point.line}</p>
                <p className="mt-1.5 hidden text-[13px] leading-snug opacity-75 sm:line-clamp-2 lg:line-clamp-3">{point.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

function SceneWeb() {
  return (
    <div className="hero-net absolute inset-0" aria-hidden="true">
      <svg className="hero-web" viewBox="0 0 100 100" preserveAspectRatio="none">
        {WEB_LINKS.map(([from, to]) => {
          const [x1, y1] = WEB_NODES[from]
          const [x2, y2] = WEB_NODES[to]
          return <line key={`${from}-${to}`} className="hero-web-line" x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
      </svg>
      {WEB_NODES.map(([x, y]) => (
        <span key={`${x}-${y}`} className="hero-node" style={{ left: `${x}%`, top: `${y}%` }} />
      ))}
    </div>
  )
}

export function Hero({ hold = false, embed = false }: { hold?: boolean; embed?: boolean }) {
  const reduce = useReducedMotion()
  const fromIntro = useRef(embed || introRequested()).current
  const sceneRefs = useRef<Array<HTMLElement | null>>([])
  const settledRef = useRef(0)
  const [play, setPlay] = useState(false)
  const [business, setBusiness] = useState("")
  const [paused, setPaused] = useState(false)
  const [shown, setShown] = useState(0)
  const [settled, setSettled] = useState(0)

  useEffect(() => {
    if (reduce) {
      setPlay(true)
      return
    }
    if (fromIntro || hold) return
    setPlay(true)
  }, [fromIntro, hold, reduce])

  useEffect(() => {
    if (!fromIntro || reduce) return
    const onMessage = (event: MessageEvent) => {
      if (event.data === "intro-go") setPlay(true)
    }
    window.addEventListener("message", onMessage)
    const fallback = window.setTimeout(() => setPlay(true), 12000)
    return () => {
      window.removeEventListener("message", onMessage)
      window.clearTimeout(fallback)
    }
  }, [fromIntro, reduce])

  useLayoutEffect(() => {
    if (shown === settledRef.current) return
    const next = sceneRefs.current[shown]
    const prev = sceneRefs.current[settledRef.current]
    if (reduce || !next || !prev) {
      settledRef.current = shown
      setSettled(shown)
      return
    }
    let dropped = false
    const wipe = WIPES[SCENES[shown].from]
    next.style.clipPath = wipe[0]
    const clip = next.animate([{ clipPath: wipe[0] }, { clipPath: wipe[1] }], {
      duration: SCENES[shown].enter,
      easing: "cubic-bezier(.77,0,.18,1)",
      fill: "both",
    })
    next.querySelector(".hero-scene-art")?.animate([{ transform: "scale(1.18)" }, { transform: "scale(1)" }], {
      duration: 1800,
      easing: "cubic-bezier(.2,.8,.2,1)",
      fill: "both",
    })
    prev.querySelector(".hero-scene-art")?.animate([{ transform: "scale(1)" }, { transform: "scale(0.96)" }], {
      duration: 1100,
      easing: "cubic-bezier(.77,0,.18,1)",
      fill: "both",
    })
    clip.onfinish = () => {
      if (dropped) return
      next.style.clipPath = ""
      settledRef.current = shown
      setSettled(shown)
    }
    return () => {
      dropped = true
      clip.cancel()
      next.style.clipPath = ""
    }
  }, [shown, reduce])

  useEffect(() => {
    if (!play || reduce || paused) return
    const timer = window.setTimeout(() => setShown((current) => (current + 1) % SCENES.length), SCENES[shown].hold)
    return () => window.clearTimeout(timer)
  }, [play, reduce, paused, shown])

  useEffect(() => {
    const onPreview = () => {
      settledRef.current = 0
      setShown(0)
      setSettled(0)
      setPaused(false)
      if (reduce || hold) {
        setPlay(true)
        return
      }
      setPlay(false)
      window.requestAnimationFrame(() => setPlay(true))
    }
    window.addEventListener(PREVIEW_EVENT, onPreview)
    return () => window.removeEventListener(PREVIEW_EVENT, onPreview)
  }, [hold, reduce])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return
      if (event.key === "ArrowRight") setShown((current) => (current + 1) % SCENES.length)
      if (event.key === "ArrowLeft") setShown((current) => (current - 1 + SCENES.length) % SCENES.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const previewHref = business.trim() ? `/start?name=${encodeURIComponent(business.trim())}` : "/start"

  return (
    <section id="hero" className={cn("scroll-mt-24 relative min-h-[calc(100svh-4rem-1px)] overflow-hidden", (play || reduce) && "hero-ready")}>
      {SCENES.map((scene, index) => {
        const visible = index === shown || index === settled
        return (
          <section
            key={scene.id}
            ref={(node) => {
              sceneRefs.current[index] = node
            }}
            className={cn("hero-scene", scene.theme, visible && "on")}
            style={{ zIndex: index === shown ? 3 : index === settled ? 2 : 1 }}
            aria-label={scene.label}
            aria-hidden={index !== shown}
          >
            <div className="hero-scene-art" aria-hidden="true">
              <div className={cn("hero-scene-drift", scene.points && "is-still")}>
                {scene.id === "preview" ? <SceneWeb /> : null}
                {scene.id === "simple" || scene.id === "care" ? <div className="hero-scene-mark" /> : null}
              </div>
            </div>
            {scene.points ? <AdvantageSpread scene={scene} run={index === shown || index === settled} /> : null}
            {scene.points ? null : <div className="hero-scene-copy">
              <div className="wrap">
                {scene.id === "preview" ? (
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft">
                    <span className="mr-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-[#F04420]" aria-hidden="true" />
                    Websites for creators, startups & businesses
                  </p>
                ) : null}
                {scene.ice ? (
                  <h1 className="mt-4 max-w-[16ch] font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.035em]">
                    <MaskLine text={scene.title} ice={scene.ice} next={scene.next} />
                  </h1>
                ) : (
                  <WipeTitle text={scene.title} accent={scene.accent} />
                )}
                <p className="hero-scene-rise mt-5 max-w-[34ch] text-lg leading-snug sm:text-xl">{scene.sub}</p>
                <label className="hero-scene-rise late mt-6 block max-w-sm">
                  <span className="text-sm opacity-80">Your business or creator name</span>
                  <input
                    value={business}
                    onChange={(event) => setBusiness(event.target.value)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                    placeholder="Enter name here"
                    maxLength={32}
                    autoComplete="organization"
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-base text-[#10131B] outline-none placeholder:text-[#5c574e]/70 focus-visible:border-[#10131B]"
                  />
                </label>
                <div className="hero-scene-rise late mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button href={previewHref} variant={scene.button} jelly className="w-full sm:w-auto">
                    Get My Preview
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                  <Button href="/work" variant={scene.link} pill className="w-full sm:w-auto">
                    Explore Our Work
                  </Button>
                </div>
              </div>
            </div>}
          </section>
        )
      })}
      <div className={cn("hero-scene-bar", SCENES[shown].theme)}>
        <div className="wrap flex gap-3.5" role="tablist" aria-label="Hero scenes">
          {SCENES.map((scene, index) => (
            <button
              key={scene.id}
              type="button"
              role="tab"
              aria-selected={shown === index}
              className={cn("hero-seg", index < shown && "is-done", index === shown && "is-on")}
              onClick={() => setShown(index)}
            >
              <span className="hero-seg-track">
                <span className="hero-seg-fill" style={index === shown ? { animationDuration: `${scene.hold}ms` } : undefined} />
              </span>
              {scene.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

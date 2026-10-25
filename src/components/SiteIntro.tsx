import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { BoutiqueMock, ClinicMock, HotelMock, InfluencerMock, JewelleryMock } from "./Mockups"

const FRAMES = [
  { View: InfluencerMock, angle: -18, tilt: -14, w: 300, h: 188 },
  { View: BoutiqueMock, angle: 54, tilt: 12, w: 280, h: 176 },
  { View: ClinicMock, angle: 126, tilt: -9, w: 128, h: 236, phone: true },
  { View: JewelleryMock, angle: 198, tilt: 16, w: 268, h: 170 },
  { View: HotelMock, angle: 270, tilt: -11, w: 292, h: 182 },
]

const LINES = [
  { text: "Still behind your competition without a website?", accent: [] as string[] },
  { text: "It’s time to grow your market.", accent: [] as string[] },
  { text: "Congrats. You’re in the right place.", accent: ["Congrats."] },
]

const WORD = 230
const LINE_GAP = 320
const FIRST = 1200

function schedule() {
  const words: Array<{ word: string; accent: boolean; delay: number }>[] = []
  let cursor = FIRST
  for (const line of LINES) {
    const row = line.text.split(" ").map((word) => {
      const item = { word, accent: line.accent.includes(word), delay: cursor }
      cursor += WORD
      return item
    })
    words.push(row)
    cursor += LINE_GAP
  }
  const revealAt = cursor + 550
  return { words, revealAt, heroAt: revealAt + 80 }
}

const PLAN = schedule()

type Spot = { left: number; top: number; width: number; height: number; cx: number; cy: number }
type Flight = { from: Spot[]; to: Spot; turn: number }

function spotOf(node: HTMLElement): Spot {
  const rect = node.getBoundingClientRect()
  return {
    left: rect.left + rect.width / 2 - node.offsetWidth / 2,
    top: rect.top + rect.height / 2 - node.offsetHeight / 2,
    width: node.offsetWidth,
    height: node.offsetHeight,
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
  }
}

export function SiteIntro({ onHero, onDone }: { onHero: () => void; onDone: () => void }) {
  const { words, revealAt, heroAt } = PLAN
  const [dim, setDim] = useState(false)
  const [open, setOpen] = useState(false)
  const [flight, setFlight] = useState<Flight | null>(null)
  const [go, setGo] = useState(false)

  useEffect(() => {
    if (!flight) return
    let second = 0
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => setGo(true))
    })
    return () => {
      window.cancelAnimationFrame(first)
      window.cancelAnimationFrame(second)
    }
  }, [flight])

  useEffect(() => {
    document.body.classList.add("site-intro-on")
    const fade = window.setTimeout(() => setDim(true), revealAt - 380)
    const reveal = window.setTimeout(() => {
      const nodes = [...document.querySelectorAll<HTMLElement>(".site-intro-tilt")]
      const target = document.querySelector<HTMLElement>(".hero-lift")
      if (target && nodes.length === FRAMES.length) {
        const to = spotOf(target)
        setFlight({
          from: nodes.map(spotOf),
          to,
          turn: window.matchMedia("(min-width: 1024px)").matches ? 5 : 0,
        })
      }
      setOpen(true)
    }, revealAt)
    const hero = window.setTimeout(onHero, heroAt)
    const done = window.setTimeout(onDone, revealAt + 1500)
    return () => {
      window.clearTimeout(fade)
      window.clearTimeout(reveal)
      window.clearTimeout(hero)
      window.clearTimeout(done)
      document.body.classList.remove("site-intro-on")
    }
  }, [heroAt, onDone, onHero, revealAt])

  return createPortal(
    <div className={open ? "site-intro reveal" : "site-intro"} aria-hidden="true">
      <div className="site-intro-shade" />
      {flight ? (
        FRAMES.map((frame, index) => {
          const from = flight.from[index]
          return (
            <div
              key={frame.angle}
              className={
                go
                  ? index === 0
                    ? "site-intro-flyer go lead"
                    : "site-intro-flyer go"
                  : "site-intro-flyer"
              }
              style={{
                left: from.left,
                top: from.top,
                width: from.width,
                height: from.height,
                ["--tilt" as string]: `${frame.tilt}deg`,
                ["--tx" as string]: `${flight.to.cx - from.cx}px`,
                ["--ty" as string]: `${flight.to.cy - from.cy}px`,
                ["--sx" as string]: flight.to.width / from.width,
                ["--sy" as string]: flight.to.height / from.height,
                ["--turn" as string]: `${flight.turn}deg`,
              }}
            >
              <div className={frame.phone ? "site-intro-tilt site-intro-phone" : "site-intro-tilt"}>
                <div className="site-intro-screen">
                  <frame.View />
                </div>
              </div>
            </div>
          )
        })
      ) : (
      <div className="site-intro-field">
        <div className="site-intro-spin">
          {FRAMES.map((frame) => (
            <div
              key={frame.angle}
              className="site-intro-slot"
              style={{
                ["--a" as string]: `${frame.angle}deg`,
                ["--tilt" as string]: `${frame.tilt}deg`,
                width: frame.w,
                height: frame.h,
                marginLeft: -frame.w / 2,
                marginTop: -frame.h / 2,
              }}
            >
              <div className="site-intro-face">
                <div className={frame.phone ? "site-intro-tilt site-intro-phone" : "site-intro-tilt"}>
                  <div className="site-intro-screen">
                    <frame.View />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
      <div className="site-intro-scene">
        <div className={dim ? "site-intro-lines dim" : "site-intro-lines"}>
          {words.map((line, lineIndex) => (
            <p className="site-intro-line" key={lineIndex}>
              {line.map((item, index) => (
                <span key={`${item.word}-${index}`}>
                  {index > 0 ? " " : null}
                  <span className={item.accent ? "site-intro-word accent" : "site-intro-word"} style={{ animationDelay: `${item.delay}ms` }}>
                    {item.word}
                  </span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { BarChart3, CalendarCheck, CreditCard, MessageCircle, Plug } from "lucide-react"
import { MaskHeading, Reveal } from "../components/motion"
import { SectionLabel } from "../components/SectionLabel"
import { integrations, processSteps } from "../data/site"

type Step = (typeof processSteps)[number]

function Arrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 12h14M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FlowNode({
  step,
  index,
  total,
  progress,
  reduce,
  dim,
}: {
  step: Step
  index: number
  total: number
  progress: MotionValue<number>
  reduce: boolean | null
  dim: boolean
}) {
  const start = index / total
  const end = Math.min(start + 0.22, 1)
  const opacity = useTransform(progress, [start, end], [0.3, 1])
  const shift = useTransform(progress, [start, end], [16, 0])

  return (
    <motion.li className="relative" style={reduce || !dim ? undefined : { opacity, y: shift }}>
      <div className="flex items-start gap-4">
        <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-accent bg-paper-2 font-serif italic text-accent">
          {step.index}
        </span>
        <div className="pt-1.5">
          <h3 className="font-serif text-xl leading-tight">{step.title}</h3>
          <p className="mt-1 max-w-[62ch] text-base text-ink-soft">{step.text}</p>
        </div>
      </div>
      {index < total - 1 ? <Arrow className="my-3 ml-2.5 size-5 rotate-90 text-accent" /> : null}
    </motion.li>
  )
}

const icons = {
  whatsapp: MessageCircle,
  payments: CreditCard,
  booking: CalendarCheck,
  analytics: BarChart3,
  api: Plug,
}

export function Process() {
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)
  const [wide, setWide] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)")
    const onChange = () => setWide(query.matches)
    onChange()
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 45%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const draw = useTransform(progress, [0, 1], [0, 1])

  return (
    <>
    <section id="process" className="bg-paper-2">
      <div className="wrap py-12 sm:py-16">
        <Reveal>
          <SectionLabel>Process</SectionLabel>
        </Reveal>
        <MaskHeading className="mt-2 font-serif text-[1.85rem] leading-[0.98] tracking-[-0.03em] sm:whitespace-nowrap sm:text-[clamp(1.05rem,3.6vw,2.6rem)] sm:leading-none">
          Four steps. No standing meetings.
        </MaskHeading>
        <div ref={listRef} className="relative mt-8">
          <span aria-hidden="true" className="absolute bottom-6 left-5 top-5 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-6 left-5 top-5 w-px origin-top bg-accent"
            style={{ scaleY: reduce ? 1 : draw }}
          />
          <ol>
            {processSteps.map((step, index) => (
              <FlowNode
                key={step.index}
                step={step}
                index={index}
                total={processSteps.length}
                progress={progress}
                reduce={reduce}
                dim={wide}
              />
            ))}
          </ol>
        </div>

      </div>
    </section>

    <section id="integrations" className="bg-paper">
      <div className="wrap py-12 sm:py-16">
        <Reveal>
          <SectionLabel>Integrations</SectionLabel>
        </Reveal>
        <MaskHeading as="h3" className="mt-2 max-w-[18ch] font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight tracking-[-0.03em]">
          Connected to the tools you already use.
        </MaskHeading>
        <ul className="mt-4 grid sm:grid-cols-2">
          {integrations.map((item, index) => {
            const Icon = icons[item.id]
            return (
              <Reveal as="li" key={item.id} delay={index * 0.05} className="flex gap-3 border-t border-line py-3">
                <Icon className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-ink-soft">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
    </>
  )
}

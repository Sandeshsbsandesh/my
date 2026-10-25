import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

export const EASE = [0.22, 1, 0.36, 1] as const

type Tag = "div" | "li" | "article" | "section"

const motionTags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
}

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const

export function MaskHeading({
  as = "h2",
  className,
  children,
}: {
  as?: "h2" | "h3"
  className?: string
  children: ReactNode
}) {
  const Tag = as
  return <Tag className={className}>{children}</Tag>
}

export function Reveal({
  as = "div",
  from = "up",
  delay = 0,
  className,
  children,
}: {
  as?: Tag
  from?: "up" | "left" | "right"
  delay?: number
  className?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const offset = from === "left" ? { x: -36, y: 0 } : from === "right" ? { x: 36, y: 0 } : { x: 0, y: 28 }

  if (reduce) {
    const Still = as
    return <Still className={className}>{children}</Still>
  }

  const MotionTag = motionTags[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

export function StepFade({ id, children }: { id: string | number; children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export function Collapse({
  open,
  children,
  id,
  labelledBy,
}: {
  open: boolean
  children: ReactNode
  id?: string
  labelledBy?: string
}) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          id={id}
          role={id ? "region" : undefined}
          aria-labelledby={labelledBy}
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduce ? undefined : { height: 0, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.38, ease: EASE }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

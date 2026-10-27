import { motion, useReducedMotion } from "framer-motion"
import { Link } from "react-router-dom"
import { MaskHeading, Reveal, EASE } from "../components/motion"
import { SectionLabel } from "../components/SectionLabel"
import { audiences, sectors } from "../data/seo"

const WIPE = {
  left: { clipPath: "inset(0 100% 0 0)", x: -28, y: 0 },
  right: { clipPath: "inset(0 0 0 100%)", x: 28, y: 0 },
  up: { clipPath: "inset(0 0 100% 0)", x: 0, y: -22 },
  down: { clipPath: "inset(100% 0 0 0)", x: 0, y: 22 },
} as const

const WIPE_DIRS = ["left", "up", "right", "down"] as const
const WIPE_SHOWN = { clipPath: "inset(0% 0% 0% 0%)", x: 0, y: 0 }
const WIPE_EASE = [0.77, 0, 0.18, 1] as const

const FOLD_HIDDEN = { clipPath: "inset(0 0 0 100%)", x: 36, opacity: 0 }
const FOLD_SHOWN = { clipPath: "inset(0% 0% 0% 0%)", x: 0, opacity: 1 }

export function Audiences() {
  const reduce = useReducedMotion()
  return (
    <>
      <section id="make" className="scroll-mt-24 overflow-hidden bg-paper-2">
        <div className="wrap py-12 sm:py-16">
          <Reveal>
            <SectionLabel>Who it’s for</SectionLabel>
          </Reveal>
          <MaskHeading className="mt-2 font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-[0.98] tracking-[-0.03em]">
            Affordable website maker
            <br />
            for businesses, Instagram, and portfolios.
          </MaskHeading>
          <Reveal delay={0.06}>
            <p className="mt-3 max-w-xl text-base text-ink-soft">
              Preview the next day. Care from ₹1,999 a month.
            </p>
          </Reveal>
          <motion.ul
            className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.06 } },
            }}
          >
            {audiences.map((item, index) => (
              <motion.li
                key={item.id}
                className="overflow-hidden border-t border-ink/15 pt-4"
                variants={{ hidden: WIPE[WIPE_DIRS[index % WIPE_DIRS.length]], show: WIPE_SHOWN }}
                transition={{ duration: reduce ? 0 : 0.55, ease: WIPE_EASE }}
              >
                <span className="font-serif text-xl italic text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif text-[1.45rem] leading-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{item.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section id="sectors" className="overflow-hidden bg-night text-paper">
        <div className="wrap py-12 sm:py-16">
          <Reveal>
            <SectionLabel tone="paper">Sectors</SectionLabel>
          </Reveal>
          <MaskHeading className="mt-2 max-w-[18ch] font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-[0.98] tracking-[-0.03em]">
            CA, CS, hotels, NGOs, schools, colleges, clinics.
          </MaskHeading>
          <Reveal delay={0.06}>
            <p className="mt-3 max-w-xl text-base text-paper/75">
              Same 24-hour preview. Hotel and clinic samples on the work page.
            </p>
          </Reveal>
          <motion.ul
            className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4"
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.16, delayChildren: reduce ? 0 : 0.1 } },
            }}
          >
            {sectors.map((item, index) => (
              <motion.li
                key={item.id}
                className="relative overflow-hidden border-t border-paper/15 pt-4 pl-4"
                variants={{ hidden: FOLD_HIDDEN, show: FOLD_SHOWN }}
                transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 top-4 w-px origin-top bg-accent"
                  variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1 } }}
                  transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
                />
                <p className="font-serif text-xl italic text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-serif text-[1.45rem] leading-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-paper/70">{item.text}</p>
                {"href" in item && item.href ? (
                  <Link
                    to={item.href}
                    className="mt-2 inline-block text-sm text-paper/80 underline decoration-paper/30 underline-offset-4 hover:text-paper"
                  >
                    Open sample
                  </Link>
                ) : null}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  )
}

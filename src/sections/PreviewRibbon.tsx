import { motion, useReducedMotion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { samplePreviews } from "../data/previews"

const PANEL_IN = {
  left: { clipPath: "inset(0 100% 0 0)", x: -36, y: 0 },
  right: { clipPath: "inset(0 0 0 100%)", x: 36, y: 0 },
  up: { clipPath: "inset(0 0 100% 0)", x: 0, y: -32 },
  down: { clipPath: "inset(100% 0 0 0)", x: 0, y: 32 },
} as const

const DIRS = ["left", "up", "right", "down", "left"] as const
const SHOWN = { clipPath: "inset(0% 0% 0% 0%)", x: 0, y: 0 }

export function PreviewRibbon() {
  const reduce = useReducedMotion()
  return (
    <section id="previews" className="bg-[#fffefb]">
      <div className="wrap py-14 sm:py-16">
        <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[0.96] tracking-[-0.03em]">Sample previews</h2>
        <p className="mt-3 max-w-xl text-ink-soft">
          Instagram influencer, boutique, clinic, jewellery shop, and hotel website layouts. Samples, not client work.
        </p>
        <motion.ul
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.62, delayChildren: reduce ? 0 : 0.08 } },
          }}
        >
          {samplePreviews.map((slide, index) => (
            <motion.li
              key={slide.id}
              variants={{ hidden: PANEL_IN[DIRS[index]], show: SHOWN }}
              transition={{ duration: reduce ? 0 : 0.55, ease: [0.77, 0, 0.18, 1] }}
            >
              <Link to={`/work?preview=${slide.id}`} className="group block" aria-label={`Open the ${slide.label} sample`}>
                <div className="hero-lift overflow-hidden rounded-2xl bg-white ring-1 ring-[#10131B]/10 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  <p className="px-3 pt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Sample</p>
                  <div className="relative mx-2 mb-2 aspect-[4/3] overflow-hidden rounded-xl">
                    <div className="absolute top-0 left-0 h-[118%] w-[118%] origin-top-left scale-[0.85]">
                      <slide.View />
                    </div>
                  </div>
                </div>
                <p className="mt-2.5 text-sm text-ink-soft group-hover:text-ink">{slide.label}</p>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <div className="mt-8">
          <Button href="/work" variant="secondary" pill>
            Explore Our Work
          </Button>
        </div>
      </div>
    </section>
  )
}

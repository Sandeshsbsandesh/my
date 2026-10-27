import { useState, type KeyboardEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Button } from "../components/Button"
import { EASE, MaskHeading, Reveal } from "../components/motion"
import { SectionLabel } from "../components/SectionLabel"
import { formatRupees, pricingGroups, pricingNotes } from "../data/site"
import { cn } from "../lib/cn"

type GroupId = (typeof pricingGroups)[number]["id"]

export function Pricing() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<GroupId>("once")
  const group = pricingGroups.find((item) => item.id === active) ?? pricingGroups[0]

  function onTabKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
    event.preventDefault()
    const index = pricingGroups.findIndex((item) => item.id === active)
    const next = event.key === "ArrowRight" ? index + 1 : index - 1 + pricingGroups.length
    const id = pricingGroups[next % pricingGroups.length].id
    setActive(id)
    document.getElementById(`pricing-tab-${id}`)?.focus()
  }

  return (
    <section id="pricing" className="scroll-mt-24 bg-paper-2">
      <div className="wrap py-12 sm:py-16">
        <Reveal>
          <SectionLabel>Pricing</SectionLabel>
        </Reveal>
        <MaskHeading className="mt-4 font-serif text-[1.75rem] leading-[0.98] tracking-[-0.03em] sm:whitespace-nowrap sm:text-[clamp(1.15rem,3.2vw,2.4rem)] sm:leading-none">
          Fixed scope. Fixed price.
        </MaskHeading>

        <div
          className="mt-6 flex w-full rounded-md border border-line bg-paper p-1 sm:inline-flex sm:w-auto"
          role="tablist"
          aria-label="Pricing"
          onKeyDown={onTabKey}
        >
          {pricingGroups.map((item) => {
            const selected = item.id === active
            return (
              <button
                key={item.id}
                id={`pricing-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="pricing-panel"
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "min-h-11 flex-1 cursor-pointer rounded px-2 py-2.5 text-center text-sm transition-colors duration-200 sm:min-h-0 sm:flex-none sm:px-4 sm:py-2",
                  selected ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
                )}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div id="pricing-panel" role="tabpanel" aria-labelledby={`pricing-tab-${group.id}`} className="mt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={group.id}
              className="@container"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
            >
              <p className="text-base leading-relaxed text-ink-soft sm:whitespace-nowrap sm:text-[clamp(0.5rem,2.5cqi,1rem)] sm:leading-normal">{group.summary}</p>
              <div className="mt-6 grid items-stretch gap-3 md:grid-cols-3 md:gap-px md:border md:border-line md:bg-line">
                {group.plans.map((plan) => (
                  <article key={plan.id} className="flex h-full flex-col rounded-lg border border-line bg-paper p-5 sm:p-6 md:rounded-none md:border-0 md:p-7">
                    <p className="h-4 text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                      {plan.popular ? "Most popular" : ""}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-tight">{plan.name}</h3>
                    <p className="mt-4">
                      {group.starting ? (
                        <span className="block h-4 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                          Starting at
                        </span>
                      ) : null}
                      <span className="font-serif text-[2rem] leading-none tracking-[-0.03em]">
                        {formatRupees(plan.amount)}
                        {group.id === "month" ? (
                          <span className="ml-1 font-sans text-sm font-medium tracking-normal text-ink-soft">/month</span>
                        ) : null}
                      </span>
                    </p>
                    <ul className="mt-6 flex-1 space-y-3 text-sm">
                      {plan.includes.map((line) => (
                        <li key={line} className="border-t border-line pt-3">
                          {line}
                        </li>
                      ))}
                    </ul>
                    <Button
                      href={`/start?plan=${plan.id}`}
                      variant={plan.popular ? "primary" : "secondary"}
                      jelly={group.cta === "Get My Preview"}
                      className="mt-8 w-full self-stretch"
                    >
                      {group.cta}
                    </Button>
                  </article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="mt-8 grid gap-3 border-t border-line pt-5 text-sm leading-relaxed text-muted sm:mt-6 sm:gap-2 sm:border-0 sm:pt-0 sm:leading-normal sm:grid-cols-2">
          {pricingNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

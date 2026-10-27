import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Collapse, MaskHeading, Reveal } from "../components/motion"
import { SectionLabel } from "../components/SectionLabel"
import { faqs } from "../data/site"
import { cn } from "../lib/cn"

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq">
      <div className="wrap py-12 sm:py-16">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
        </Reveal>
        <MaskHeading className="mt-4 max-w-[14ch] font-serif text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.03em]">
          Before you send your details.
        </MaskHeading>
        <p className="mt-4 max-w-xl text-ink-soft">
          Prices, business websites, Instagram websites, influencer websites, portfolios, and how the 24-hour preview
          works.
        </p>
        <div className="mt-6 border-t border-line">
          {faqs.map((item, index) => {
            const isOpen = open === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`
            return (
              <Reveal as="div" key={item.q} delay={Math.min(index, 3) * 0.05} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span className="font-serif text-xl sm:text-2xl">{item.q}</span>
                    <ChevronDown className={cn("size-5 shrink-0 transition-transform duration-300", isOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                </h3>
                <Collapse open={isOpen} id={panelId} labelledBy={buttonId}>
                  <p className="max-w-2xl pb-6 text-ink-soft">{item.a}</p>
                </Collapse>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

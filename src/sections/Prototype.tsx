import { Button } from "../components/Button"
import { MaskHeading, Reveal } from "../components/motion"
import { SectionLabel } from "../components/SectionLabel"
import { prototypeNeeds } from "../data/site"

export function Prototype() {
  return (
    <section id="prototype" className="scroll-mt-24 bg-night text-paper">
      <div className="wrap grid items-start gap-10 py-12 sm:py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel tone="paper">The first day</SectionLabel>
          </Reveal>
          <MaskHeading className="mt-4 max-w-[12ch] font-serif text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.03em]">
            See your website in <span className="italic text-accent">one day.</span>
          </MaskHeading>
          <p className="mt-4 font-serif text-[1.35rem] leading-snug lg:hidden">No kickoff call unless you ask for one.</p>
          <Reveal delay={0.08}>
            <h3 className="mt-8 font-serif text-2xl">What to send us</h3>
            <ul className="mt-4 max-w-xl">
              {prototypeNeeds.map((item) => (
                <li key={item} className="border-t border-paper/15 py-3 text-base text-paper sm:text-lg">
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/start" variant="light" jelly className="mt-8 w-full sm:w-auto">
              Get My Preview
            </Button>
          </Reveal>
        </div>
        <p className="hidden font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-snug lg:col-span-5 lg:block lg:pt-16">
          No kickoff call unless you ask for one.
        </p>
      </div>
    </section>
  )
}

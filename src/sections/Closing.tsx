import { Button } from "../components/Button"
import { MaskHeading, Reveal } from "../components/motion"

export function Closing() {
  return (
    <section className="bg-night text-paper">
      <div className="wrap py-12 sm:py-16">
        <MaskHeading className="max-w-[14ch] font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.03em]">
          Send your details.
        </MaskHeading>
        <Reveal delay={0.12}>
        <p className="mt-5 max-w-md text-paper/75">We reply by email or WhatsApp. Calls are optional.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/start" variant="light" jelly className="w-full sm:w-auto">
            Get My Preview
          </Button>
          <Button href="/work" variant="night" className="w-full sm:w-auto">
            Explore Our Work
          </Button>
        </div>
        </Reveal>
      </div>
    </section>
  )
}

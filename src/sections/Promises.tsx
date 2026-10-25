import { Reveal, MaskHeading } from "../components/motion"
import { promises } from "../data/site"

export function Promises() {
  return (
    <section className="bg-paper-2">
      <div className="wrap py-12 sm:py-16">
        <MaskHeading className="max-w-[16ch] font-serif text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.03em]">
          Why it’s easy to work with us.
        </MaskHeading>
        <ol className="mt-8 grid gap-8 max-md:gap-0 md:grid-cols-3">
          {promises.map((item, index) => (
            <Reveal as="li" key={item.index} delay={index * 0.06} className="max-md:border-t max-md:border-ink/15 max-md:py-6 first:max-md:border-t-0 first:max-md:pt-0 last:max-md:pb-0">
              <span className="font-serif text-2xl italic text-accent">{item.index}</span>
              <h3 className="mt-3 font-serif text-[1.65rem] leading-tight">{item.title}</h3>
              <p className="mt-2 text-ink-soft">{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { Link } from "react-router-dom"
import { MaskHeading, Reveal } from "../components/motion"
import { SectionLabel } from "../components/SectionLabel"
import { audiences, sectors } from "../data/seo"

export function Audiences() {
  return (
    <>
      <section id="make" className="bg-paper">
        <div className="wrap py-12 sm:py-16">
          <Reveal>
            <SectionLabel>Who it’s for</SectionLabel>
          </Reveal>
          <MaskHeading className="mt-4 max-w-[18ch] font-serif text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.03em]">
            Affordable website maker for businesses, Instagram, and portfolios.
          </MaskHeading>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-2xl text-ink-soft">
              Zebriyo is an affordable website maker. We build business websites, Instagram websites, influencer
              websites, and portfolio websites. You send your details. You get a working preview the next day. Monthly
              care starts at ₹1,999. A new Basic site starts at ₹9,999.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item, index) => (
              <Reveal as="li" key={item.id} delay={Math.min(index, 4) * 0.05}>
                <h3 className="font-serif text-[1.35rem] leading-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section id="sectors" className="bg-paper-2">
        <div className="wrap py-12 sm:py-16">
          <Reveal>
            <SectionLabel>Sectors</SectionLabel>
          </Reveal>
          <MaskHeading className="mt-4 max-w-[18ch] font-serif text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.03em]">
            CA, CS, hotels, NGOs, schools, colleges, clinics.
          </MaskHeading>
          <Reveal delay={0.06}>
            <p className="mt-4 max-w-2xl text-ink-soft">
              Same process for every sector: send your details, see a preview in 24 hours, change it by message. Hotel
              and clinic samples are on the work page. Those samples are not client projects.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((item, index) => (
              <Reveal as="li" key={item.id} delay={Math.min(index, 4) * 0.05}>
                <h3 className="font-serif text-[1.35rem] leading-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.text}</p>
                {"href" in item && item.href ? (
                  <Link
                    to={item.href}
                    className="mt-3 inline-block text-sm text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
                  >
                    Open sample
                  </Link>
                ) : null}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.12}>
            <p className="mt-10 max-w-2xl text-sm text-muted">
              Looking for an{" "}
              <Link to="/work?preview=hotel" className="text-ink-soft underline decoration-line underline-offset-4 hover:text-ink">
                hotel website
              </Link>
              , a{" "}
              <Link to="/work?preview=clinic" className="text-ink-soft underline decoration-line underline-offset-4 hover:text-ink">
                clinic website
              </Link>
              , a{" "}
              <Link to="/#make" className="text-ink-soft underline decoration-line underline-offset-4 hover:text-ink">
                cool animated website
              </Link>
              , or an{" "}
              <Link to="/start" className="text-ink-soft underline decoration-line underline-offset-4 hover:text-ink">
                NGO, school, or CA site
              </Link>
              ? Send your details and see the layout before you pay.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

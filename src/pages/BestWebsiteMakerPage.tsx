import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { MaskHeading, Reveal } from "../components/motion"
import { SectionLabel } from "../components/SectionLabel"
import { Seo } from "../components/Seo"
import { absoluteUrl } from "../data/seo"
import { site } from "../data/site"

const TITLE = "Zebriyo | Best Website Maker in India for Small Business (Done-for-You)"
const DESCRIPTION =
  "Looking for the best website maker in India? Zebriyo is a done-for-you website maker for small business, Instagram, influencer, and portfolio sites. Preview in 24 hours. Care from ₹1,999/month. Bengaluru-based (Infywe)."

const picks = [
  {
    title: "Best website maker if you want it built for you",
    name: "Zebriyo",
    text: "You send details. We design a working preview. Fixed prices in INR. Care from ₹1,999/month. Based in Bengaluru.",
  },
  {
    title: "Best DIY builder if you will design it yourself",
    name: "Wix / Hostinger / Framer-style tools",
    text: "Drag-and-drop or AI templates. You do the layout, copy, SEO, and updates. Cheaper sticker price if you have time.",
  },
  {
    title: "Best for a full online store",
    name: "Shopify / Dukaan-style platforms",
    text: "Catalogue, checkout, and inventory. Choose these when selling many products is the main job.",
  },
]

const reasons = [
  {
    t: "Done-for-you, not DIY",
    b: "Most “10 best website makers” lists mean builders you operate yourself. Zebriyo is for people who want a site made for them.",
  },
  {
    t: "India pricing in rupees",
    b: "Basic from ₹9,999 one-time. Monthly care from ₹1,999. No dollar sticker shock after conversion.",
  },
  {
    t: "Preview in 24 hours",
    b: "One set of details → a clickable main-page preview the next day. That preview is the first step, not the finished site.",
  },
  {
    t: "Built for real local use-cases",
    b: "Business, Instagram, influencer, portfolio, clinic, hotel, school, college, CA, and CS websites.",
  },
]

const faqs = [
  {
    q: "What is the best website maker in India in 2026?",
    a: "It depends. If you want to design the site yourself, DIY builders like Wix or Hostinger often top “best website maker” lists. If you want a done-for-you website with a 24-hour preview and INR pricing, Zebriyo is built for that.",
  },
  {
    q: "Is Zebriyo one of the 10 best website makers?",
    a: "Global “10 best website makers” roundups usually list DIY platforms with huge ad budgets. Zebriyo competes as an affordable website maker for Indian small businesses and creators who want the site built for them — not as a drag-and-drop app.",
  },
  {
    q: "Best website maker for small business in India?",
    a: "Pick a maker that ships a clear site, fixed price, and a way to get enquiries or bookings. Zebriyo starts care at ₹1,999/month and Basic builds at ₹9,999, with a preview after you send details.",
  },
  {
    q: "Best cheap website maker vs best looking website?",
    a: "Cheap DIY tools can look generic. Zebriyo aims for an affordable site that still looks intentional — animated where it helps — without a long agency process.",
  },
]

function jsonLd() {
  const url = absoluteUrl("/best-website-maker")
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: TITLE,
      url,
      description: DESCRIPTION,
      isPartOf: { "@id": `${absoluteUrl("/")}#website` },
      about: "Best website maker in India — done-for-you vs DIY",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Best website maker India", item: url },
      ],
    },
  ]
}

export function BestWebsiteMakerPage() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/best-website-maker" jsonLd={jsonLd()} />

      <Reveal className="wrap pb-6 pt-10 sm:pt-12">
        <SectionLabel>Guide</SectionLabel>
        <h1 className="mt-4 max-w-[18ch] font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.95] tracking-[-0.03em]">
          Best website maker in India — if you want it done for you.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          Searches like “best website makers” and “10 best website builders” are packed with DIY tools (
          <a
            className="link-draw text-ink"
            href="https://www.hostinger.com/in/tutorials/best-website-builder/"
            target="_blank"
            rel="noreferrer"
          >
            Hostinger
          </a>
          , Wix, and similar). {site.name} is different: an affordable, done-for-you website maker for Indian businesses
          and creators — operated by {site.legalName} in {site.city}.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/start" jelly>
            Get My Preview
          </Button>
          <Button href="/work" variant="secondary">
            See sample layouts
          </Button>
        </div>
      </Reveal>

      <section className="bg-paper-2">
        <div className="wrap py-12 sm:py-16">
          <SectionLabel>Quick picks</SectionLabel>
          <MaskHeading className="mt-3 max-w-[20ch] font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-[0.98] tracking-[-0.03em]">
            Match the tool to the job.
          </MaskHeading>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {picks.map((item) => (
              <Reveal key={item.title} className="border-t border-line pt-5">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">{item.title}</p>
                <h2 className="mt-3 font-serif text-2xl leading-tight">{item.name}</h2>
                <p className="mt-3 text-ink-soft">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap py-12 sm:py-16">
          <SectionLabel>Why Zebriyo</SectionLabel>
          <MaskHeading className="mt-3 max-w-[18ch] font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-[0.98] tracking-[-0.03em]">
            Built for “best website maker” searches that mean help, not a blank editor.
          </MaskHeading>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {reasons.map((item, index) => (
              <Reveal key={item.t} delay={index * 0.05}>
                <p className="font-serif text-xl italic text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-serif text-[1.45rem] leading-tight">{item.t}</h3>
                <p className="mt-2 text-ink-soft">{item.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night text-paper">
        <div className="wrap py-12 sm:py-16">
          <SectionLabel tone="paper">DIY vs done-for-you</SectionLabel>
          <h2 className="mt-3 max-w-[16ch] font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-[0.98] tracking-[-0.03em]">
            Same keyword. Different product.
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-paper/20 text-paper/60">
                  <th className="py-3 pr-4 font-medium">Need</th>
                  <th className="py-3 pr-4 font-medium">DIY makers</th>
                  <th className="py-3 font-medium">Zebriyo</th>
                </tr>
              </thead>
              <tbody className="text-paper/85">
                {[
                  ["Who designs the site", "You", "We do"],
                  ["First look", "Whenever you finish", "Preview after details (24h step)"],
                  ["Pricing", "USD / subscription tools", "INR packages + care from ₹1,999/mo"],
                  ["Best if", "You enjoy building", "You want enquiries, not another app"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-paper/10">
                    <td className="py-3 pr-4 font-medium text-paper">{row[0]}</td>
                    <td className="py-3 pr-4">{row[1]}</td>
                    <td className="py-3">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap py-12 sm:py-16">
          <SectionLabel>FAQ</SectionLabel>
          <MaskHeading className="mt-3 max-w-[16ch] font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-[0.98] tracking-[-0.03em]">
            Best website maker questions, answered plainly.
          </MaskHeading>
          <div className="mt-8 space-y-6 border-t border-line">
            {faqs.map((item) => (
              <Reveal key={item.q} className="border-b border-line py-5">
                <h3 className="font-serif text-xl sm:text-2xl">{item.q}</h3>
                <p className="mt-3 max-w-2xl text-ink-soft">{item.a}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Company details:{" "}
            <Link className="link-draw text-ink" to="/about">
              About Infywe / Zebriyo
            </Link>
            . Samples:{" "}
            <Link className="link-draw text-ink" to="/work">
              /work
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="wrap py-12 sm:py-16">
          <MaskHeading className="max-w-[14ch] font-serif text-[clamp(2.1rem,4vw,3.2rem)] leading-[0.96] tracking-[-0.03em]">
            Try the best next step: a preview.
          </MaskHeading>
          <p className="mt-4 max-w-xl text-ink-soft">
            Skip another “best of” tab. Send details and see a working main page — then decide.
          </p>
          <div className="mt-8">
            <Button href="/start" jelly>
              Get My Preview
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

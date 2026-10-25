import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { BrowserFrame } from "../components/BrowserFrame"
import { Button } from "../components/Button"
import { Mockup } from "../components/Mockups"
import { Reveal } from "../components/motion"
import { SectionLabel } from "../components/SectionLabel"
import { findSamplePreview, samplePreviews } from "../data/previews"
import { usePageTitle } from "../hooks/usePageTitle"
import { works } from "../data/site"
import { cn } from "../lib/cn"
import { Closing } from "../sections/Closing"

export function WorkPage() {
  usePageTitle("Work — Briefly")
  const [params] = useSearchParams()
  const opened = findSamplePreview(params.get("preview"))

  useEffect(() => {
    if (!opened) return
    document.getElementById("opened-preview")?.scrollIntoView({ block: "start" })
  }, [opened])

  return (
    <>
      <Reveal className="wrap pb-6 pt-8 sm:pt-10">
        <SectionLabel>Example layouts</SectionLabel>
        <h1 className="mt-4 max-w-[12ch] font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.03em]">
          The kinds of sites we build.
        </h1>
        <p className="mt-5 max-w-xl text-ink-soft">
          These are sample layouts with placeholder names. They show the shape of a creator site, a startup, a business,
          a landing page, and a revamp. They are not client projects and they are not results.
        </p>
      </Reveal>
      {opened ? (
        <section id="opened-preview" className="wrap scroll-mt-24 pb-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Sample preview</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-[-0.03em]">{opened.label}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {samplePreviews.map((item) => (
              <Link
                key={item.id}
                to={`/work?preview=${item.id}`}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm",
                  item.id === opened.id ? "bg-ink text-paper" : "border border-line text-ink-soft hover:text-ink",
                )}
                aria-current={item.id === opened.id ? "true" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <BrowserFrame url={opened.url}>
              <div className="h-[min(72vh,680px)]">
                <opened.View />
              </div>
            </BrowserFrame>
          </div>
        </section>
      ) : null}
      <div className="wrap">
        {works.map((work, index) => (
          <article key={work.id} className="grid items-center gap-6 border-t border-line py-8 lg:grid-cols-2 lg:gap-10 lg:py-10">
            <Reveal from={index % 2 === 1 ? "right" : "left"} className={cn("min-w-0", index % 2 === 1 && "lg:order-2")}>
              <BrowserFrame url="yoursite.com">
                <Mockup name={work.mock} />
              </BrowserFrame>
            </Reveal>
            <Reveal from={index % 2 === 1 ? "left" : "right"} delay={0.1}>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{work.index}</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight tracking-[-0.03em]">{work.title}</h2>
              <p className="mt-4 text-ink-soft">{work.detail}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {work.points.map((point) => (
                  <li key={point} className="border-t border-line py-2">
                    {point}
                  </li>
                ))}
              </ul>
              <Button href={`/start?type=${work.id}`} className="mt-8">
                Start with this
              </Button>
            </Reveal>
          </article>
        ))}
      </div>
      <Closing />
    </>
  )
}

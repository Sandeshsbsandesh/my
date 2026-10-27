import { Button } from "../components/Button"
import { Reveal } from "../components/motion"
import { Seo } from "../components/Seo"

export function NotFoundPage() {
  return (
    <Reveal className="wrap flex flex-col items-start py-16 sm:py-20">
      <Seo title="Page not found — Zebriyo" description="That page is not on Zebriyo." path="/404" index={false} />
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">404</p>
      <h1 className="mt-4 max-w-[12ch] font-serif text-5xl leading-[0.95] tracking-[-0.03em]">
        This page isn’t on the site.
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">The link may be old. The work and the brief are still here.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back home</Button>
        <Button href="/start" variant="secondary" jelly>
          Get My Preview
        </Button>
      </div>
    </Reveal>
  )
}

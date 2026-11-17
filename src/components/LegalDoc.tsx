import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { SectionLabel } from "./SectionLabel"
import { Seo } from "./Seo"
import { Reveal } from "./motion"
import { legalLinks } from "../data/site"

export function LegalDoc({
  label,
  title,
  description,
  path,
  children,
}: {
  label: string
  title: string
  description: string
  path: string
  children: ReactNode
}) {
  return (
    <Reveal className="wrap py-12 sm:py-16">
      <Seo title={`Zebriyo | ${title}`} description={description} path={path} />
      <SectionLabel>{label}</SectionLabel>
      <h1 className="mt-4 max-w-[18ch] font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.03em]">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft">{description}</p>
      <div className="mt-10 max-w-2xl space-y-8 text-base leading-relaxed text-ink-soft">{children}</div>
      <nav className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-sm">
        {legalLinks.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={
              item.href === path
                ? "font-medium text-ink"
                : "link-draw text-ink-soft hover:text-ink"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </Reveal>
  )
}

export function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-xl leading-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

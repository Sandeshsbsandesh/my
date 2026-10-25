import type { ReactNode } from "react"
import { cn } from "../lib/cn"

export function SectionLabel({
  children,
  tone = "ink",
}: {
  children: ReactNode
  tone?: "ink" | "paper"
}) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.18em]",
        tone === "paper" ? "text-paper/65" : "text-muted",
      )}
    >
      {children}
    </p>
  )
}

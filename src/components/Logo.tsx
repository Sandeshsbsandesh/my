import { cn } from "../lib/cn"

export function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const ink = tone === "paper"
  return (
    <span className={cn("inline-flex items-center gap-2", ink ? "text-paper" : "text-ink")}>
      <span className="font-serif text-[1.35rem] italic leading-none tracking-tight">briefly</span>
      <span
        className={cn(
          "border px-1 py-0.5 text-[10px] font-medium uppercase leading-none tracking-[0.14em]",
          ink ? "border-paper" : "border-ink",
        )}
      >
        24
      </span>
    </span>
  )
}

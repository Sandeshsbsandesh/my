import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "../lib/cn"

export function BrowserFrame({ children, url, soft = false }: { children: ReactNode; url: string; soft?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <div
      className={cn(
        "overflow-hidden border border-ink/10 bg-white",
        soft
          ? "rounded-[1.35rem] shadow-[0_30px_50px_-28px_rgba(20,22,28,0.38)]"
          : "rounded-lg shadow-[0_30px_70px_-36px_rgba(20,22,28,0.55)]",
      )}
    >
      <div className="flex h-10 items-center gap-2 border-b border-ink/10 bg-[#f6f3ec] px-3">
        <span className="size-2 rounded-full bg-[#e07a72]" />
        <span className="size-2 rounded-full bg-[#e2b34d]" />
        <span className="size-2 rounded-full bg-[#7dae86]" />
        <div className="ml-2 min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={url}
              initial={reduce ? false : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -12, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.28 }}
              className="truncate font-mono text-xs tracking-wide text-ink/70"
            >
              {url}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

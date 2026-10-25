import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { cn } from "../lib/cn"

type Variant = "primary" | "secondary" | "light" | "night"

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-[#2a2e38]",
  secondary: "border border-ink/20 bg-transparent text-ink hover:border-ink",
  light: "bg-paper text-ink hover:bg-white",
  night: "border border-paper/30 bg-transparent text-paper hover:border-paper",
}

type Props = {
  children: ReactNode
  href?: string
  variant?: Variant
  jelly?: boolean
  pill?: boolean
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
}

export function Button({
  children,
  href,
  variant = "primary",
  jelly = false,
  pill = false,
  className,
  onClick,
  type = "button",
}: Props) {
  const classes = cn(
    "inline-flex h-11 cursor-pointer items-center justify-center gap-2 px-4 text-sm font-medium sm:h-12 sm:px-5",
    jelly ? "jelly rounded-full" : pill ? "rounded-full" : "rounded-md",
    !jelly && "transition-[color,background-color,border-color,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0",
    variants[variant],
    className,
  )

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a className={classes} href={href} onClick={onClick} target="_blank" rel="noreferrer">
          {children}
        </a>
      )
    }
    if (href.startsWith("mailto:")) {
      return (
        <a className={classes} href={href} onClick={onClick}>
          {children}
        </a>
      )
    }
    return (
      <Link className={classes} to={href} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

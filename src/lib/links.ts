export function toHref(href: string, pathname: string) {
  if (pathname === "/" && href.startsWith("/#")) {
    return { pathname: "/", hash: href.slice(2) }
  }
  return href
}

export function navCurrent(href: string, pathname: string, hash: string) {
  if (href === "/" || href === "/#hero") return false
  if (href.startsWith("/#")) return pathname === "/" && (hash === href.slice(1) || hash === `#${href.slice(2)}`)
  return href === pathname
}

export const PREVIEW_EVENT = "zebriyo:preview"

export function goHeroPreview() {
  window.dispatchEvent(new Event(PREVIEW_EVENT))
}

import { Link, useLocation } from "react-router-dom"
import { footerNav, footerServices, site, whatsappHref } from "../data/site"
import { toHref } from "../lib/links"
import { Logo } from "./Logo"

export function Footer() {
  const { pathname } = useLocation()
  const whatsapp = whatsappHref()
  return (
    <footer className="border-t border-line bg-paper">
      <div className="wrap grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo size="footer" />
          <p className="mt-4 max-w-xs text-sm text-ink-soft">
            Affordable website maker for business websites, Instagram websites, influencer websites, and portfolios.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Explore</p>
          <ul className="mt-3 space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link to={toHref(item.href, pathname)} className="link-draw inline-block py-1.5 text-sm text-ink-soft hover:text-ink sm:py-0">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Websites</p>
          <ul className="mt-3 space-y-2">
            {footerServices.map((item) => (
              <li key={item.label}>
                <Link to={toHref(item.href, pathname)} className="link-draw inline-block py-1.5 text-sm text-ink-soft hover:text-ink sm:py-0">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Start</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/start" className="link-draw inline-block py-1.5 text-ink-soft hover:text-ink sm:py-0">
                Get My Preview
              </Link>
            </li>
            {site.email ? (
              <li>
                <a className="text-ink-soft hover:text-ink" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            ) : null}
            {whatsapp ? (
              <li>
                <a className="text-ink-soft hover:text-ink" href={whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Example layouts use placeholder content, not client projects.</p>
      </div>
    </footer>
  )
}

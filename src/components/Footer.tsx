import { Link, useLocation } from "react-router-dom"
import {
  footerNav,
  footerServices,
  gstinLabel,
  legalLinks,
  phoneDisplay,
  phoneHref,
  site,
  whatsappHref,
} from "../data/site"
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
            Zebriyo is an affordable website maker for business websites, Instagram websites, influencer websites, and
            portfolios.
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Operated by {site.legalName} · {site.city}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Explore</p>
          <ul className="mt-3 space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  to={toHref(item.href, pathname)}
                  className="link-draw inline-block py-1.5 text-sm text-ink-soft hover:text-ink sm:py-0"
                >
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
                <Link
                  to={toHref(item.href, pathname)}
                  className="link-draw inline-block py-1.5 text-sm text-ink-soft hover:text-ink sm:py-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/start" className="link-draw inline-block py-1.5 text-ink-soft hover:text-ink sm:py-0">
                Get My Preview
              </Link>
            </li>
            <li>
              <Link to="/about" className="link-draw inline-block py-1.5 text-ink-soft hover:text-ink sm:py-0">
                About Infywe
              </Link>
            </li>
            {site.email ? (
              <li>
                <a className="text-ink-soft hover:text-ink" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            ) : null}
            {site.phone ? (
              <li>
                <a className="text-ink-soft hover:text-ink" href={phoneHref()}>
                  {phoneDisplay()}
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
      <div className="wrap flex flex-col gap-3 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Brand: {site.name}.
          </p>
          <p>
            GSTIN: {gstinLabel()}
            {site.gstin ? null : " · ask for invoice details anytime"}
          </p>
          <p>
            {site.city}, {site.region}, {site.country}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <nav className="flex flex-wrap gap-x-4 gap-y-1">
            {legalLinks.map((item) => (
              <Link key={item.href} to={item.href} className="link-draw text-ink-soft hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
          <p>Example layouts use placeholder content, not client projects.</p>
        </div>
      </div>
    </footer>
  )
}

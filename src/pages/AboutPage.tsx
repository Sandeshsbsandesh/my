import { Link } from "react-router-dom"
import { LegalBlock, LegalDoc } from "../components/LegalDoc"
import { gstinLabel, phoneDisplay, phoneHref, site } from "../data/site"

export function AboutPage() {
  return (
    <LegalDoc
      label="About"
      title="Who runs Zebriyo"
      description="Zebriyo is the website-making brand of Infywe, based in Bengaluru, India. Here is the business information you can verify."
      path="/about"
    >
      <LegalBlock title="Brand and legal name">
        <p>
          <strong className="text-ink">Zebriyo</strong> is the public brand. The legal business name is{" "}
          <strong className="text-ink">{site.legalName}</strong>.
        </p>
        <p>
          We build affordable websites for businesses, Instagram creators, influencers, portfolios, schools,
          colleges, clinics, hotels, and similar organisations.
        </p>
      </LegalBlock>

      <LegalBlock title="Registered details">
        <ul className="list-none space-y-2">
          <li>
            <span className="text-muted">Legal name:</span> {site.legalName}
          </li>
          <li>
            <span className="text-muted">Trade name:</span> {site.name}
          </li>
          <li>
            <span className="text-muted">GSTIN:</span> {gstinLabel()}
            {!site.gstin ? (
              <span className="mt-1 block text-sm text-muted">
                Replace this placeholder as soon as the GSTIN is confirmed. Ask us by email if you need it for an
                invoice today.
              </span>
            ) : null}
          </li>
          <li>
            <span className="text-muted">City:</span> {site.city}, {site.region}, {site.country}
          </li>
        </ul>
      </LegalBlock>

      <LegalBlock title="Contact">
        <ul className="list-none space-y-2">
          <li>
            <span className="text-muted">Email:</span>{" "}
            <a className="link-draw text-ink" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li>
            <span className="text-muted">Phone / WhatsApp:</span>{" "}
            <a className="link-draw text-ink" href={phoneHref()}>
              {phoneDisplay()}
            </a>
          </li>
        </ul>
        <p>We reply by email or WhatsApp. Calls are optional and only when you ask.</p>
      </LegalBlock>

      <LegalBlock title="How to start">
        <p>
          Send your details on the{" "}
          <Link className="link-draw text-ink" to="/start">
            Get My Preview
          </Link>{" "}
          form. You get a working preview of the main page after one set of details — that preview is the first step,
          not the finished website.
        </p>
      </LegalBlock>
    </LegalDoc>
  )
}

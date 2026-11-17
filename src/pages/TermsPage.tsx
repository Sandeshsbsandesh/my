import { LegalBlock, LegalDoc } from "../components/LegalDoc"
import { site } from "../data/site"

export function TermsPage() {
  return (
    <LegalDoc
      label="Terms"
      title="Terms of service"
      description="Basic terms for using zebriyo.com and buying website or care services from Infywe trading as Zebriyo."
      path="/terms"
    >
      <LegalBlock title="Agreement">
        <p>
          By requesting a preview or paying for a plan, you agree to work with {site.legalName} under the Zebriyo brand.
          Prices shown on the site are starting prices unless a fixed quote is agreed in writing (email is enough).
        </p>
      </LegalBlock>

      <LegalBlock title="Preview vs finished website">
        <p>
          The 24-hour step is a working preview of the main page after you send details. It is not the finished website.
          Remaining pages, integrations, and go-live follow the agreed scope and payment.
        </p>
      </LegalBlock>

      <LegalBlock title="Scope and revisions">
        <p>
          Each package lists what is included. Extra pages, major redesigns, or new features outside that list are quoted
          separately. Revision rounds follow the plan you chose.
        </p>
      </LegalBlock>

      <LegalBlock title="Your content">
        <p>
          You confirm you own or have rights to logos, photos, and copy you send us. You keep ownership of your brand
          assets. We may show anonymised process samples only with permission — sample layouts on this site are
          placeholders, not client projects.
        </p>
      </LegalBlock>

      <LegalBlock title="Third-party tools">
        <p>
          Domain registration, hosting add-ons, payment gateways, and paid plugins may carry separate fees from those
          providers. We will flag them before you commit when they are required for your scope.
        </p>
      </LegalBlock>

      <LegalBlock title="Contact">
        <p>
          Questions about these terms:{" "}
          <a className="link-draw text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </LegalBlock>
    </LegalDoc>
  )
}

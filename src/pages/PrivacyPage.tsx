import { LegalBlock, LegalDoc } from "../components/LegalDoc"
import { site } from "../data/site"

export function PrivacyPage() {
  return (
    <LegalDoc
      label="Privacy"
      title="Privacy policy"
      description="How Zebriyo (Infywe) collects and uses information when you contact us or request a website preview."
      path="/privacy"
    >
      <LegalBlock title="Who we are">
        <p>
          Zebriyo is operated by {site.legalName}, {site.city}, {site.country}. Contact:{" "}
          <a className="link-draw text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </LegalBlock>

      <LegalBlock title="What we collect">
        <p>When you use Get My Preview or email us, we may receive:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name, business or creator name, and contact details you submit</li>
          <li>Project details, page list, links, and requirements you write in the form</li>
          <li>Technical basics such as browser type if needed to fix a delivery issue</li>
        </ul>
      </LegalBlock>

      <LegalBlock title="How we use it">
        <p>
          We use your details only to reply, prepare a preview, deliver the website project, and support care plans you
          buy. We do not sell your personal data.
        </p>
        <p>
          If you submit client feedback and tick consent to publish, we may show your first name, business name, rating,
          and note as a testimonial on zebriyo.com or related marketing. You can ask us to remove it anytime by emailing{" "}
          {site.email}.
        </p>
      </LegalBlock>

      <LegalBlock title="Sharing">
        <p>
          We may use email delivery and hosting providers to run the service. They process data only to send messages or
          host the site. We do not share your brief with unrelated third parties for marketing.
        </p>
      </LegalBlock>

      <LegalBlock title="Retention">
        <p>
          We keep project and contact records for as long as needed to deliver the work, handle support, and meet legal or
          tax obligations. You can ask us to update or delete details that are no longer required for an active project.
        </p>
      </LegalBlock>

      <LegalBlock title="Your choices">
        <p>
          Email {site.email} to access, correct, or request deletion of personal data we hold about you, subject to
          records we must keep for invoices or active contracts.
        </p>
      </LegalBlock>
    </LegalDoc>
  )
}

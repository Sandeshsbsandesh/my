import { LegalBlock, LegalDoc } from "../components/LegalDoc"
import { site } from "../data/site"

export function RefundPage() {
  return (
    <LegalDoc
      label="Refunds"
      title="Cancellation & refund policy"
      description="How cancellations, revisions, and refunds work for Zebriyo website projects and monthly care."
      path="/refund"
    >
      <LegalBlock title="Before work starts">
        <p>
          If you cancel before we begin the preview or paid build, and no work has started, we refund any advance in
          full (minus payment-gateway fees if the provider does not return them).
        </p>
      </LegalBlock>

      <LegalBlock title="After the preview">
        <p>
          The preview is a design and build effort based on your details. If you choose not to continue after the
          preview, fees already charged for that preview step are not refundable. Unused future stages that were not
          started can be cancelled without further charge.
        </p>
      </LegalBlock>

      <LegalBlock title="During a paid build">
        <p>
          Once a paid stage is underway, refunds are considered only for undelivered stages. Completed work (design,
          pages delivered, revisions used) is charged. We will confirm in writing what remains open before any partial
          refund.
        </p>
      </LegalBlock>

      <LegalBlock title="Monthly care">
        <p>
          Care plans renew per billing cycle. Cancel before the next cycle to stop further charges. Unused update time
          in a cycle does not roll over and is not refunded after the cycle starts.
        </p>
      </LegalBlock>

      <LegalBlock title="How to request">
        <p>
          Email{" "}
          <a className="link-draw text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          with your name, project, and reason. We respond with the next step and any refund timeline.
        </p>
      </LegalBlock>
    </LegalDoc>
  )
}

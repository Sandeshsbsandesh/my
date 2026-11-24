import { useRef, useState, type FormEvent, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Seo } from "../components/Seo"
import { sectors } from "../data/seo"
import { formatRupees, pricingGroups, works } from "../data/site"
import { cn } from "../lib/cn"

type FormState = {
  name: string
  business: string
  email: string
  overall: number
  days: string
  speed: number
  support: number
  customizations: string[]
  customizationOther: string
  customizationsRating: number
  behaviour: number
  workAgain: string
  refer: string
  note: string
  publishConsent: boolean
}

const empty: FormState = {
  name: "",
  business: "",
  email: "",
  overall: 0,
  days: "",
  speed: 0,
  support: 0,
  customizations: [],
  customizationOther: "",
  customizationsRating: 0,
  behaviour: 0,
  workAgain: "",
  refer: "",
  note: "",
  publishConsent: false,
}

const customizationOptions = [
  { id: "payments", label: "Payment integration" },
  { id: "booking", label: "Appointment booking" },
  { id: "whatsapp", label: "WhatsApp integration" },
  { id: "forms", label: "Contact / enquiry forms" },
  { id: "analytics", label: "Analytics (visits & behaviour)" },
  { id: "maps", label: "Maps / location" },
  { id: "social", label: "Social embeds (Instagram, YouTube, etc.)" },
  { id: "alerts", label: "Email or WhatsApp alerts on new leads" },
  { id: "cms", label: "CMS / blog / easy content updates" },
  { id: "none", label: "None of these" },
  { id: "other", label: "Other" },
]

const dayOptions = [
  { id: "1-day-preview", label: "Around 1 day (first preview / first look)" },
  { id: "2-7-days", label: "2–7 days" },
  { id: "1-2-weeks", label: "1–2 weeks" },
  { id: "over-2-weeks", label: "More than 2 weeks" },
  { id: "not-sure", label: "Not sure" },
]

const ynOptions = [
  { id: "yes", label: "Yes" },
  { id: "maybe", label: "Maybe" },
  { id: "no", label: "No" },
]

const fieldClass =
  "mt-1 w-full border-0 border-b border-line bg-transparent px-0 py-2 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent"

function feedbackApiUrl() {
  return new URL("api/feedback", `${window.location.origin}${import.meta.env.BASE_URL}`).toString()
}

function QuestionCard({
  n,
  title,
  required,
  hint,
  children,
}: {
  n: number
  title: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <section className="rounded-lg border border-line bg-white px-5 py-5 shadow-[0_1px_2px_rgba(20,22,28,0.04)] sm:px-6 sm:py-6">
      <h2 className="text-[1.05rem] font-normal leading-snug text-ink">
        <span className="mr-1.5 text-muted">{n}.</span>
        {title}
        {required ? <span className="ml-0.5 text-accent">*</span> : null}
      </h2>
      {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  )
}

function LinearScale({
  value,
  onChange,
  label,
  low = "Poor",
  high = "Excellent",
}: {
  value: number
  onChange: (n: number) => void
  label: string
  low?: string
  high?: string
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <div className="flex items-end gap-1 sm:gap-2">
        <span className="mb-2 hidden w-14 shrink-0 text-xs text-muted sm:block">{low}</span>
        <div className="flex flex-1 justify-between gap-1">
          {[1, 2, 3, 4, 5].map((n) => {
            const active = value === n
            return (
              <label key={n} className="flex flex-1 cursor-pointer flex-col items-center gap-2">
                <span className="text-xs text-muted">{n}</span>
                <input
                  type="radio"
                  className="peer sr-only"
                  name={label}
                  checked={active}
                  onChange={() => onChange(n)}
                />
                <span
                  className={cn(
                    "grid size-5 place-items-center rounded-full border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                    active ? "border-accent" : "border-[#5f6368]/55",
                  )}
                >
                  <span className={cn("size-2.5 rounded-full bg-accent transition-opacity", active ? "opacity-100" : "opacity-0")} />
                </span>
              </label>
            )
          })}
        </div>
        <span className="mb-2 hidden w-16 shrink-0 text-right text-xs text-muted sm:block">{high}</span>
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted sm:hidden">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  )
}

function ThankYouContinue() {
  return (
    <div className="mt-3 space-y-3">
      <section className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(20,22,28,0.04)]">
        <div className="border-b border-line px-5 py-5 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Work with us again</p>
          <h2 className="mt-2 font-serif text-xl leading-tight text-ink sm:text-2xl">Pricing plans</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Fixed scope. Fixed price. Starts from ₹1,999/month for care, or a one-time build from ₹9,999.
          </p>
        </div>
        <div className="divide-y divide-line">
          {pricingGroups.map((group) => (
            <div key={group.id} className="px-5 py-4 sm:px-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{group.label}</p>
              <ul className="mt-3 space-y-3">
                {group.plans.map((plan) => (
                  <li key={plan.id} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-ink">
                        {plan.name}
                        {plan.popular ? (
                          <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                            Popular
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-soft">{plan.includes[0]}</p>
                    </div>
                    <p className="shrink-0 font-serif text-lg leading-none text-ink">
                      {formatRupees(plan.amount)}
                      {group.id === "month" ? (
                        <span className="ml-0.5 text-xs font-sans text-muted">/mo</span>
                      ) : null}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-line px-5 py-4 sm:px-6">
          <Button href="/start" jelly className="w-full sm:w-auto">
            Get My Preview
          </Button>
          <Link to="/#pricing" className="ml-0 mt-3 inline-block text-sm text-ink-soft underline decoration-line underline-offset-4 sm:ml-4 sm:mt-0">
            Full pricing details
          </Link>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(20,22,28,0.04)]">
        <div className="border-b border-line px-5 py-5 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Sectors & work</p>
          <h2 className="mt-2 font-serif text-xl leading-tight text-ink sm:text-2xl">What we build next</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Same team, another project — for your next brand, branch, or referral.
          </p>
        </div>
        <div className="px-5 py-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Work types</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {works.map((work) => (
              <li key={work.id} className="rounded-md border border-line px-3 py-2.5">
                <p className="text-sm font-medium text-ink">{work.title}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{work.summary}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-muted">Sectors</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {sectors.map((sector) => {
              const href = "href" in sector ? sector.href : undefined
              return (
                <li key={sector.id}>
                  {href ? (
                    <Link
                      to={href}
                      className="inline-flex rounded-full border border-line bg-[#f8f6f1] px-3 py-1.5 text-sm text-ink hover:border-ink/30"
                    >
                      {sector.title}
                    </Link>
                  ) : (
                    <span className="inline-flex rounded-full border border-line bg-[#f8f6f1] px-3 py-1.5 text-sm text-ink">
                      {sector.title}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <Button href="/work" variant="secondary" className="w-full sm:w-auto">
            Explore Our Work
          </Button>
          <Button href="/start" className="w-full sm:w-auto">
            Start another project
          </Button>
        </div>
      </section>
    </div>
  )
}

function RadioList({
  name,
  value,
  options,
  onChange,
}: {
  name: string
  value: string
  options: { id: string; label: string }[]
  onChange: (id: string) => void
}) {
  return (
    <div className="space-y-1">
      {options.map((option) => {
        const active = value === option.id
        return (
          <label
            key={option.id}
            className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-2.5 hover:bg-[#f8f6f1]"
          >
            <input
              type="radio"
              name={name}
              className="peer sr-only"
              checked={active}
              onChange={() => onChange(option.id)}
            />
            <span
              className={cn(
                "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                active ? "border-accent" : "border-[#5f6368]/55",
              )}
            >
              <span className={cn("size-2.5 rounded-full bg-accent transition-opacity", active ? "opacity-100" : "opacity-0")} />
            </span>
            <span className="text-[0.95rem] text-ink">{option.label}</span>
          </label>
        )
      })}
    </div>
  )
}

export function FeedbackPage() {
  const [form, setForm] = useState<FormState>(empty)
  const [fax, setFax] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const sending = useRef(false)

  const showCustomizationRating = form.customizations.length > 0 && !form.customizations.includes("none")
  const afterCustom = showCustomizationRating ? 8 : 7

  function patch(partial: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...partial }))
  }

  function toggleCustomization(id: string) {
    setForm((prev) => {
      let next = prev.customizations.includes(id)
        ? prev.customizations.filter((item) => item !== id)
        : [...prev.customizations, id]

      if (id === "none" && !prev.customizations.includes("none")) {
        next = ["none"]
      } else if (id !== "none") {
        next = next.filter((item) => item !== "none")
      }

      return {
        ...prev,
        customizations: next,
        customizationOther: next.includes("other") ? prev.customizationOther : "",
        customizationsRating: next.length && !next.includes("none") ? prev.customizationsRating : 0,
      }
    })
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (sending.current) return
    sending.current = true
    setSubmitting(true)
    setError("")
    try {
      const response = await fetch(feedbackApiUrl(), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, fax }),
      })
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "Could not send feedback.")
      }
      setSent(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      sending.current = false
      setError(err instanceof Error && err.message ? err.message : "Could not send feedback. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[70vh] bg-[#f0eee8] pb-16 pt-8 sm:pt-10">
      <Seo
        title="Zebriyo | Client feedback"
        description="Share how Zebriyo did on speed, support, customizations, and team behaviour. Your feedback goes to our team by email."
        path="/feedback"
        index={false}
      />

      <div className="mx-auto w-full max-w-[640px] px-4 sm:px-5">
        {/* Title card — Google Forms style */}
        <header className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(20,22,28,0.04)]">
          <div className="h-2.5 bg-accent" />
          <div className="px-5 py-6 sm:px-7 sm:py-7">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Zebriyo · Client feedback</p>
            <h1 className="mt-3 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink sm:text-[2rem]">
              {sent ? "Thank you." : "How did we do? Give us 2 minutes to fill this in."}
            </h1>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              {sent
                ? "Your feedback is with the Zebriyo team. It helps us keep speed, support, and delivery honest."
                : "A quick fill on speed, support, customizations, and our team — and whether you’d work with us again or refer someone."}
            </p>
            {!sent ? (
              <p className="mt-4 text-sm text-accent">* Indicates required question</p>
            ) : (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/">Back home</Button>
                <p className="text-sm text-ink-soft">Or keep scrolling — plans and work types below.</p>
              </div>
            )}
          </div>
        </header>

        {sent ? <ThankYouContinue /> : null}

        {sent ? null : (
          <form className="mt-3 space-y-3" onSubmit={onSubmit} noValidate>
            <QuestionCard n={1} title="Your details" required>
              <div className="space-y-5">
                <label className="block">
                  <span className="text-sm text-ink-soft">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => patch({ name: e.target.value })}
                    className={fieldClass}
                    autoComplete="name"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-ink-soft">Business / project</span>
                  <input
                    value={form.business}
                    onChange={(e) => patch({ business: e.target.value })}
                    className={fieldClass}
                    autoComplete="organization"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-ink-soft">Email (optional)</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => patch({ email: e.target.value })}
                    className={fieldClass}
                    autoComplete="email"
                    placeholder="If we may follow up"
                  />
                </label>
              </div>
            </QuestionCard>

            <QuestionCard n={2} title="Overall rating" required>
              <LinearScale value={form.overall} onChange={(overall) => patch({ overall })} label="Overall rating" />
            </QuestionCard>

            <QuestionCard n={3} title="Was the process fast?" required>
              <LinearScale value={form.speed} onChange={(speed) => patch({ speed })} label="Was the process fast?" />
            </QuestionCard>

            <QuestionCard
              n={4}
              title="How long did delivery take (first useful look → live / handover)?"
              required
            >
              <RadioList name="days" value={form.days} options={dayOptions} onChange={(days) => patch({ days })} />
            </QuestionCard>

            <QuestionCard
              n={5}
              title="How clear and helpful was support — replies by email or WhatsApp, and how we handled your change requests?"
              required
            >
              <LinearScale value={form.support} onChange={(support) => patch({ support })} label="Support" />
            </QuestionCard>

            <QuestionCard
              n={6}
              title="Which customizations / integrations did your website include?"
              hint="Select all that apply"
            >
              <div className="space-y-1">
                {customizationOptions.map((option) => {
                  const active = form.customizations.includes(option.id)
                  return (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-2.5 hover:bg-[#f8f6f1]"
                    >
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={active}
                        onChange={() => toggleCustomization(option.id)}
                      />
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-[3px] border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                          active ? "border-accent bg-accent" : "border-[#5f6368]/55 bg-white",
                        )}
                      >
                        <svg
                          viewBox="0 0 12 12"
                          className={cn("size-3 text-white transition-opacity", active ? "opacity-100" : "opacity-0")}
                          aria-hidden="true"
                        >
                          <path
                            d="M2 6.2 4.6 9 10 3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-[0.95rem] text-ink">{option.label}</span>
                    </label>
                  )
                })}
              </div>
              {form.customizations.includes("other") ? (
                <label className="mt-4 block">
                  <span className="text-sm text-ink-soft">Other customization</span>
                  <input
                    value={form.customizationOther}
                    onChange={(e) => patch({ customizationOther: e.target.value })}
                    className={fieldClass}
                    placeholder="Tell us what else was integrated"
                    maxLength={200}
                  />
                </label>
              ) : null}
            </QuestionCard>

            {showCustomizationRating ? (
              <QuestionCard
                n={7}
                title="How well did these customizations work for you — setup, ease of use, and reliability?"
                required
              >
                <LinearScale
                  value={form.customizationsRating}
                  onChange={(customizationsRating) => patch({ customizationsRating })}
                  label="Customizations rating"
                />
              </QuestionCard>
            ) : null}

            <QuestionCard n={afterCustom} title="How was our team’s behaviour?" required>
              <LinearScale
                value={form.behaviour}
                onChange={(behaviour) => patch({ behaviour })}
                label="Team behaviour"
              />
            </QuestionCard>

            <QuestionCard n={afterCustom + 1} title="In future, would you like to work with us again?" required>
              <RadioList
                name="workAgain"
                value={form.workAgain}
                options={ynOptions}
                onChange={(workAgain) => patch({ workAgain })}
              />
            </QuestionCard>

            <QuestionCard n={afterCustom + 2} title="Would you refer Zebriyo to others?" required>
              <RadioList name="refer" value={form.refer} options={ynOptions} onChange={(refer) => patch({ refer })} />
            </QuestionCard>

            <QuestionCard n={afterCustom + 3} title="Small note">
              <textarea
                value={form.note}
                onChange={(e) => patch({ note: e.target.value })}
                rows={4}
                maxLength={1200}
                placeholder="Your answer"
                className="w-full resize-y rounded-md border border-line bg-white px-3 py-2.5 text-base text-ink outline-none placeholder:text-muted/70 focus:border-accent"
              />
            </QuestionCard>

            <QuestionCard
              n={afterCustom + 4}
              title="May we publish this feedback on zebriyo.com as a testimonial?"
              hint="Optional. Only if you tick yes — we may show your first name, business name, rating, and note on our website."
            >
              <label className="flex cursor-pointer items-start gap-3 rounded-md px-1 py-2 hover:bg-[#f8f6f1]">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={form.publishConsent}
                  onChange={(e) => patch({ publishConsent: e.target.checked })}
                />
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-[3px] border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                    form.publishConsent ? "border-accent bg-accent" : "border-[#5f6368]/55 bg-white",
                  )}
                >
                  <svg
                    viewBox="0 0 12 12"
                    className={cn(
                      "size-3 text-white transition-opacity",
                      form.publishConsent ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  >
                    <path
                      d="M2 6.2 4.6 9 10 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-[0.95rem] leading-snug text-ink">
                  Yes — Zebriyo (Infywe) may use my feedback as a public testimonial on the website and marketing
                  materials. I can email{" "}
                  <a className="underline decoration-line underline-offset-2" href="mailto:zebriyo.infywe@gmail.com">
                    zebriyo.infywe@gmail.com
                  </a>{" "}
                  anytime to ask for removal.
                </span>
              </label>
            </QuestionCard>

            <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              Fax
              <input tabIndex={-1} autoComplete="off" value={fax} onChange={(e) => setFax(e.target.value)} />
            </label>

            {error ? (
              <p className="rounded-lg border border-accent/30 bg-white px-4 py-3 text-sm text-accent">{error}</p>
            ) : null}

            <div className="flex items-center justify-between gap-4 pt-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit"}
              </Button>
              <p className="text-xs text-muted">Zebriyo · Infywe</p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

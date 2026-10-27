import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { useSearchParams } from "react-router-dom"
import { Check, Copy, Download } from "lucide-react"
import { Button } from "../components/Button"
import { StepFade } from "../components/motion"
import { SectionLabel } from "../components/SectionLabel"
import {
  integrationOptions,
  isProjectType,
  pageOptions,
  projectTypes,
  timingOptions,
} from "../data/site"
import { Seo } from "../components/Seo"
import { startJsonLd } from "../data/seo"
import {
  STORAGE_KEY,
  draftFromStorage,
  emptyDraft,
  formatBrief,
  validateAll,
  validateStep,
  type Draft,
} from "../lib/brief"
import { cn } from "../lib/cn"

const stepLabels = ["Project", "Requirements", "Contact", "Review"]
const DEADLINE_KEY = "zebriyo.preview.until"
const HOLD_MS = 24 * 60 * 60 * 1000

function readDeadline() {
  try {
    const until = Number(sessionStorage.getItem(DEADLINE_KEY) || 0)
    return until > Date.now() ? until : 0
  } catch {
    return 0
  }
}

function previewApiUrl() {
  return new URL("api/preview", `${window.location.origin}${import.meta.env.BASE_URL}`).toString()
}

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
}

export function StartPage() {
  const jsonLd = startJsonLd()
  const [params] = useSearchParams()
  const typeParam = params.get("type")
  const planParam = params.get("plan")
  const nameParam = params.get("name")
  const [draft, setDraft] = useState<Draft>(() => {
    try {
      return draftFromStorage(sessionStorage.getItem(STORAGE_KEY), typeParam, planParam, nameParam)
    } catch {
      return draftFromStorage(null, typeParam, planParam, nameParam)
    }
  })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [deadline, setDeadline] = useState(readDeadline)
  const [sent, setSent] = useState(() => readDeadline() > 0)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [briefText, setBriefText] = useState("")
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const firstParam = useRef(true)
  const sending = useRef(false)

  useEffect(() => {
    if (sent) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
      // Ignore private-mode storage failures. The brief still lives in the form.
    }
  }, [draft, sent])

  useEffect(() => {
    if (firstParam.current) {
      firstParam.current = false
      return
    }
    if (!isProjectType(typeParam) && !planParam) return
    setDraft((current) => {
      const next = draftFromStorage(JSON.stringify(current), typeParam, planParam)
      return { ...current, type: next.type || current.type, notes: current.notes || next.notes }
    })
    setStep(0)
    setSent(false)
    sending.current = false
  }, [typeParam, planParam])

  useEffect(() => {
    if (step === 0 && !sent) return
    if (window.innerWidth < 1024) {
      document.getElementById("brief-form")?.scrollIntoView({ block: "start" })
    }
  }, [step, sent])

  function update(patch: Partial<Draft>) {
    setDraft((current) => ({ ...current, ...patch }))
    setErrors((current) => {
      const next = { ...current }
      for (const key of Object.keys(patch)) delete next[key]
      return next
    })
  }

  function download() {
    const blob = new Blob([briefText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "website-brief.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(briefText)
      setCopied(true)
      setCopyFailed(false)
    } catch {
      setCopyFailed(true)
    }
  }

  async function send() {
    if (sending.current) return
    sending.current = true
    setSubmitting(true)
    setSubmitError("")
    try {
      const response = await fetch(previewApiUrl(), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...draft, website: honeypot }),
      })
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "Could not send")
      }
      const until = Date.now() + HOLD_MS
      try {
        sessionStorage.setItem(DEADLINE_KEY, String(until))
        sessionStorage.removeItem(STORAGE_KEY)
      } catch {
        // Private mode still shows the thank-you state for this visit.
      }
      setBriefText(formatBrief(draft))
      setDeadline(until)
      setSent(true)
      setCopied(false)
      setCopyFailed(false)
    } catch {
      sending.current = false
      setSubmitError("We could not send your details. Check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (step < 3) {
      const nextErrors = validateStep(step, draft)
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length === 0) setStep(step + 1)
      return
    }
    const all = validateAll(draft)
    if (Object.keys(all).length > 0) {
      setErrors(all)
      setStep(all.type || all.projectName ? 0 : all.goal ? 1 : 2)
      return
    }
    void send()
  }

  const forwardLabel = ["Continue", "Continue", "Review details", "Send my details"][step]

  return (
    <div className="wrap grid gap-8 py-8 sm:py-10 lg:grid-cols-12 lg:gap-10">
      <Seo
        title="Get a Website Preview in 24 Hours | Zebriyo"
        description="Send your details to Zebriyo, an affordable website maker for business, Instagram, influencer, and portfolio websites. Preview of the main page in 24 hours. Care from ₹1,999/month."
        path="/start"
        jsonLd={jsonLd}
      />
      <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
        <SectionLabel>Get my preview</SectionLabel>
        <h1 className="mt-4 font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[0.96] tracking-[-0.03em]">
          {sent ? "Thank you." : "Send your details."}
        </h1>
        <p className="mt-4 max-w-md text-ink-soft">
          {sent
            ? "We have your details. Your first step towards scaling up starts within the next 24 hours."
            : "Tell us if you need a business website, Instagram website, influencer website, or portfolio. The price is fixed before you pay."}
        </p>
      </div>

      <div id="brief-form" className="scroll-mt-24 lg:col-span-7">
        <StepFade id={sent ? "sent" : step}>
        {sent ? (
          <Success
            deadline={deadline}
            text={briefText}
            copied={copied}
            copyFailed={copyFailed}
            onCopy={() => void copy()}
            onDownload={download}
            onReset={() => {
              try {
                sessionStorage.removeItem(DEADLINE_KEY)
              } catch {
                // Ignore storage failures.
              }
              setDraft(emptyDraft())
              setStep(0)
              setSent(false)
              setDeadline(0)
              setBriefText("")
              setCopied(false)
              setCopyFailed(false)
              sending.current = false
            }}
          />
        ) : (
          <form noValidate autoComplete="on" onSubmit={onSubmit}>
            <p className="sr-only" aria-hidden="true">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
              </label>
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              0{step + 1} / 04 <span className="ml-3 text-ink">{stepLabels[step]}</span>
            </p>

            {step === 0 ? (
              <ProjectStep draft={draft} errors={errors} update={update} />
            ) : null}
            {step === 1 ? <RequirementsStep draft={draft} errors={errors} update={update} /> : null}
            {step === 2 ? <ContactStep draft={draft} errors={errors} update={update} /> : null}
            {step === 3 ? <ReviewStep draft={draft} onEdit={setStep} /> : null}

            <p className="mt-8 text-sm text-muted">
              Sending delivers your details to Zebriyo. You get a working preview of the main page within 24 hours.
            </p>
            {submitError ? <p className="mt-3 text-sm text-accent">{submitError}</p> : null}
            <div className="mt-6 flex flex-wrap gap-3">
              {step > 0 ? (
                <Button type="button" variant="secondary" onClick={() => setStep((value) => Math.max(0, value - 1))}>
                  Back
                </Button>
              ) : null}
              <Button type="submit" disabled={submitting}>
                {submitting ? "Sending…" : forwardLabel}
              </Button>
            </div>
          </form>
        )}
        </StepFade>
      </div>
    </div>
  )
}

function ProjectStep({
  draft,
  errors,
  update,
}: {
  draft: Draft
  errors: Record<string, string>
  update: (patch: Partial<Draft>) => void
}) {
  return (
    <div>
      <fieldset className="mt-8">
        <legend className="text-sm font-medium">What are we building?</legend>
        <div className="mt-3 grid gap-2">
          {projectTypes.map((item) => {
            const selected = draft.type === item.id
            return (
              <label key={item.id} className="cursor-pointer">
                <input
                  className="peer sr-only"
                  type="radio"
                  name="project-type"
                  checked={selected}
                  onChange={() => update({ type: item.id })}
                />
                <span
                  className={cn(
                    "block border px-4 py-3 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                    selected ? "border-ink bg-white" : "border-line",
                  )}
                >
                  <span className="block font-medium">{item.label}</span>
                  <span className="block text-sm text-ink-soft">{item.detail}</span>
                </span>
              </label>
            )
          })}
        </div>
        {errors.type ? <p className="mt-2 text-sm text-accent">{errors.type}</p> : null}
      </fieldset>
      <Field label="Name of the business, channel, or product" required error={errors.projectName}>
        <input
          className={fieldClass(errors.projectName)}
          value={draft.projectName}
          maxLength={120}
          autoComplete="organization"
          onChange={(event) => update({ projectName: event.target.value })}
        />
      </Field>
    </div>
  )
}

function RequirementsStep({
  draft,
  errors,
  update,
}: {
  draft: Draft
  errors: Record<string, string>
  update: (patch: Partial<Draft>) => void
}) {
  return (
    <div>
      <Field label="What should the website do?" required error={errors.goal}>
        <textarea
          className={cn(fieldClass(errors.goal), "min-h-32 resize-y")}
          value={draft.goal}
          maxLength={1200}
          placeholder="Example: A portfolio for a food channel. Visitors should find the latest videos, brand partners, and a way to email me."
          onChange={(event) => update({ goal: event.target.value })}
        />
      </Field>
      <ChipGroup
        legend="Pages you have in mind"
        options={pageOptions}
        selected={draft.pages}
        onToggle={(id) => update({ pages: toggle(draft.pages, id) })}
      />
      <ChipGroup
        legend="Connections"
        options={integrationOptions}
        selected={draft.integrations}
        onToggle={(id) => update({ integrations: toggle(draft.integrations, id) })}
      />
      <Field label="Links we should see">
        <textarea
          className={cn(fieldClass(), "min-h-24 resize-y")}
          value={draft.links}
          maxLength={500}
          placeholder="Instagram, YouTube, current site, or a site you like."
          onChange={(event) => update({ links: event.target.value })}
        />
      </Field>
      <Field label="Timing">
        <select className={fieldClass()} value={draft.timing} onChange={(event) => update({ timing: event.target.value })}>
          <option value="">Choose a timing</option>
          {timingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Anything else">
        <textarea
          className={cn(fieldClass(), "min-h-24 resize-y")}
          value={draft.notes}
          maxLength={800}
          onChange={(event) => update({ notes: event.target.value })}
        />
      </Field>
    </div>
  )
}

function ContactStep({
  draft,
  errors,
  update,
}: {
  draft: Draft
  errors: Record<string, string>
  update: (patch: Partial<Draft>) => void
}) {
  return (
    <div>
      <Field label="Your name" required error={errors.name}>
        <input
          className={fieldClass(errors.name)}
          value={draft.name}
          maxLength={120}
          autoComplete="name"
          onChange={(event) => update({ name: event.target.value })}
        />
      </Field>
      <Field label="Email" required error={errors.email}>
        <input
          className={fieldClass(errors.email)}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={draft.email}
          maxLength={200}
          onChange={(event) => update({ email: event.target.value })}
        />
      </Field>
      <Field
        label="WhatsApp"
        required={draft.replyVia === "whatsapp"}
        error={errors.whatsapp}
      >
        <input
          className={fieldClass(errors.whatsapp)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={draft.whatsapp}
          maxLength={30}
          placeholder="+91 ..."
          onChange={(event) => update({ whatsapp: event.target.value })}
        />
      </Field>
      <fieldset className="mt-6">
        <legend className="text-sm font-medium">How should we reply?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["email", "Email"],
              ["whatsapp", "WhatsApp"],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                name="reply-via"
                checked={draft.replyVia === value}
                onChange={() => update({ replyVia: value })}
              />
              <span
                className={cn(
                  "block border px-3 py-2 text-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                  draft.replyVia === value ? "border-ink bg-ink text-paper" : "border-line",
                )}
              >
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

function ReviewStep({ draft, onEdit }: { draft: Draft; onEdit: (step: number) => void }) {
  const type = projectTypes.find((item) => item.id === draft.type)?.label ?? "—"
  const pages = pageOptions.filter((item) => draft.pages.includes(item.id)).map((item) => item.label)
  const tools = integrationOptions.filter((item) => draft.integrations.includes(item.id)).map((item) => item.label)
  return (
    <div className="mt-8">
      <ReviewBlock title="Project" onEdit={() => onEdit(0)}>
        <Row label="Type" value={type} />
        <Row label="Name" value={draft.projectName} />
      </ReviewBlock>
      <ReviewBlock title="Requirements" onEdit={() => onEdit(1)}>
        <Row label="Goal" value={draft.goal} />
        <Row label="Pages" value={pages.join(", ") || "Not specified"} />
        <Row label="Connections" value={tools.join(", ") || "Not specified"} />
        <Row label="Links" value={draft.links || "—"} />
        <Row label="Timing" value={draft.timing || "—"} />
        <Row label="Notes" value={draft.notes || "—"} />
      </ReviewBlock>
      <ReviewBlock title="Contact" onEdit={() => onEdit(2)}>
        <Row label="Name" value={draft.name} />
        <Row label="Email" value={draft.email} />
        <Row label="WhatsApp" value={draft.whatsapp || "—"} />
        <Row label="Reply via" value={draft.replyVia === "whatsapp" ? "WhatsApp" : "Email"} />
      </ReviewBlock>
    </div>
  )
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

function PreviewCountdown({ deadline }: { deadline: number }) {
  const [left, setLeft] = useState(() => Math.max(0, deadline - Date.now()))

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, deadline - Date.now()))
    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [deadline])

  const total = Math.floor(left / 1000)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60

  if (left <= 0) {
    return (
      <p className="mt-6 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-tight tracking-[-0.03em]">
        Your first step towards scaling up has started.
      </p>
    )
  }

  return (
    <div className="mt-6">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">Your first step towards scaling up starts within</p>
      <p className="mt-3 font-serif text-[clamp(2.8rem,8vw,4.6rem)] leading-none tracking-[-0.04em] tabular-nums">
        <span>{pad(hours)}</span>
        <span className="mx-1 text-accent">:</span>
        <span>{pad(minutes)}</span>
        <span className="mx-1 text-accent">:</span>
        <span>{pad(seconds)}</span>
      </p>
      <p className="mt-3 text-sm text-muted">Hours : minutes : seconds</p>
    </div>
  )
}

function Success({
  deadline,
  text,
  copied,
  copyFailed,
  onCopy,
  onDownload,
  onReset,
}: {
  deadline: number
  text: string
  copied: boolean
  copyFailed: boolean
  onCopy: () => void
  onDownload: () => void
  onReset: () => void
}) {
  return (
    <div>
      <p className="text-ink-soft">
        Thank you. We received your details. Sit tight — your first preview is on the way.
      </p>
      <PreviewCountdown deadline={deadline} />
      {text ? (
        <>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={onCopy}>
              {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              {copied ? "Copied" : "Copy your details"}
            </Button>
            <Button type="button" variant="secondary" onClick={onDownload}>
              <Download className="size-4" aria-hidden="true" />
              Download .txt
            </Button>
          </div>
          {copyFailed ? <p className="mt-3 text-sm text-accent">Select the brief below and copy it manually.</p> : null}
          <pre className="mt-6 max-h-64 overflow-auto whitespace-pre-wrap break-words border border-line bg-foam p-4 font-mono text-sm">
            {text}
          </pre>
        </>
      ) : null}
      <button type="button" className="mt-6 cursor-pointer text-sm underline underline-offset-4" onClick={onReset}>
        Start another brief
      </button>
    </div>
  )
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <label className="mt-7 block">
      <span className="text-sm font-medium">
        {label}
        {required ? <span className="font-normal text-muted"> · Required</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-sm text-accent">{error}</span> : null}
    </label>
  )
}

function fieldClass(error?: string) {
  return cn("mt-2 w-full border-b bg-transparent py-3", error ? "border-accent" : "border-line")
}

function ChipGroup({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string
  options: Array<{ id: string; label: string }>
  selected: string[]
  onToggle: (id: string) => void
}) {
  return (
    <fieldset className="mt-7">
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = selected.includes(option.id)
          return (
            <label key={option.id} className="cursor-pointer">
              <input className="peer sr-only" type="checkbox" checked={checked} onChange={() => onToggle(option.id)} />
              <span
                className={cn(
                  "block border px-3 py-2 text-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                  checked ? "border-ink bg-ink text-paper" : "border-line",
                )}
              >
                {option.label}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function ReviewBlock({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl">{title}</h2>
        <button type="button" className="cursor-pointer text-sm underline underline-offset-4" onClick={onEdit}>
          Edit
        </button>
      </div>
      <div className="mt-3 border-t border-line">{children}</div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-line py-3 sm:grid-cols-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="whitespace-pre-wrap sm:col-span-2">{value}</dd>
    </div>
  )
}

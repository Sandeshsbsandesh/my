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
  site,
  timingOptions,
  whatsappHref,
} from "../data/site"
import { usePageTitle } from "../hooks/usePageTitle"
import {
  STORAGE_KEY,
  draftFromStorage,
  emptyDraft,
  formatBrief,
  mailtoHref,
  validateAll,
  validateStep,
  type Draft,
} from "../lib/brief"
import { cn } from "../lib/cn"

const stepLabels = ["Project", "Requirements", "Contact", "Review"]

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
}

export function StartPage() {
  usePageTitle("Get my preview — Briefly")
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
  const [sent, setSent] = useState(false)
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

  function send() {
    if (sending.current) return
    sending.current = true
    const text = formatBrief(draft)
    sessionStorage.removeItem(STORAGE_KEY)
    setBriefText(text)
    setSent(true)
    setCopied(false)
    void navigator.clipboard.writeText(text).then(
      () => setCopied(true),
      () => setCopyFailed(true),
    )
    const href = mailtoHref(draft, text)
    if (href) {
      const link = document.createElement("a")
      link.href = href
      link.click()
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
    send()
  }

  const forwardLabel = ["Continue", "Continue", "Review details", "Send my details"][step]

  return (
    <div className="wrap grid gap-8 py-8 sm:py-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
        <SectionLabel>Get my preview</SectionLabel>
        <h1 className="mt-4 font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[0.96] tracking-[-0.03em]">
          {sent ? "Your details are ready." : "Send your details."}
        </h1>
        <p className="mt-4 max-w-md text-ink-soft">
          {sent
            ? "Nothing on this page was stored on a server. Copy it, download it, or send it from your email app."
            : "Tell us what the site is for. The price is fixed before you pay."}
        </p>
      </div>

      <div id="brief-form" className="scroll-mt-24 lg:col-span-7">
        <StepFade id={sent ? "sent" : step}>
        {sent ? (
          <Success
            text={briefText}
            copied={copied}
            copyFailed={copyFailed}
            onCopy={() => void copy()}
            onDownload={download}
            email={site.email}
            whatsapp={whatsappHref(briefText)}
            onReset={() => {
              setDraft(emptyDraft())
              setStep(0)
              setSent(false)
              setBriefText("")
              setCopied(false)
              setCopyFailed(false)
              sending.current = false
            }}
          />
        ) : (
          <form noValidate autoComplete="on" onSubmit={onSubmit}>
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
              Kept in this tab until you send it or close the tab. Not stored on a server.
              {site.email ? ` Sending opens your email app, addressed to ${site.email}.` : ""}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {step > 0 ? (
                <Button type="button" variant="secondary" onClick={() => setStep((value) => Math.max(0, value - 1))}>
                  Back
                </Button>
              ) : null}
              <Button type="submit">{forwardLabel}</Button>
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

function Success({
  text,
  copied,
  copyFailed,
  onCopy,
  onDownload,
  email,
  whatsapp,
  onReset,
}: {
  text: string
  copied: boolean
  copyFailed: boolean
  onCopy: () => void
  onDownload: () => void
  email: string
  whatsapp: string
  onReset: () => void
}) {
  return (
    <div>
      <p className="text-sm text-ink-soft">
        {email
          ? "Your email app should open with this brief. If it doesn’t, copy the text below."
          : "Copy or download this brief and send it to us."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="button" onClick={onCopy}>
          {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy brief"}
        </Button>
        <Button type="button" variant="secondary" onClick={onDownload}>
          <Download className="size-4" aria-hidden="true" />
          Download .txt
        </Button>
        {whatsapp ? (
          <Button href={whatsapp} variant="secondary">
            Send on WhatsApp
          </Button>
        ) : null}
      </div>
      {copyFailed ? <p className="mt-3 text-sm text-accent">Select the brief below and copy it manually.</p> : null}
      <pre className="mt-6 max-h-96 overflow-auto whitespace-pre-wrap break-words border border-line bg-foam p-4 font-mono text-sm">
        {text}
      </pre>
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

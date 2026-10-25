import {
  findPricingPlan,
  formatRupees,
  integrationOptions,
  isProjectType,
  pageOptions,
  projectTypes,
  site,
  type ProjectType,
} from "../data/site"

export const STORAGE_KEY = "briefly.draft"

export type Draft = {
  type: ProjectType | ""
  projectName: string
  goal: string
  pages: string[]
  integrations: string[]
  links: string
  timing: string
  notes: string
  name: string
  email: string
  whatsapp: string
  replyVia: "email" | "whatsapp"
}

export function emptyDraft(): Draft {
  return {
    type: "",
    projectName: "",
    goal: "",
    pages: [],
    integrations: [],
    links: "",
    timing: "",
    notes: "",
    name: "",
    email: "",
    whatsapp: "",
    replyVia: "email",
  }
}

function asString(value: unknown) {
  return typeof value === "string" ? value : ""
}

function asStringList(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []
}

function planNote(planId: string | null) {
  const match = findPricingPlan(planId)
  if (!match) return ""
  const price = formatRupees(match.plan.amount)
  const billed = match.group.id === "month" ? `${price}/month` : price
  return `Interested in ${match.plan.name} (${billed}).`
}

export function draftFromStorage(
  raw: string | null,
  typeParam: string | null,
  planParam: string | null = null,
  nameParam: string | null = null,
): Draft {
  const empty = emptyDraft()
  const noted = planNote(planParam)
  const fromHero = nameParam?.trim() ?? ""
  try {
    const saved = raw ? (JSON.parse(raw) as Partial<Draft>) : null
    const type = isProjectType(typeParam) ? typeParam : isProjectType(saved?.type) ? saved.type : ""
    const replyVia = saved?.replyVia === "whatsapp" ? "whatsapp" : "email"
    const savedNotes = asString(saved?.notes)
    return {
      ...empty,
      type,
      projectName: fromHero || asString(saved?.projectName),
      goal: asString(saved?.goal),
      pages: asStringList(saved?.pages),
      integrations: asStringList(saved?.integrations),
      links: asString(saved?.links),
      timing: asString(saved?.timing),
      notes: savedNotes || noted,
      name: asString(saved?.name),
      email: asString(saved?.email),
      whatsapp: asString(saved?.whatsapp),
      replyVia,
    }
  } catch {
    return { ...empty, type: isProjectType(typeParam) ? typeParam : "", projectName: fromHero, notes: noted }
  }
}

function labelsFor(options: Array<{ id: string; label: string }>, selected: string[]) {
  const labels = options.filter((option) => selected.includes(option.id)).map((option) => option.label)
  return labels.length > 0 ? labels.join(", ") : "Not specified"
}

export function formatBrief(draft: Draft) {
  const type = projectTypes.find((item) => item.id === draft.type)?.label ?? "Not specified"
  const sent = new Date().toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
  return [
    `Website brief — ${site.name}`,
    `Prepared: ${sent}`,
    "",
    `Name: ${draft.name.trim()}`,
    `Email: ${draft.email.trim()}`,
    `WhatsApp: ${draft.whatsapp.trim() || "—"}`,
    `Reply via: ${draft.replyVia === "whatsapp" ? "WhatsApp" : "Email"}`,
    "",
    `Project type: ${type}`,
    `Project name: ${draft.projectName.trim()}`,
    "",
    "What the site should do:",
    draft.goal.trim(),
    "",
    `Pages: ${labelsFor(pageOptions, draft.pages)}`,
    `Integrations: ${labelsFor(integrationOptions, draft.integrations)}`,
    `Timing: ${draft.timing || "—"}`,
    "",
    "Links:",
    draft.links.trim() || "—",
    "",
    "Notes:",
    draft.notes.trim() || "—",
  ].join("\n")
}

export function mailtoHref(draft: Draft, body: string) {
  if (!site.email) return ""
  const subject = `Website brief — ${draft.projectName.trim() || "New project"}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function validateStep(step: number, draft: Draft) {
  const errors: Record<string, string> = {}
  if (step === 0) {
    if (!draft.type) errors.type = "Choose the kind of project."
    if (draft.projectName.trim().length < 2) {
      errors.projectName = "Add the name of the business, channel, or product."
    }
  }
  if (step === 1 && draft.goal.trim().length < 10) {
    errors.goal = "Add a sentence or two about what the site should do."
  }
  if (step === 2) {
    if (draft.name.trim().length < 2) errors.name = "Add your name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) errors.email = "Add a valid email."
    if (draft.replyVia === "whatsapp" && draft.whatsapp.replace(/\D/g, "").length < 8) {
      errors.whatsapp = "Add a WhatsApp number so we can reply there."
    }
  }
  return errors
}

export function validateAll(draft: Draft) {
  return { ...validateStep(0, draft), ...validateStep(1, draft), ...validateStep(2, draft) }
}

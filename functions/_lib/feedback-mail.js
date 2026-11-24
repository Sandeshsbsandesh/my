import { MAIL, mailError } from "./mail-config.js"

export { MAIL, mailError }

const MAX = {
  name: 120,
  business: 160,
  email: 200,
  days: 40,
  note: 1200,
  choice: 20,
  other: 200,
}

function clip(value, max) {
  return String(value ?? "")
    .trim()
    .slice(0, max)
}

function rating(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 1 || n > 5) return 0
  return Math.round(n)
}

function yesMaybeNo(value) {
  const v = clip(value, MAX.choice).toLowerCase()
  if (v === "yes" || v === "maybe" || v === "no") return v
  return ""
}

const DAY_OPTIONS = new Set(["1-day-preview", "2-7-days", "1-2-weeks", "over-2-weeks", "not-sure"])

const CUSTOMIZATION_IDS = new Set([
  "payments",
  "booking",
  "whatsapp",
  "forms",
  "analytics",
  "maps",
  "social",
  "alerts",
  "cms",
  "none",
  "other",
])

const CUSTOMIZATION_LABELS = {
  payments: "Payment integration",
  booking: "Appointment booking",
  whatsapp: "WhatsApp integration",
  forms: "Contact / enquiry forms",
  analytics: "Analytics",
  maps: "Maps / location",
  social: "Social embeds",
  alerts: "Email or WhatsApp alerts",
  cms: "CMS / blog",
  none: "None of these",
  other: "Other",
}

export function parseFeedback(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null
  if (clip(body.fax, 200)) return { honeypot: true }

  const name = clip(body.name, MAX.name)
  const business = clip(body.business, MAX.business)
  const email = clip(body.email, MAX.email).toLowerCase()
  if (name.length < 2) return null
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null

  const overall = rating(body.overall)
  const speed = rating(body.speed)
  const support = rating(body.support)
  const behaviour = rating(body.behaviour)
  if (!overall || !speed || !support || !behaviour) return null

  const days = clip(body.days, MAX.days)
  if (!DAY_OPTIONS.has(days)) return null

  const workAgain = yesMaybeNo(body.workAgain)
  const refer = yesMaybeNo(body.refer)
  if (!workAgain || !refer) return null

  let customizations = Array.isArray(body.customizations)
    ? body.customizations.map((item) => clip(item, 40)).filter((id) => CUSTOMIZATION_IDS.has(id))
    : []
  customizations = [...new Set(customizations)].slice(0, 12)
  if (customizations.includes("none")) customizations = ["none"]

  const customizationOther = customizations.includes("other") ? clip(body.customizationOther, MAX.other) : ""
  if (customizations.includes("other") && customizationOther.length < 2) return null

  const hasRealCustomizations = customizations.length > 0 && !customizations.includes("none")
  const customizationsRating = rating(body.customizationsRating)
  if (hasRealCustomizations && !customizationsRating) return null

  return {
    honeypot: false,
    name,
    business,
    email,
    overall,
    days,
    speed,
    support,
    customizations,
    customizationOther,
    customizationsRating: hasRealCustomizations ? customizationsRating : 0,
    behaviour,
    workAgain,
    refer,
    note: clip(body.note, MAX.note),
    publishConsent: Boolean(body.publishConsent),
  }
}

const DAY_LABELS = {
  "1-day-preview": "Around 1 day (preview / first look)",
  "2-7-days": "2–7 days",
  "1-2-weeks": "1–2 weeks",
  "over-2-weeks": "More than 2 weeks",
  "not-sure": "Not sure",
}

function stars(n) {
  if (!n) return "N/A"
  return `${"★".repeat(n)}${"☆".repeat(5 - n)} (${n}/5)`
}

function yn(v) {
  if (v === "yes") return "Yes"
  if (v === "maybe") return "Maybe"
  if (v === "no") return "No"
  return "—"
}

function customizationLine(feedback) {
  if (!feedback.customizations.length) return "—"
  const labels = feedback.customizations.map((id) => {
    if (id === "other") return `Other (${feedback.customizationOther || "—"})`
    return CUSTOMIZATION_LABELS[id] || id
  })
  return labels.join(", ")
}

export function formatFeedbackMail(feedback) {
  const sent = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })
  const hasCustom = feedback.customizations.length > 0 && !feedback.customizations.includes("none")
  return [
    "Client feedback — Zebriyo",
    `Received: ${sent} IST`,
    "",
    `Name: ${feedback.name}`,
    `Business / project: ${feedback.business || "—"}`,
    `Email: ${feedback.email || "—"}`,
    "",
    `Overall rating: ${stars(feedback.overall)}`,
    `How long did it take: ${DAY_LABELS[feedback.days] || feedback.days}`,
    `Was it fast: ${stars(feedback.speed)}`,
    `Support (email / WhatsApp / change requests): ${stars(feedback.support)}`,
    `Customizations / integrations: ${customizationLine(feedback)}`,
    `Customizations rating: ${hasCustom ? stars(feedback.customizationsRating) : "N/A"}`,
    `Team behaviour: ${stars(feedback.behaviour)}`,
    "",
    `Work with us again: ${yn(feedback.workAgain)}`,
    `Refer others: ${yn(feedback.refer)}`,
    `OK to publish as testimonial: ${feedback.publishConsent ? "YES — may use on zebriyo.com" : "No"}`,
    "",
    "Note:",
    feedback.note || "—",
  ].join("\n")
}

export function feedbackSubject(feedback) {
  const flag = feedback.publishConsent ? " · testimonial OK" : ""
  return `Client feedback ${feedback.overall}/5 — ${feedback.name}${flag}`
}

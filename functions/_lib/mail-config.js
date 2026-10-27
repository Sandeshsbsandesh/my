// FROM and TO must be verified in Amazon SES, region ap-south-1 (sandbox requires both).
export const MAIL = {
  host: "email-smtp.ap-south-1.amazonaws.com",
  port: 587,
  user: "AKIATAGTNP7AMUSEWUH4",
  pass: "BAuIBOIOGbAfh5ejqKg9ch8xp8tI9mzYFG+X76bKC8bN",
  to: "sandeshsb0219@gmail.com",
  fromName: "Zebriyo",
  fromEmail: "sandeshsb0219@gmail.com",
}

const MAX = {
  name: 120,
  email: 200,
  whatsapp: 30,
  projectName: 120,
  goal: 1200,
  links: 500,
  notes: 800,
  timing: 80,
  type: 40,
  replyVia: 20,
}

function clip(value, max) {
  return String(value ?? "")
    .trim()
    .slice(0, max)
}

export function parseDraft(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null
  if (clip(body.website, 200)) return { honeypot: true }
  const email = clip(body.email, MAX.email).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  const name = clip(body.name, MAX.name)
  const projectName = clip(body.projectName, MAX.projectName)
  const goal = clip(body.goal, MAX.goal)
  if (name.length < 2 || projectName.length < 2 || goal.length < 10) return null
  return {
    honeypot: false,
    type: clip(body.type, MAX.type),
    projectName,
    goal,
    pages: Array.isArray(body.pages) ? body.pages.map((item) => clip(item, 40)).filter(Boolean).slice(0, 12) : [],
    integrations: Array.isArray(body.integrations)
      ? body.integrations.map((item) => clip(item, 40)).filter(Boolean).slice(0, 12)
      : [],
    links: clip(body.links, MAX.links),
    timing: clip(body.timing, MAX.timing),
    notes: clip(body.notes, MAX.notes),
    name,
    email,
    whatsapp: clip(body.whatsapp, MAX.whatsapp),
    replyVia: clip(body.replyVia, MAX.replyVia) === "whatsapp" ? "whatsapp" : "email",
  }
}

export function formatMail(draft) {
  const sent = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })
  return [
    "New website preview request — Zebriyo",
    `Received: ${sent} IST`,
    "",
    `Name: ${draft.name}`,
    `Email: ${draft.email}`,
    `WhatsApp: ${draft.whatsapp || "—"}`,
    `Reply via: ${draft.replyVia === "whatsapp" ? "WhatsApp" : "Email"}`,
    "",
    `Project type: ${draft.type || "—"}`,
    `Project name: ${draft.projectName}`,
    "",
    "What the site should do:",
    draft.goal,
    "",
    `Pages: ${draft.pages.join(", ") || "—"}`,
    `Integrations: ${draft.integrations.join(", ") || "—"}`,
    `Timing: ${draft.timing || "—"}`,
    "",
    "Links:",
    draft.links || "—",
    "",
    "Notes:",
    draft.notes || "—",
  ].join("\n")
}

export function mailSubject(draft) {
  return `Website preview — ${draft.projectName}`
}

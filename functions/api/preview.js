import { formatMail, mailSubject, parseDraft } from "../_lib/mail-config.js"
import { sendSmtp } from "../_lib/smtp-cloudflare.js"

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  })
}

export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return json(405, { ok: false, error: "Use POST" })
  }

  const length = Number(context.request.headers.get("content-length") || 0)
  if (length > 20_000) return json(413, { ok: false, error: "Too large" })

  let payload
  try {
    payload = await context.request.json()
  } catch {
    return json(400, { ok: false, error: "Invalid request" })
  }

  const draft = parseDraft(payload)
  if (!draft) return json(400, { ok: false, error: "Check your details and try again." })
  if (draft.honeypot) return json(200, { ok: true })

  try {
    await sendSmtp({
      subject: mailSubject(draft),
      text: formatMail(draft),
      replyTo: draft.email,
    })
    return json(200, { ok: true })
  } catch (error) {
    console.error("preview mail failed", error)
    return json(502, { ok: false, error: "Could not send right now. Try again." })
  }
}

import { feedbackSubject, formatFeedbackMail, mailError, parseFeedback } from "../_lib/feedback-mail.js"
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

  const feedback = parseFeedback(payload)
  if (!feedback) return json(400, { ok: false, error: "Please complete the required ratings and try again." })
  if (feedback.honeypot) return json(200, { ok: true })

  try {
    await sendSmtp({
      subject: feedbackSubject(feedback),
      text: formatFeedbackMail(feedback),
      replyTo: feedback.email || undefined,
    })
    return json(200, { ok: true })
  } catch (error) {
    console.error("feedback mail failed", error)
    return json(502, { ok: false, error: mailError(error) })
  }
}

import nodemailer from "nodemailer"
import { formatMail, MAIL, mailError, mailSubject, parseDraft } from "../functions/_lib/mail-config.js"
import {
  feedbackSubject,
  formatFeedbackMail,
  parseFeedback,
} from "../functions/_lib/feedback-mail.js"

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on("data", (chunk) => {
      size += chunk.length
      if (size > 20_000) {
        reject(new Error("too large"))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    req.on("error", reject)
  })
}

function send(res, status, body) {
  res.statusCode = status
  res.setHeader("content-type", "application/json; charset=utf-8")
  res.end(JSON.stringify(body))
}

async function sendMail({ subject, text, replyTo }) {
  const transporter = nodemailer.createTransport({
    host: MAIL.host,
    port: MAIL.port,
    secure: false,
    requireTLS: true,
    auth: { user: MAIL.user, pass: MAIL.pass },
  })
  await transporter.sendMail({
    from: `${MAIL.fromName} <${MAIL.fromEmail}>`,
    to: MAIL.to,
    replyTo: replyTo || undefined,
    subject,
    text,
  })
}

export function previewMailPlugin() {
  return {
    name: "preview-mail",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] || ""
        const isPreview = url === "/api/preview" || url === "/api/preview/"
        const isFeedback = url === "/api/feedback" || url === "/api/feedback/"
        if (!isPreview && !isFeedback) return next()
        if (req.method !== "POST") {
          send(res, 405, { ok: false, error: "Use POST" })
          return
        }
        try {
          const payload = JSON.parse(await readBody(req))
          if (isFeedback) {
            const feedback = parseFeedback(payload)
            if (!feedback) {
              send(res, 400, { ok: false, error: "Please complete the required ratings and try again." })
              return
            }
            if (feedback.honeypot) {
              send(res, 200, { ok: true })
              return
            }
            await sendMail({
              subject: feedbackSubject(feedback),
              text: formatFeedbackMail(feedback),
              replyTo: feedback.email,
            })
            send(res, 200, { ok: true })
            return
          }

          const draft = parseDraft(payload)
          if (!draft) {
            send(res, 400, { ok: false, error: "Check your details and try again." })
            return
          }
          if (draft.honeypot) {
            send(res, 200, { ok: true })
            return
          }
          await sendMail({
            subject: mailSubject(draft),
            text: formatMail(draft),
            replyTo: draft.email,
          })
          send(res, 200, { ok: true })
        } catch (error) {
          console.error(isFeedback ? "feedback mail failed" : "preview mail failed", error)
          send(res, 502, { ok: false, error: mailError(error) })
        }
      })
    },
  }
}

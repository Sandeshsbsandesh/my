import { connect } from "cloudflare:sockets"
import { MAIL } from "./mail-config.js"

function b64(value) {
  return btoa(unescape(encodeURIComponent(value)))
}

function encodeSubject(value) {
  if (/^[\x20-\x7e]*$/.test(value)) return value
  return `=?UTF-8?B?${b64(value)}?=`
}

function createIo(socket) {
  const writer = socket.writable.getWriter()
  const reader = socket.readable.getReader()
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  let buf = ""

  return {
    async write(text) {
      await writer.write(encoder.encode(text))
    },
    async readReply() {
      const lines = []
      while (true) {
        while (!buf.includes("\n")) {
          const { value, done } = await reader.read()
          if (done) throw new Error("SMTP closed")
          buf += decoder.decode(value, { stream: true })
        }
        const idx = buf.indexOf("\n")
        let line = buf.slice(0, idx)
        buf = buf.slice(idx + 1)
        if (line.endsWith("\r")) line = line.slice(0, -1)
        lines.push(line)
        if (/^\d{3} /.test(line)) {
          return { code: Number(line.slice(0, 3)), text: lines.join("\n") }
        }
      }
    },
    async expect(codes) {
      const want = Array.isArray(codes) ? codes : [codes]
      const reply = await this.readReply()
      if (!want.includes(reply.code)) {
        throw new Error(`SMTP ${reply.code}: ${reply.text}`)
      }
      return reply
    },
    async cmd(line, codes) {
      await this.write(`${line}\r\n`)
      return this.expect(codes)
    },
    release() {
      writer.releaseLock()
      reader.releaseLock()
    },
  }
}

export async function sendSmtp({ subject, text, replyTo }) {
  let socket = connect({ hostname: MAIL.host, port: MAIL.port }, { secureTransport: "starttls" })
  await socket.opened
  let io = createIo(socket)
  try {
    await io.expect(220)
    await io.cmd("EHLO zebriyo", 250)
    await io.cmd("STARTTLS", 220)
    io.release()
    socket = socket.startTls()
    io = createIo(socket)
    await io.cmd("EHLO zebriyo", 250)
    await io.cmd("AUTH LOGIN", 334)
    await io.cmd(b64(MAIL.user), 334)
    await io.cmd(b64(MAIL.pass), 235)
    await io.cmd(`MAIL FROM:<${MAIL.fromEmail}>`, 250)
    await io.cmd(`RCPT TO:<${MAIL.to}>`, 250)
    await io.cmd("DATA", 354)
    const headers = [
      `From: ${MAIL.fromName} <${MAIL.fromEmail}>`,
      `To: ${MAIL.to}`,
      `Subject: ${encodeSubject(subject)}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      `Date: ${new Date().toUTCString()}`,
    ]
    if (replyTo) headers.splice(2, 0, `Reply-To: ${replyTo}`)
    const body = text.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n").replace(/^\./gm, "..")
    await io.write(`${headers.join("\r\n")}\r\n\r\n${body}\r\n.\r\n`)
    await io.expect(250)
    await io.cmd("QUIT", [221, 250])
  } finally {
    try {
      io.release()
    } catch {
      // Already released after STARTTLS.
    }
    try {
      await socket.close()
    } catch {
      // Connection may already be closed after QUIT.
    }
  }
}

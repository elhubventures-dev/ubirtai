import { Resend } from 'resend'

let client

function getClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  if (!client) {
    client = new Resend(key)
  }
  return client
}

export async function sendEmail({ to, subject, html, replyTo }) {
  const from = process.env.RESEND_FROM || 'UBIRT.AI <info@ubirtai.site>'
  const resend = getClient()

  const { data, error } = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  })

  if (error) {
    const message = error.message || 'Failed to send email'
    const err = new Error(message)
    err.cause = error
    throw err
  }

  return data
}

export function getNotifyTo() {
  return process.env.NOTIFY_TO || 'info@ubirtai.site'
}

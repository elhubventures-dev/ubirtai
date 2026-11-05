import {
  isAllowedOrigin,
  isHoneypotTriggered,
  readJsonBody,
  setCorsHeaders,
} from './validate.js'
import { getNotifyTo, sendEmail } from './resend.js'

export function createFormHandler({ validate, buildAdmin, buildUser }) {
  return async function handler(req, res) {
    setCorsHeaders(res, req)

    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST, OPTIONS')
      res.status(405).json({ ok: false, error: 'Method not allowed' })
      return
    }

    if (!isAllowedOrigin(req)) {
      res.status(403).json({ ok: false, error: 'Forbidden origin' })
      return
    }

    let body
    try {
      body = readJsonBody(req)
    } catch {
      res.status(400).json({ ok: false, error: 'Invalid JSON body' })
      return
    }

    if (isHoneypotTriggered(body)) {
      res.status(200).json({ ok: true })
      return
    }

    const validated = validate(body)
    if (!validated.ok) {
      res.status(400).json({ ok: false, error: validated.error })
      return
    }

    const data = validated.data
    const admin = buildAdmin(data)
    const user = buildUser(data)

    try {
      await sendEmail({
        to: getNotifyTo(),
        subject: admin.subject,
        html: admin.html,
        replyTo: data.email,
      })
    } catch (err) {
      console.error('[email] admin send failed', err)
      res.status(502).json({ ok: false, error: 'Unable to send notification. Please try again.' })
      return
    }

    try {
      await sendEmail({
        to: data.email,
        subject: user.subject,
        html: user.html,
      })
    } catch (err) {
      console.error('[email] user confirmation failed', err)
    }

    res.status(200).json({ ok: true })
  }
}

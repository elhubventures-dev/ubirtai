const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ALLOWED_ORIGINS = [
  'https://www.ubirtai.site',
  'https://ubirtai.site',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
]

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function isValidEmail(email) {
  return EMAIL_RE.test(normalizeEmail(email))
}

export function isHoneypotTriggered(body) {
  const bait = body?.company || body?.website || body?.honeypot
  return Boolean(bait && String(bait).trim())
}

export function isAllowedOrigin(req) {
  const origin = req.headers.origin || ''
  const referer = req.headers.referer || ''

  if (!origin && !referer) {
    // Allow server-to-server / curl without Origin (e.g. vercel preview probes)
    return true
  }

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return true
  }

  return ALLOWED_ORIGINS.some((allowed) => referer.startsWith(`${allowed}/`) || referer === allowed)
}

export function setCorsHeaders(res, req) {
  const origin = req.headers.origin
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    return JSON.parse(req.body)
  }
  return {}
}

export function validateContact(body) {
  const name = String(body.name || '').trim()
  const email = normalizeEmail(body.email)
  const message = String(body.message || '').trim()

  if (!name || name.length < 2 || name.length > 120) {
    return { ok: false, error: 'Please enter a valid name.' }
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  if (!message || message.length < 10 || message.length > 5000) {
    return { ok: false, error: 'Please enter a message (at least 10 characters).' }
  }

  return { ok: true, data: { name, email, message } }
}

export function validateEmailOnly(body) {
  const email = normalizeEmail(body.email)
  if (!isValidEmail(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  return { ok: true, data: { email } }
}

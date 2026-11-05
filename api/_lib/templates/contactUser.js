import { brand } from '../brand.js'
import { escapeHtml } from '../validate.js'
import { emailLayout } from '../layout.js'

export function contactUserEmail({ name }) {
  const first = escapeHtml((name || '').split(/\s+/)[0] || 'there')

  const html = emailLayout({
    preheader: 'We got your message — our team will reply soon.',
    title: `Thanks, ${first}`,
    bodyHtml: `
      <p style="margin:0 0 12px;">We received your message and appreciate you reaching out to ${brand.name}.</p>
      <p style="margin:0 0 12px;">Our team typically replies on business days (Monday–Friday, 9:00 AM–5:00 PM EST). If your note is urgent, you can also email <a href="mailto:${brand.supportEmail}" style="color:${brand.colors.accent};text-decoration:none;">${brand.supportEmail}</a>.</p>
      <p style="margin:0;">Meanwhile, keep your daily spark going — motivation, health, and sports reels curated by AI.</p>
    `,
    cta: { href: brand.siteUrl, label: 'Visit UBIRT.AI' },
  })

  return {
    subject: `We got your message — ${brand.name}`,
    html,
  }
}

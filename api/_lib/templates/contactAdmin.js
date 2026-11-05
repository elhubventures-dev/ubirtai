import { brand } from '../brand.js'
import { escapeHtml } from '../validate.js'
import { detailRow, detailsTable, emailLayout } from '../layout.js'

export function contactAdminEmail({ name, email, message }) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

  const html = emailLayout({
    preheader: `New contact message from ${safeName}`,
    title: 'New contact form submission',
    bodyHtml: `
      <p style="margin:0 0 8px;">Someone reached out via the website contact form.</p>
      ${detailsTable(`
        ${detailRow('Name', safeName)}
        ${detailRow('Email', `<a href="mailto:${safeEmail}" style="color:${brand.colors.accent};text-decoration:none;">${safeEmail}</a>`)}
        ${detailRow('Message', safeMessage)}
      `)}
      <p style="margin:0;">Reply directly to this email to respond to ${safeName}.</p>
    `,
    cta: { href: brand.siteUrl + '/contact', label: 'Open contact page' },
  })

  return {
    subject: `New contact from ${name}`,
    html,
  }
}

import { brand } from '../brand.js'
import { escapeHtml } from '../validate.js'
import { detailRow, detailsTable, emailLayout } from '../layout.js'

export function newsletterAdminEmail({ email }) {
  const safeEmail = escapeHtml(email)

  const html = emailLayout({
    preheader: `Newsletter signup: ${safeEmail}`,
    title: 'New newsletter signup',
    bodyHtml: `
      <p style="margin:0 0 8px;">Someone joined the weekly AI insights list.</p>
      ${detailsTable(`
        ${detailRow('Email', `<a href="mailto:${safeEmail}" style="color:${brand.colors.accent};text-decoration:none;">${safeEmail}</a>`)}
        ${detailRow('Source', 'Website newsletter')}
      `)}
    `,
    cta: { href: brand.siteUrl, label: 'Open website' },
  })

  return {
    subject: `Newsletter signup: ${email}`,
    html,
  }
}

import { brand } from '../brand.js'
import { escapeHtml } from '../validate.js'
import { detailRow, detailsTable, emailLayout } from '../layout.js'

export function waitlistAdminEmail({ email }) {
  const safeEmail = escapeHtml(email)

  const html = emailLayout({
    preheader: `iOS waitlist signup: ${safeEmail}`,
    title: 'New iOS waitlist signup',
    bodyHtml: `
      <p style="margin:0 0 8px;">Someone joined the iOS release waitlist.</p>
      ${detailsTable(`
        ${detailRow('Email', `<a href="mailto:${safeEmail}" style="color:${brand.colors.accent};text-decoration:none;">${safeEmail}</a>`)}
        ${detailRow('Source', 'Website footer waitlist')}
      `)}
    `,
    cta: { href: brand.siteUrl, label: 'Open website' },
  })

  return {
    subject: `iOS waitlist: ${email}`,
    html,
  }
}

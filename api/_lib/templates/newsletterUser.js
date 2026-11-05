import { brand } from '../brand.js'
import { emailLayout } from '../layout.js'

export function newsletterUserEmail() {
  const html = emailLayout({
    preheader: "You're on the list - weekly AI insights on mindset, longevity, and performance.",
    title: "You're on the list",
    bodyHtml: `
      <p style="margin:0 0 12px;">Welcome to ${brand.name}. You'll get weekly AI-curated tips on mindset, longevity, and performance — no spam, just pure signal.</p>
      <p style="margin:0 0 12px;">While you wait for the next drop, explore the app on Google Play or browse the site for fresh daily sparks.</p>
      <p style="margin:0;">Glad to have you with us.</p>
    `,
    cta: { href: brand.playStoreUrl, label: 'Get the Android app' },
  })

  return {
    subject: `Welcome to ${brand.name} insights`,
    html,
  }
}

import { brand } from '../brand.js'
import { emailLayout } from '../layout.js'

export function waitlistUserEmail() {
  const html = emailLayout({
    preheader: "You're on the UBIRT.AI iOS waitlist - we'll notify you at launch.",
    title: "You're on the iOS waitlist",
    bodyHtml: `
      <p style="margin:0 0 12px;">Thanks for joining the ${brand.name} iOS waitlist. We'll email you as soon as the app is ready on the App Store.</p>
      <p style="margin:0 0 12px;">In the meantime, Android users can download free on Google Play and start elevating their daily routine today.</p>
      <p style="margin:0;">Stay tuned — your next daily spark is coming.</p>
    `,
    cta: { href: brand.playStoreUrl, label: 'Get it on Google Play' },
  })

  return {
    subject: `You're on the ${brand.name} iOS waitlist`,
    html,
  }
}

const siteUrl = (process.env.SITE_URL || 'https://www.ubirtai.site').replace(/\/$/, '')

export const brand = {
  name: 'UBIRT.AI',
  tagline: 'AI-Powered Reels for Motivation, Health, and Sports',
  siteUrl,
  logoUrl: `${siteUrl}/logo.png`,
  supportEmail: 'info@ubirtai.site',
  privacyUrl: `${siteUrl}/privacy-policy`,
  termsUrl: `${siteUrl}/terms-of-service`,
  playStoreUrl: 'https://play.google.com/store/apps/details?id=ubirtai.app',
  colors: {
    background: '#050508',
    surface: '#0a0a0f',
    primary: '#0d5cba',
    accent: '#00e5ff',
    success: '#00ff88',
    textMain: '#f0f0f5',
    textMuted: '#94a3b8',
    border: 'rgba(255,255,255,0.10)',
    ctaMid: '#00b4d8',
  },
}

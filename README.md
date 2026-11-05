# UBIRT.AI website

React + Vite marketing site for [UBIRT.AI](https://www.ubirtai.site).

## Scripts

- `npm run dev` — Vite frontend only (API routes need `vercel dev`)
- `npm run build` / `npm run preview` — production build
- `npx vercel dev` — frontend + `/api` serverless routes locally

## Email (Resend + Vercel)

Transactional mail is sent from Vercel serverless functions under `api/`:

| Endpoint | Purpose |
|----------|---------|
| `POST /api/contact` | Contact form → admin alert + user confirmation |
| `POST /api/newsletter` | Newsletter signup → admin alert + welcome email |
| `POST /api/waitlist` | iOS waitlist → admin alert + waitlist confirmation |

### Environment variables

Copy `.env.example` to `.env.local` (gitignored). Set the same keys in the **Vercel project → Settings → Environment Variables**:

- `RESEND_API_KEY` — Resend API key (**rotate** any key that was shared outside Vercel)
- `RESEND_FROM` — e.g. `UBIRT.AI <info@ubirtai.site>` (domain must be verified in Resend)
- `NOTIFY_TO` — inbox for admin alerts (default `info@ubirtai.site`)
- `SITE_URL` — `https://www.ubirtai.site`

Never commit real secrets. After rotating a key in Resend, update Vercel and `.env.local`.

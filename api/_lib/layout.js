import { brand } from './brand.js'

const { colors, name, logoUrl, siteUrl, supportEmail, privacyUrl, tagline } = brand

export function emailLayout({ preheader = '', title, bodyHtml, cta }) {
  const ctaBlock = cta
    ? `
      <tr>
        <td align="center" style="padding: 8px 0 28px;">
          <a href="${cta.href}"
             style="display:inline-block;background:linear-gradient(90deg,${colors.primary},${colors.ctaMid});color:#ffffff;text-decoration:none;font-family:'Outfit',Arial,Helvetica,sans-serif;font-weight:700;font-size:15px;padding:14px 28px;border-radius:12px;">
            ${cta.label}
          </a>
        </td>
      </tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${title}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${colors.background};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${preheader}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:${colors.surface};border:1px solid ${colors.border};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,${colors.primary},${colors.accent});font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="${logoUrl}" width="40" height="40" alt="${name}" style="display:block;border:0;border-radius:8px;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <div style="font-family:'Outfit',Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:${colors.textMain};letter-spacing:0.02em;">
                      ${name}
                    </div>
                    <div style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;color:${colors.textMuted};padding-top:2px;">
                      ${tagline}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 8px;">
              <h1 style="margin:0 0 12px;font-family:'Outfit',Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:${colors.textMain};">
                ${title}
              </h1>
              <div style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${colors.textMuted};">
                ${bodyHtml}
              </div>
            </td>
          </tr>
          ${ctaBlock}
          <tr>
            <td style="padding:8px 28px 28px;">
              <div style="border-top:1px solid ${colors.border};padding-top:20px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${colors.textMuted};">
                <p style="margin:0 0 6px;">&copy; ${new Date().getFullYear()} ${name}. All rights reserved.</p>
                <p style="margin:0;">
                  <a href="mailto:${supportEmail}" style="color:${colors.accent};text-decoration:none;">${supportEmail}</a>
                  &nbsp;·&nbsp;
                  <a href="${privacyUrl}" style="color:${colors.accent};text-decoration:none;">Privacy</a>
                  &nbsp;·&nbsp;
                  <a href="${siteUrl}" style="color:${colors.accent};text-decoration:none;">${siteUrl.replace(/^https?:\/\//, '')}</a>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function detailRow(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${colors.border};font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;color:${colors.textMuted};width:110px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${colors.border};font-family:Inter,Arial,Helvetica,sans-serif;font-size:14px;color:${colors.textMain};vertical-align:top;">
        ${value}
      </td>
    </tr>`
}

export function detailsTable(rowsHtml) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:16px 0;background-color:${colors.background};border:1px solid ${colors.border};border-radius:12px;padding:4px 16px;">
      ${rowsHtml}
    </table>`
}

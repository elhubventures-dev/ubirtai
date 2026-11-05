import { createFormHandler } from './_lib/handler.js'
import { validateEmailOnly } from './_lib/validate.js'
import { newsletterAdminEmail } from './_lib/templates/newsletterAdmin.js'
import { newsletterUserEmail } from './_lib/templates/newsletterUser.js'

export default createFormHandler({
  validate: validateEmailOnly,
  buildAdmin: newsletterAdminEmail,
  buildUser: () => newsletterUserEmail(),
})

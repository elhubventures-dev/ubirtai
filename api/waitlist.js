import { createFormHandler } from './_lib/handler.js'
import { validateEmailOnly } from './_lib/validate.js'
import { waitlistAdminEmail } from './_lib/templates/waitlistAdmin.js'
import { waitlistUserEmail } from './_lib/templates/waitlistUser.js'

export default createFormHandler({
  validate: validateEmailOnly,
  buildAdmin: waitlistAdminEmail,
  buildUser: () => waitlistUserEmail(),
})

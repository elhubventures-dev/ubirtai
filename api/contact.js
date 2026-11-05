import { createFormHandler } from './_lib/handler.js'
import { validateContact } from './_lib/validate.js'
import { contactAdminEmail } from './_lib/templates/contactAdmin.js'
import { contactUserEmail } from './_lib/templates/contactUser.js'

export default createFormHandler({
  validate: validateContact,
  buildAdmin: contactAdminEmail,
  buildUser: contactUserEmail,
})

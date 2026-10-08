// Validation côté client du formulaire de contact (pure, testable unitairement).

export const CONTACT_FORM_MAX_CHARS = 2000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface ContactForm {
  recipient: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  gdpr: boolean
}

export type ContactFormErrors = Partial<Record<keyof ContactForm, string>>

export function validateContactForm(form: ContactForm): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!form.recipient)                                 errors.recipient = 'Veuillez sélectionner un destinataire.'
  if (!form.firstName)                                 errors.firstName = 'Le prénom est obligatoire.'
  if (!form.lastName)                                  errors.lastName  = 'Le nom est obligatoire.'
  if (!form.email)                                     errors.email     = 'L\'adresse e-mail est obligatoire.'
  else if (!EMAIL_RE.test(form.email))                 errors.email     = 'Veuillez saisir une adresse e-mail valide.'
  if (!form.subject)                                   errors.subject   = 'L\'objet est obligatoire.'
  if (!form.message)                                   errors.message   = 'Le message est obligatoire.'
  else if (form.message.length > CONTACT_FORM_MAX_CHARS) errors.message = `Le message ne doit pas dépasser ${CONTACT_FORM_MAX_CHARS} caractères.`
  if (!form.gdpr)                                      errors.gdpr      = 'Vous devez accepter la politique de traitement des données pour envoyer votre message.'

  return errors
}

// Règles de validation du formulaire de contact, partagées entre le navigateur (app/) et le serveur (server/).
// Un seul endroit à modifier : les deux validations restent toujours identiques.

export const CONTACT_LIMITS = {
  nameMax: 80,
  emailMax: 254,
  subjectMax: 150,
  messageMin: 10,
  messageMax: 2000,
  messageLinksMax: 2,
} as const


export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Lettres de toutes les langues, séparées par un espace, une apostrophe ou un tiret : Hélène, Jean-Pierre, O'Connor, Von Corda
export const NAME_RE = /^\p{L}+(?:[ '’-]\p{L}+)*$/u

// Caractères de contrôle invisibles : tous interdits dans les champs courts
const CONTROL_RE = /\p{Cc}/u
// Dans le message, seuls les retours à la ligne et les tabulations sont autorisés
const MESSAGE_CONTROL_RE = /[^\P{Cc}\t\n\r]/u

const LINK_RE = /https?:\/\/|www\./gi

export interface ContactFields {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export type ContactFieldErrors = Partial<Record<keyof ContactFields, string>>

/** Champ sur une seule ligne : espaces multiples réduits à un seul, espaces du début et de la fin retirés. */
function cleanLine(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

/** Message sur plusieurs lignes : chaque ligne est nettoyée, avec au plus une ligne vide d'affilée. */
function cleanMessage(message: string): string {
  // Découpe le message en lignes (retours à la ligne Windows "\r\n", ancien Mac "\r" ou Linux "\n")
  const lines = message.split(/\r\n|\r|\n/)

  const cleanedLines: string[] = []
  for (const line of lines) {
    const cleaned = cleanLine(line)
    const previous = cleanedLines[cleanedLines.length - 1]

    // Une ligne vide juste après une autre ligne vide est ignorée
    if (cleaned === '' && previous === '') continue

    cleanedLines.push(cleaned)
  }

  // Recolle les lignes, puis retire les lignes vides du début et de la fin
  return cleanedLines.join('\n').trim()
}

/** Nettoie les espaces de tous les champs avant la validation et l'envoi. */
export function normalizeContactFields<T extends ContactFields>(fields: T): T {
  return {
    ...fields,
    firstName: cleanLine(fields.firstName),
    lastName:  cleanLine(fields.lastName),
    email:     fields.email.trim(),
    subject:   cleanLine(fields.subject),
    message:   cleanMessage(fields.message),
  }
}

function validateName(value: string, label: string): string | undefined {
  if (!value)                               return `Le ${label} est obligatoire.`
  if (value.length > CONTACT_LIMITS.nameMax) return `Le ${label} ne doit pas dépasser ${CONTACT_LIMITS.nameMax} caractères.`
  if (!NAME_RE.test(value))                 return `Le ${label} ne doit contenir que des lettres, espaces, tirets ou apostrophes.`
}

/** Valide des champs déjà normalisés. Retourne uniquement les champs en erreur. */
export function validateContactFields(fields: ContactFields): ContactFieldErrors {
  const { firstName, lastName, email, subject, message } = fields
  const errors: ContactFieldErrors = {}

  const firstNameError = validateName(firstName, 'prénom')
  if (firstNameError) errors.firstName = firstNameError
  const lastNameError = validateName(lastName, 'nom')
  if (lastNameError) errors.lastName = lastNameError

  if (!email)                                         errors.email = 'L\'adresse e-mail est obligatoire.'
  else if (email.length > CONTACT_LIMITS.emailMax)    errors.email = `L'adresse e-mail ne doit pas dépasser ${CONTACT_LIMITS.emailMax} caractères.`
  else if (!EMAIL_RE.test(email) || CONTROL_RE.test(email)) errors.email = 'Veuillez saisir une adresse e-mail valide.'

  if (!subject)                                       errors.subject = 'L\'objet est obligatoire.'
  else if (subject.length > CONTACT_LIMITS.subjectMax) errors.subject = `L'objet ne doit pas dépasser ${CONTACT_LIMITS.subjectMax} caractères.`
  else if (CONTROL_RE.test(subject))                  errors.subject = 'L\'objet contient des caractères non autorisés.'

  const linkCount = message.match(LINK_RE)?.length ?? 0
  if (!message)                                       errors.message = 'Le message est obligatoire.'
  else if (message.length < CONTACT_LIMITS.messageMin) errors.message = `Le message doit contenir au moins ${CONTACT_LIMITS.messageMin} caractères.`
  else if (message.length > CONTACT_LIMITS.messageMax) errors.message = `Le message ne doit pas dépasser ${CONTACT_LIMITS.messageMax} caractères.`
  else if (MESSAGE_CONTROL_RE.test(message))          errors.message = 'Le message contient des caractères non autorisés.'
  else if (linkCount > CONTACT_LIMITS.messageLinksMax) errors.message = `Le message ne doit pas contenir plus de ${CONTACT_LIMITS.messageLinksMax} liens.`

  return errors
}

// ── Formulaire complet (page contact) ──────────────────────

export interface ContactForm extends ContactFields {
  recipient: string
  gdpr: boolean
}

export type ContactFormErrors = Partial<Record<keyof ContactForm, string>>

/** Valide le formulaire de la page contact : champs, destinataire choisi et consentement RGPD. */
export function validateContactForm(form: ContactForm): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!form.recipient) errors.recipient = 'Veuillez sélectionner un destinataire.'
  Object.assign(errors, validateContactFields(form))
  if (!form.gdpr)      errors.gdpr      = 'Vous devez accepter la politique de traitement des données pour envoyer votre message.'

  return errors
}

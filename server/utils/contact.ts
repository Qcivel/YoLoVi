// Logique métier du formulaire de contact, isolée du handler h3 pour être testable unitairement.

export const CONTACT_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const CONTACT_MAX_CHARS = 2000

export const RECIPIENT_EMAILS = {
  'test-contact': 'yolovitest@gmail.com',
  'julie-garrido': 'julie@yolovi.fr',
  'theo-renaut':   'theo@yolovi.fr',
  'remy-gabalda':  'remy@yolovi.fr',
  'collectif':     'contact@yolovi.fr',
} as const

export type RecipientKey = keyof typeof RECIPIENT_EMAILS

export interface ContactPayload {
  recipient: RecipientKey
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim() !== ''

/** Retourne le message d'erreur de la première règle violée, ou null si le payload est valide. */
export function validateContactPayload(body: unknown): string | null {
  const { recipient, firstName, lastName, email, subject, message } = (body ?? {}) as Record<string, unknown>

  if (typeof recipient !== 'string' || !Object.hasOwn(RECIPIENT_EMAILS, recipient))
    return 'Destinataire invalide.'
  if (!isNonEmptyString(firstName) || !isNonEmptyString(lastName))
    return 'Nom et prénom obligatoires.'
  if (typeof email !== 'string' || !CONTACT_EMAIL_RE.test(email))
    return 'Adresse e-mail invalide.'
  if (!isNonEmptyString(subject))
    return 'Objet obligatoire.'
  if (!isNonEmptyString(message) || message.length > CONTACT_MAX_CHARS)
    return 'Message invalide ou trop long.'

  return null
}

// En test, tous les messages vont dans UNE boîte Gmail, avec un alias + par destinataire
export function resolveRecipient(key: RecipientKey, testTo?: string): string {
  if (!testTo) return RECIPIENT_EMAILS[key]
  const [local, domain] = testTo.split('@')
  return `${local}+${key}@${domain}`
}

export function buildContactMail(payload: ContactPayload, smtpUser: string, testTo?: string) {
  const { recipient, firstName, lastName, email, subject, message } = payload
  return {
    from: { name: 'Site YoLoVi', address: smtpUser },
    to: resolveRecipient(recipient, testTo),
    replyTo: { name: `${firstName} ${lastName}`, address: email },
    // Neutralise les retours à la ligne pour empêcher l'injection d'en-têtes
    subject: `[YoLoVi] ${subject.replace(/[\r\n]+/g, ' ')}`,
    text: `De : ${firstName} ${lastName} <${email}>\n\n${message}`,
  }
}

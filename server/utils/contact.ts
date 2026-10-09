// Logique métier du formulaire de contact, isolée du handler h3 pour être testable unitairement.
// Les règles des champs sont partagées avec le navigateur (shared/utils/contactRules.ts).

import { normalizeContactFields, validateContactFields, type ContactFields } from '#shared/utils/contactRules'

export const RECIPIENT_EMAILS = {
  'test-contact': 'yolovitest@gmail.com',
  'julie-garrido': 'julie@yolovi.fr',
  'theo-renaut':   'theo@yolovi.fr',
  'remy-gabalda':  'remy@yolovi.fr',
  'collectif':     'contact@yolovi.fr',
} as const

export type RecipientKey = keyof typeof RECIPIENT_EMAILS

export interface ContactPayload extends ContactFields {
  recipient: RecipientKey
}

const FIELD_NAMES = ['firstName', 'lastName', 'email', 'subject', 'message'] as const

/** Vérifie le corps de la requête et renvoie soit le payload nettoyé, soit le message de la première erreur. */
export function parseContactPayload(body: unknown): { payload: ContactPayload } | { error: string } {
  const data = (body ?? {}) as Record<string, unknown>

  if (typeof data.recipient !== 'string' || !Object.hasOwn(RECIPIENT_EMAILS, data.recipient))
    return { error: 'Destinataire invalide.' }
  if (FIELD_NAMES.some(name => typeof data[name] !== 'string'))
    return { error: 'Champs manquants ou invalides.' }

  const payload = normalizeContactFields({
    recipient: data.recipient as RecipientKey,
    firstName: data.firstName as string,
    lastName:  data.lastName as string,
    email:     data.email as string,
    subject:   data.subject as string,
    message:   data.message as string,
  })

  const [firstError] = Object.values(validateContactFields(payload))
  return firstError ? { error: firstError } : { payload }
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

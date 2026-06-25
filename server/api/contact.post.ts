import { defineEventHandler, readBody, createError } from 'h3'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RECIPIENT_EMAILS: Record<string, string> = {
  'moly-route':       'moly@yolovi.fr',
  'claire-von-corda': 'claire@yolovi.fr',
  'theo-renaut':      'theo@yolovi.fr',
  'remy-gabalda':     'remy@yolovi.fr',
  'collectif':        'contact@yolovi.fr',
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { recipient, firstName, lastName, email, subject, message } = body ?? {}

  // Validation serveur
  if (!recipient || !RECIPIENT_EMAILS[recipient])
    throw createError({ statusCode: 400, message: 'Destinataire invalide.' })
  if (!firstName?.trim() || !lastName?.trim())
    throw createError({ statusCode: 400, message: 'Nom et prénom obligatoires.' })
  if (!email || !EMAIL_RE.test(email))
    throw createError({ statusCode: 400, message: 'Adresse e-mail invalide.' })
  if (!subject?.trim())
    throw createError({ statusCode: 400, message: 'Objet obligatoire.' })
  if (!message?.trim() || message.length > 2000)
    throw createError({ statusCode: 400, message: 'Message invalide ou trop long.' })

  // TODO : brancher un service d'envoi (Nodemailer, Resend, Sendgrid…)
  // Exemple avec Resend :
  // await $fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
  //   body: {
  //     from: 'contact@yolovi.fr',
  //     to: RECIPIENT_EMAILS[recipient],
  //     reply_to: email,
  //     subject: `[YoLoVi] ${subject}`,
  //     text: `De : ${firstName} ${lastName} <${email}>\n\n${message}`,
  //   },
  // })

  return { success: true }
})
